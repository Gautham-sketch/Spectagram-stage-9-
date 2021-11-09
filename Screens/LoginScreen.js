import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import {AppLoading} from 'expo-app-loading'

var customFonts = {
  'BubbleGumSans' : require('../assets/BubblegumSans-Regular.ttf')
}

export default class LoginScreen extends React.Component {
  constructor(){
    super();
    this.state={
      fontsLoaded : false,
    }
  }

  async loadFonts(){
    await Font.loadAsync(customFonts);
    this.setState({
      fontsLoaded : true,
    })
  }

  componentDidMount(){
    this.loadFonts();
  }

  /*signInWithGoogleAsync = async () =>{
    try{
      const result = await Google.loginAsync({
        behaviour = "web",
        androidClientId : "342298703496-8avahvgs55fuoe3p5cvp3tjqfvbpe1gs.apps.googleusercontent.com",
        iosClientId : "342298703496-ppb4bj7vp0fco13uvp1sb34452rac8li.apps.googleusercontent.com",
        scopes : ['profile','email'],
      });
    }
  }*/
  
  render() {
    if(this.state.fontsLoaded === false){
      <AppLoading/>
    }else{
      return (
        <View
        style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea}/>
          <View style={styles.appTitle}>
            <Image
            style={styles.appIcon}
            source={require('../assets/logo.png')}/>
            <Text style={styles.appTitleText}>Story Telling App</Text>
          </View>
          <View>
          <TouchableOpacity
          style={styles.button}
          onPress={()=>{
            this.signInWithGoogleAsync();
          }}></TouchableOpacity>
          <Image
          style={styles.googleIcon}
          source={require('../assets/icon.png')}/>
          <Text style={styles.googleText}>Sign in with Google</Text>
          </View>
          <View style={styles.cloudContainer}>
            <Image
            style={styles.cloudImage}
            source={require('../assets/post.jpeg')}/>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appIcon: {
    width: RFValue(130),
    height: RFValue(130),
    resizeMode: 'contain',
  },
  appTitleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFValue(40),
    fontFamily: 'Bubblegum-Sans',
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
  },
  googleIcon: {
    width: RFValue(30),
    height: RFValue(30),
    resizeMode: 'contain',
  },
  googleText: {
    color: 'black',
    fontSize: RFValue(20),
    fontFamily: 'Bubblegum-Sans',
  },
  cloudContainer: {
    flex: 0.3,
  },
  cloudImage: {
    position: 'absolute',
    width: '100%',
    resizeMode: 'contain',
    bottom: RFValue(-5),
  },
});