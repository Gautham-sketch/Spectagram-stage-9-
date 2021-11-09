import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNaviagtor from '../Navigation/TabNavigator';
import PostScreen from '../Screens/PostScreen';

const Stack = createStackNavigator();

const StackNavigator = () =>{
    return(
        <Stack.Navigator
        initialRoutName = "Home"
        screenOptions={{headerShown : true}}
        >
        <Stack.Screen name = "Home" component={TabNaviagtor}/>
        <Stack.Screen name = "Post Screen" component={PostScreen}/>    
        </Stack.Navigator>
    );
}

export default StackNavigator;