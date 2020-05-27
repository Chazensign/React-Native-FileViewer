import React from 'react';
import {Image, View, Text, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';
import Pdf from 'react-native-pdf';
import WebView from 'react-native-webview';
import XLSFileDisp from './XLSFileDisp';


const FileDisplay = props => {
  
  const {file} = props.file ? props : props.route.params;

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
          style={props.file ? styles.thumbnail : styles.file}
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
          fullscreen={true}
          style={props.file ? styles.thumbnail : styles.file}
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
          style={props.file ? styles.thumbnail : styles.file}
        />
      );
    } else if (file.type === 'html') {
      return (
        <View style={props.file ? styles.thumbnail : styles.file}>
          <WebView
            source={{uri: `file://${file.path}`}}
            originWhitelist={[`*`]}
            allowFileAccess={true}
            allowFileAccessFromFileURLs={true}
            allowingReadAccessToURL={true}
          />
        </View>
      );
    } else if (file.type === 'xls') {
      return <XLSFileDisp thumbnail={props.file ? true : false} file={file} />;
    } else {
      return <Text>File type not yet supported.</Text>
    }
  };
  return <View style={{flex: 1}}>{checkFileType()}</View>;
};

export default FileDisplay;

const styles = StyleSheet.create({
  file: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  thumbnail: {
    alignSelf: "flex-end"
,    width: 120,
    height: 70
  }
});
