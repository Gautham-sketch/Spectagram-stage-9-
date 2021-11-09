import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {AppLoading} from 'expo-app-loading';

var customFonts ={
  'BubbleGumSans' : require('../assets/BubblegumSans-Regular.ttf')
}

export default class Profile extends React.Component {
  consturctor(){
    super();
    this.state={
      fontsLoaded : false,
      isEnabled: false,
      lightTheme: true,
      profileImage: '',
      name: '',
    }
  }

  async loadFonts(){
    await Font.loadAsync(customFonts);
    this.setState({fontsLoaded : true})
  }

  componentDidMount(){
    this.loadFonts();
  }

  fetchUser=async()=>{
    var theme,image,name;
    await firebase
    .database()
    .ref('/users/' + firebase.auth().currentUser.uid)
    .on('value' , (snapshot)=>{
      theme = snapshot.val().currentTheme;
      name =  `${snapshot.val().first_name} ${snapshot.val().last_name}`;
    })
    this.setState({
      lightTheme : theme === "light" ? true : false,
      name : name,
      profileImage : image,
      isEnabled : theme === 'light' ? false : true,
    })
  };

  toggleSwitch(){
    const previous_state = this.state.isEnabled;
    const theme = !this.state.isEnabled ? "dark" : "light";
    let updates={}
    updates["/users/" + firebase.auth().currentUser.uid + "/current_theme"] = theme
    firebase.database().ref().update(updates);
    this.setState({
      isEnabled : !previous_state, light_theme : previous_state
    })
  };

  render() {
    if(fontsLoaded === false){
      <AppLoading/>
    }else{
      return (
        <View style={this.state.isEnabled === true ? styles.containerDark : styles.containerLight}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.appIcon}
            />
            <Text style={styles.appTitleText}>STORY TELLING APP</Text>
          </View>
          <View style={styles.screenContainer}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: this.state.profileImage }}
                style={styles.googleIcon}
              />
              <Text style={styles.googleText}>{this.state.name}</Text>
            </View>
            <View style={styles.screenContainer}>
              <Text style={styles.googleText}>Dark theme</Text>
              <Switch
                trackColor={{ true: 'white', false: 'white' }}
                thumbColor={this.state.isEnabled === true ? 'cyan' : 'grey'}
                value={this.state.isEnabled}
                onValueChange={() => {
                  this.toggleSwitch();
                }}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  containerDark: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
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
    color: 'red',
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
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
  },
  googleText: {
    color: 'red',
    fontSize: RFValue(20),
    fontFamily: 'Bubblegum-Sans',
    marginTop: 20,
  },
  screenContainer: {
    flex: 0.8,
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cloudImage: {
    position: 'absolute',
    width: '100%',
    resizeMode: 'contain',
    bottom: RFValue(-5),
  },
});