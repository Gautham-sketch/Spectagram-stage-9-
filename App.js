import React from 'react';
import { StyleSheet, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './Navigation/DrawerNavigation';
import * as firebase from 'firebase';
import { firebaseConfig } from './config';

import LoginScreen from './Screens/LoginScreen';
import LoadingScreen from './Screens/LoadingScreen';
import DashBoardScreen from './Screens/DashBoardScreen';

  if(!firebase.apps.length){
  firebase.initialiseApp(firebaseConfig);
} else{
  firebase.app();
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen : LoadingScreen,
  LoginScreen : LoginScreen,
  DashBoardScreen : DashBoardScreen,
})

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return (
      <AppNavigator/>
  );
}
