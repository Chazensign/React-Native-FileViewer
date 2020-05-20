import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FileFetcher from './components/FileFetcher';
import FileDisplay from './components/FileDisplay';

const Stack = createStackNavigator();

const NavStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={FileFetcher}
        options={{title: 'File Viewer'}}
      />
      <Stack.Screen name="FileDisplay" component={FileDisplay} />
    </Stack.Navigator>
  );
}
 
export default NavStack;