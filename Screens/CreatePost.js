import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import DropDownPicker from 'react-native-dropdown-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import { TextInput } from 'react-native-paper';

let customFonts = {'BubblegumSans' : require('../assets/BubblegumSans-Regular.ttf')}

export default class CreatePost extends React.Component {
  constructor(){
    super();
    this.state={
      fontsLoaded : false,
      previewImage : '../assets/image_1.jpg',
      dropDownHieght : 40,
      light_theme : true,
      post_id : this.props.post.key,
      post_data : this.props.post.value,
    }
  }

  async loadFonts(){
    await Font.loadAsync(customFonts);
    this.setState({
      fontsLoaded : true,
    });
  }

  componentDidMount(){
    this.loadFonts();
  }

  addPost=async()=>{
    if(this.state.caption){
      let postData = {
        previewImage : this.state.previewImage,
        caption : this.state.caption,
        author : firebase.auth().currentUser.displayName,
        created_on : new Date(),
        author_uid : firebase.auth().currentUser.uid,
        profile_image : this.state.profile_image,
        like : 0,
      };
      await firebase
      .database()
      .ref(
        "/posts/" + Math.random()
          .toString(36)
          .slice(2)
      ).set(postData)
       .then(function(snapshot){});
       this.props.setUpdateToTrue();
       this.props.navigation.navigate('Feed');
    }else{
      Alert.alert(
        "Error!!",
        " All fields are required",
        [{text:"OK",onPress:()=>console.log("Ok Pressed")}],
         {cancelable : false}
        );
    }
  }

  render(){
    if(this.state.fontsLoaded === false){
      <AppLoading/>
    }else{
      var previewImg = {
        image1 : require('../assets/image_1'),
        image2 : require('../assets/image_2'),
        image3 : require('../assets/image_3'),
        image4 : require('../assets/image_4'),
        image5 : require('../assets/image_5'),
      }
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.safe}/>
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
              source={require('../assets/logo.png')}
              style={styles.iconImage}/>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitle}>New Post</Text>
            </View>
          </View>
          <View style={styles.fieldContainer}>
           <ScrollView>
            <Image
            source={previewImg[this.state.previewImage]}
            style={styles.previewImage}/>  
            <View style={{height : RFValue(this.state.dropDownHieght)}}>
              
              <DropDownPicker
              items={[
                {label : "Image 1", value : 'image1'},
                {label : "Image 2", value : 'image2'},
                {label : "Image 3", value : 'image3'},
                {label : "Image 4", value : 'image4'},
                {label : "Image 5", value : 'image5'}]}
                
                defaultValue={this.state.previewImage}
                containerStyle={{
                  height : 40,
                  borderRadius : 20,
                  marginBottom : 10,
                }}
                
                onOpen={()=>{
                  this.setState({dropDownHieght : 170})
                }}
                onClose={()=>{
                  this.setState({dropDownHieght : 40})
                }}
                
                style={{backgroundColor : "transparent"}}
                itemStyle={{justifyContent : 'flex-start'}}
                dropDownStyle={{backgroundColor : '#2a2a2a'}}
                labelStyle={{color : "white"}}
                arrowStyle={{color : "white"}}
                
                onChangeItem={item=>{
                  this.setState({
                    previewImg : item.value,
                  })
                }}
                />
            </View>

            <TextInput
            style={styles.inputFont}
            onChangeText={caption=>{
              this.setState({caption})
            }}
            placeHolder={"Caption"}
            placeholderTextColor={"white"}/>
           </ScrollView> 
          </View>
            <TouchableOpacity
            style={styles.button}
            onPress={()=>{
              this.addPost();
            }}>
              <Text>Submit</Text>
            </TouchableOpacity>
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
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
  inputFont: {
    height: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: 'top',
    padding: RFValue(5),
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
    marginTop: 20,
  },
});
