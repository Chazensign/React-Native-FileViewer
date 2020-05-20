import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import Video from 'react-native-video'

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
          }} // Store reference
          fullscreen={true}
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
          resizeMode="contain"
        />
      );
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