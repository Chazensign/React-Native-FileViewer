
import React, {Component} from 'react'
import {Image, View, Text} from 'react-native'
import RNFetchBlob from 'rn-fetch-blob';

class FileFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileNames: [],
      files: [],
      // file object {
      //              name: string,
      //              path: cacheFilePathString,
      //              type: fileExtesionString
      //               }
    };
  }

  componentDidMount() {
    this.getFileNames()
  }

  getFileNames = () => {
    fetch('http://10.0.2.2:4040/files')
      .then(async res => {
        let response = await res.json();
        this.setState({fileNames: response.data})
        this.downloadFiles(response.data)
      })
      .catch(err => console.log(err))
  }

  downloadFiles = async list => {
    let filesArr = [];
    for (let i = 0; i < list.length; i++) {
      let fileInfo = await this.fetchFileCreatePath(list[i])
      filesArr.push(fileInfo)
      if (i === list.length - 1) this.setState({files: filesArr})
    }
  };

  fetchFileCreatePath = nameStr => {
    return new Promise((resolve, reject) => {
      RNFetchBlob.config({fileCache: true})
        .fetch('GET', `http://10.0.2.2:4040/file/${nameStr}`)
        .then(res => {
          resolve({
            name: nameStr,
            path: res.path(),
            type: nameStr.split('.')[1],
          });
        });
    });
  };

  render() {

    return (
      <>
        {this.state.files.map((file, i) => {
          return <Text key={i}>{file.name}</Text>;
        })}
      </>
    );
  }
}

export default FileFetcher
