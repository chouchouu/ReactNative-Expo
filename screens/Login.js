import React from 'react';
import { View, Text, Button,SafeAreaView,Image,TextInput,ToastAndroid,Alert,TouchableOpacity,ImageBackground } from 'react-native';
import firebaseConfig from '../firebase/firebase.js';
import Icon from 'react-native-vector-icons/FontAwesome'


export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      Email:'',
      Password:'',
      showProgress:false,
    };
  }
  openProgress = (kt) => {
    this.setState({ showProgress: kt });
}
  getData =(Email,Password)=>{
    if(Email != ''&& Password !=''){
      this.setState({
        Email:'',
        Password:'',
      })
      this.openProgress(true);
      this.onLogin();
    }else{
      ToastAndroid.show("Vui lòng nhập đầy đủ thông tin",ToastAndroid.SHORT);
      
    }

  }
  onLogin = () => {
    const { Email, Password } = this.state;
    firebaseConfig.auth().signInWithEmailAndPassword(Email, Password)
      .then((user) => {
        // If you need to do anything with the user, do it here
        ToastAndroid.show("Đăng nhập thành công",ToastAndroid.SHORT);
        this.props.navigation.navigate('Main', {
          Email: Email,
  
              })
        this.openProgress(false);
  
      })
      .catch((error) => {
        const { code, message } = error;
        // representation of the error
        this.openProgress(false),
       Alert.alert('Lỗi! ', 'Vui lòng đăng nhập lại',[],{ cancelable: true })
      });
    }

  render() {
    const { navigation } = this.props;
    return (
        <SafeAreaView style={{height:1000}}>
        <View style={{ marginTop:50, marginLeft:30,marginRight:30}}>
        <ImageBackground style={{width:350,height:250,marginTop:-30,left:-25}} source={{uri:'https://livewallpaperhd.com/wp-content/uploads/2017/09/Goodnight-Iphone-Stars-Wallpaper.jpg'}}>
        <View style={{alignItems:'center',marginTop:10}}>
        <Icon name="github" color="#eee" size={50} />
        </View>
        <Text style={{left:20,color:'white'}}>Email</Text>
        <TextInput style={{height:30,width:300,borderBottomColor:'black',borderBottomWidth:0.5,left:20}}onChangeText={(Email) => this.setState({Email})}
                  value={this.state.Email}/>
        <Text style={{left:20,color:'white'}}>Password</Text>
       
        <TextInput style={{height:30,width:300,borderBottomColor:'black',borderBottomWidth:0.5,left:20}}  onChangeText={(Password) => this.setState({Password})}
                  value={this.state.Password}/>
             <View style={{marginTop:20}}>
        
        <TouchableOpacity style={{}} onPress={this.getData.bind(this,this.state.Email,this.state.Password)} >
          <Text style={{color:'white',size:'25',borderColor:'white',borderBottomWidth:1,alignSelf:'center',borderTopWidth:1}}><Icon name="lock" color="#eee" size={20}></Icon>  SIGN UP</Text>
     
        </TouchableOpacity>
       </View>
        </ImageBackground>
       

   
          </View>
          <View style={{  marginTop:10,marginLeft:30,marginRight:30,}}>
          <TouchableOpacity style={{backgroundColor:'pink',height:35,borderColor:'black',borderWidth:1,marginTop:20}}  onPress={() =>this.props.navigation.navigate('Regist')} >
          <Text style={{alignSelf:'center'}}><Icon name="plus" color="black" size={15}></Icon> CREATE AN ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'pink',height:35,borderColor:'black',borderWidth:1,marginTop:20}} >
          <Text style={{alignSelf:'center'}}><Icon name="user" color="black" size={15}></Icon> SIGN UP WITH FACEBOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'pink',height:35,borderColor:'black',borderWidth:1,marginTop:20}} >
          <Text style={{alignSelf:'center'}}><Icon name="chrome" color="black" size={15}></Icon> SIGN UP WITH GOOGLE</Text>
        </TouchableOpacity>
       </View>

       
       </SafeAreaView>
    
    );
  }

}
