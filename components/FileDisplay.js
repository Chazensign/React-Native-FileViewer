import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import Video from 'react-native-video'
import OpenFile from 'react-native-doc-viewer'

const FileDisplay = (props) => {

  const { file } = props.route.params
  console.log(file)
  
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
    }else {
        OpenFile.openDoc(
          [
            {
              url:
                Platform.OS === 'android'
                  ? 'file://' + file.path
                  : '' + file.path,
              fileNameOptional: file.name,
              fileType: file.type,
            },
          ],
          (error, url) => {
            if (error) {
              this.setState({animating: false});
            } else {
              this.setState({animating: false});
              console.log(url);
            }
          },
        )
    }
  }

  return ( 
  <View style={{flex: 1}}>
    <Text>File Display for {file.name}</Text>
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
});