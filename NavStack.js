import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FileFetcher from './components/FileFetcher';
import FileDisplay from './components/FileDisplay';

const Stack = createStackNavigator();

const NavStack = (props) => {
  
  
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={FileFetcher}
        options={{headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="FileDisplay"
        component={FileDisplay}
        options={({route}) => ({
          title: route.params.name,
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
}
 
export default NavStack;
