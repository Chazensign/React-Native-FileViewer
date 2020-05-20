import React from 'react';
import {Image, Video, View, Text, StyleSheet} from 'react-native';

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
        <Text>Video File</Text>
      );
    }
  }

  return ( 
  <View>
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
    height: height_proportion
  }
})