import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firebase from 'firebase';
import Profile from '../Screens/Profile';
import StackNavigatior from '../Navigation/StackNavigator';
import LogOut from '../Screens/LogOut';

const Drawer = createDrawerNavigator();
export default class DrawerNavigator extends React.Component{
    componentDidMount(){
        let theme;
        firebase.database().ref("/users/" + firebase.auth().currentUser.uid).on("value",function(snapshot){
            theme = snapshot.val().currentTheme;
        });
        this.setState({light_theme : theme === "light" ? true : false})
    }
    
    render(){
        let props = this.props
        return(
            <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor : "red",
                inactiveTintColor : this.state.lightTheme ? 'black' : 'white',
                iTemStyle : {marginVertical : 5}
            }}
            drawerContent={props => <CustomSidebarMenu {...props}/>}>
                <Drawer.Screen 
                    name="Home" 
                    component={StackNavigatior}
                    options={{unmountOnBlur : true}}></Drawer.Screen>
                <Drawer.Screen 
                    name="Profile" 
                    component={Profile}
                    options={{unmountOnBlur : true}}></Drawer.Screen>
                <Drawer.Screen 
                    name="Log Out" 
                    component={LogOut}
                    options={{unmountOnBlur : true}}></Drawer.Screen>
            </Drawer.Navigator>
        );
    }
}

export default DrawerNavigator;