/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler'
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native'
import NavStack from './NavStack'

const App: () => React$Node = () => {
  return (
    <NavigationContainer style={styles.engine}>
      <NavStack />
    </NavigationContainer>
  );
};
const width_proportion = '100%'
const height_proportion = '100%'
const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
    width: width_proportion,
    height: height_proportion
  }
});

export default App;
