import React from 'react';
import {Image, View, Text, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';
import Pdf from 'react-native-pdf';
import WebView from 'react-native-webview';
import XLSX from 'xlsx';
import XLSFileDisp from './XLSFileDisp';
import OpenFile from 'react-native-doc-viewer';

const FileDisplay = props => {
  const {file} = props.route.params;

  const checkFileType = () => {
    if (file.type === 'jpg' || file.type === 'png' || file.type === 'gif') {
      return (
        <Image
          source={{
            uri:
              Platform.OS === 'android'
                ? 'file://' + file.path
                : '' + file.path,
          }}
          style={styles.file}
          resizeMode="contain"
        />
      );
    } else if (file.type === 'mp4') {
      return (
        <Video
          source={{
            uri:
              Platform.OS === 'android'
                ? 'file://' + file.path
                : '' + file.path,
          }}
          ref={ref => {
            this.player = ref;
          }}
          fullscreen={true}
          style={styles.backgroundVideo}
          resizeMode="contain"
        />
      );
    } else if (file.type === 'pdf') {
      return (
        <Pdf
          source={{uri: 'file://' + file.path}}
          onError={error => {
            console.log(error);
          }}
          style={styles.pdf}
        />
      );
    } else if (file.type === 'html') {
      return (
        <WebView
          source={{uri: `file://${file.path}`}}
          originWhitelist={[`*`]}
          allowFileAccess={true}
          allowFileAccessFromFileURLs={true}
          allowingReadAccessToURL={true}
        />
      );
    } else if (file.type === 'xls') {
      // var workbook = XLSX.read(file.data, {type: 'array'});
      // var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      // var data = XLSX.utils.sheet_to_json(first_worksheet, {
      //   header: 1,
      // });
      return <XLSFileDisp file={file} />;
    } else {
      props.navigation.navigate('Home')
      // return OpenFile.openDocb64(
      //   [
      //     {
      //       base64: file.data,
      //       fileName: file.name,
      //       fileType: file.type,
      //       cache: true
      //     },
      //   ],
      //   (error, url) => {
      //     if (error) {
      //       console.log(error);
      //     } else {
      //       console.log(url);
      //     }
      //   },
      // );
    }
  };

  return <View style={{flex: 1}}>{checkFileType()}</View>;
};

export default FileDisplay;
const width_proportion = '100%';
const height_proportion = '100%';
const styles = StyleSheet.create({
  file: {
    width: width_proportion,
    height: height_proportion,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
