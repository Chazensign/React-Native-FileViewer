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
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen';
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
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
