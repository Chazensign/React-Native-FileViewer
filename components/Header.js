import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const MyHeader = () => {
  return (
    <View style={styles.headerStyle}>
      <Text style={styles.fontStyle}>File Viewer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fontStyle: {
    fontSize: 40,
    fontWeight: 'bold'
  },
});
 
export default MyHeader;