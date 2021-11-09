import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from '../Screens/Feed';
import CreatePost from '../Screens/CreatePost';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'; 
import { Platform, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RFValue } from 'react-native-responsive-fontsize';

const Tab = createBottomTabNavigator();
const TabNavigatior = () =>{
    return(
       <View style = {this.state.isEnabled === true ? styles.containerDark : styles.containerLight}>
        <SafeAreaView style = {styles.safe}/>   
        <Tab.Navigator
        screenOptions = {({route})=>({
            tabBarIcon : ({focused,color,size}) =>{
                let iconName;
                if(route.name === "Feed"){
                   iconName = focused ? 'image' : 'image-outline'; 
                }else if(route.name === "Create Story"){
                    iconName = focused ? 'camera' : 'camera-outline';
                }
                return <Ionicons name={iconName} size={size} color={color}/>;
            },
        })}
        tabBarOptions={{
            activeTintColor : "black",
            inactiveTintColor : "grey",
        }}>
            <Tab.Screen name="Feed" component={Feed}></Tab.Screen>
            <Tab.Screen name="Create Post" component={CreatePost}></Tab.Screen>
        </Tab.Navigator>
       </View> 
    );
}

const styles = StyleSheet.create({
    containerDark :{
      flex : 1,
      backgroundcolor : "black",
    },
    containerLight :{
        flex : 1,
        backgroundcolor : "white",
    },
    safe:{
     marginTop : Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
    },
    appTitle:{
     flex : 0.07,
     flexDirection : "row",
    },
    appIcon:{
     flex : 0.2,
     justifyContent : "center",
     alignItems : "center"
    },
    iconImage : {
     width : "100%",
     height : "100%",
     resizeMode : "contain",
    },
    appTitleText:{
     color :"white",
     fontSize : RFValue(28),
    },
    cardContainer :{
     flex : 0.85,
    }
})

export default TabNavigatior;