import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import OpenFile from 'react-native-doc-viewer';
import FileDisplay from './FileDisplay';
import XLSFileDisp from './XLSFileDisp'

class FileFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileNames: [],
      files: [],
      loading: false,
      // file object {
      //              name: string,
      //              path: cacheFilePathString,
      //              type: fileExtesionString
      //               }
    };
  }

  componentDidMount() {
    this.setState({loading: true});
    this.getFileNames();
  }

  getFileNames = () => {
    fetch('http://10.0.2.2:4040/files')
      .then(async res => {
        let response = await res.json();
        this.setState({fileNames: response.data});
        this.downloadFiles(response.data);
      })
      .catch(err => console.log(err));
  };

  downloadFiles = async list => {
    let filesArr = [];
    for (let i = 0; i < list.length; i++) {
      let fileInfo = await this.filterFileType(list[i]);
      filesArr.push(fileInfo);
      if (i === list.length - 1)
        this.setState({files: filesArr, loading: false});
    }
  };

  filterFileType = nameStr => {
    const ext = nameStr.split('.')[1];
    return new Promise(async (resolve, reject) => {
      if (ext === 'xls') {
        let xlsFile = await this.fetchXLS(nameStr, ext);
        resolve(xlsFile);
      }
      if (ext === 'doc' || ext === 'ppt') {
        let base64Obj = this.fetchOtherDocs(nameStr, ext);
        resolve(base64Obj);
      } else {
        let fileObj = await this.fetchFile(nameStr, ext);
        resolve(fileObj);
      }
    });
  };

  fetchFile = (nameStr, ext) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.config({fileCache: true, appendExt: ext})
        .fetch('GET', `http://10.0.2.2:4040/file/${nameStr}`)
        .then(res => {
          resolve({
            name: nameStr,
            path: res.path(),
            type: ext,
          });
        });
    });
  };

  fetchXLS = (nameStr, ext) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.config({fileCache: true, appendExt: ext})
        .fetch('GET', `http://10.0.2.2:4040/file/${nameStr}`)
        .then(res => {
          return res.array();
        })
        .then(xlsArr => {
          let u8Arr = new Uint8Array(xlsArr);
          resolve({
            name: nameStr,
            data: u8Arr,
            type: ext,
          });
        })
        .catch(err => console.log(err));
    });
  };

  fetchOtherDocs = (nameStr, ext) => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.config({fileCache: true, appendExt: ext})
        .fetch('GET', `http://10.0.2.2:4040/file/${nameStr}`)
        .then(res => {
          return res.base64();
        })
        .then(b64Data => {
          resolve({
            name: nameStr,
            data: b64Data,
            type: ext,
          });
        })
        .catch(err => console.log(err));
    });
  };

  onFileSelect = selected => {
    let {navigation} = this.props;
    navigation.navigate('FileDisplay', {file: selected});
  };

  displayDoc = file => {
    OpenFile.openDocb64(
      [
        {
          base64: file.data,
          fileName: file.name,
          fileType: file.type,
          cache: true,
        },
      ],
      (error, url) => {
        if (error) {
          console.log(error);
        }
      },
    );
  };

  displayName = (name) => {
    let nameArr = name.split('.')
    let newName = nameArr[0].substring(1)
    let capped = name[0].toUpperCase();
    return capped + newName
  }

  render() {
    return this.state.loading ? (
      <ActivityIndicator
        style={{paddingTop: 200}}
        color="#2196F3"
        size={Platform.os === 'ios' ? 'large' : 150}
      />
    ) : (
      <ScrollView style={styles.list}>
        {this.state.files.map((file, i) => {
          return (
            <TouchableWithoutFeedback
              key={i}
              onPress={() => {
                if (file.type === 'ppt' || file.type === 'doc') {
                  this.displayDoc(file);
                } else {
                  this.onFileSelect(file);
                }
              }}>
              <View style={styles.button}>
                <Text style={{textAlign: 'center', fontSize: 20, marginLeft: 10, marginRight: 20}}>{this.displayName(file.name)}</Text>
                <>
                {(file.type !== 'ppt' && file.type !== 'doc') ? <FileDisplay file={file} /> : null}
                </>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    );
  }
}

export default FileFetcher;

const styles = StyleSheet.create({
  list: {
    paddingTop: 5,
  },

  button: {
    flexDirection: 'row',
    
    margin: 3,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    width: Dimensions.get('window').width - 20,
    borderRadius: 5,
    backgroundColor: '#2196F3',
  },
});
