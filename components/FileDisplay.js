import React from 'react';
import {Image, View, Text} from 'react-native';

const FileDisplay = (props) => {
  return ( 
  <View>
    <Text>File Display for {props.route.params.file.name}</Text>
  </View>
   )
}
 
export default FileDisplay;