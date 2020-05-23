import React from 'react';
import {Image, View, Text, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video'
import Pdf from 'react-native-pdf';
import WebView from 'react-native-webview'

const FileDisplay = (props) => {

  const { file } = props.route.params

  console.log(file);
  
  const checkFileType = () => {
    if (file.type === 'jpg' || 
    file.type === 'png' || 
    file.type === 'gif'
    ) {
      return (
        <Image
          source={{
            uri:
              Platform.OS === 'android'
                ? 'file://' + file.path
                : '' + file.path
          }}
          style={styles.file}
          resizeMode='contain'
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
    }else if (file.type === 'pdf') {
      
       return <Pdf
         source={{uri: 'file://' +file.path}}
         onLoadComplete={(numberOfPages, filePath) => {
           console.log(`number of pages: ${numberOfPages}`);
         }}
         onPageChanged={(page, numberOfPages) => {
           console.log(`current page: ${page}`);
         }}
         onError={error => {
           console.log(error);
         }}
         onPressLink={uri => {
           console.log(`Link presse: ${uri}`);
         }}
         style={styles.pdf}
       />;
    }else {
      return (
        
        <WebView
          source={{uri: `file://${file.path}`}}
          originWhitelist={[`*`]}
          allowFileAccess={true}
          allowFileAccessFromFileURLs={true}
          allowingReadAccessToURL={true}
        />
      );
    }
  }

  return ( 
  <View style={{flex: 1}}>
    {checkFileType()}
  </View>
   )
}
 
export default FileDisplay;
const width_proportion = '100%'
const height_proportion = '100%'
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