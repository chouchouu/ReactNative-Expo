import React from 'react';
import { View, Text, Button,SafeAreaView,Image,TextInput,TouchableOpacity,ToastAndroid,Alert } from 'react-native';
import firebaseConfig from '../firebase/firebase.js';


export default class Regis extends React.Component {
  constructor(props){
   super(props);
   this.state={
     Email :'',
     Password:'',
     cofim:'',
     UserName:'',
     showProgress:false,

     
  };
   }
   
  openProgress = (kt) => {
    this.setState({ showProgress: kt });
}

   getData=(Email,cofim)=>{
    if ( Email != '' && cofim != '' && this.state.Password != '' ) {
      if (cofim == this.state.Password) {
        this.setState({
          Email:'',
          Password:'',
          cofim:'',
        })
        this.openProgress(true);
        this.onRegister();
      }else{
        ToastAndroid.show('Vui lòng nhập chính xác mật khẩu', ToastAndroid.SHORT);
      }
    }else{
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.SHORT);
    }

  }
   onRegister = () => {
    const { Email, cofim } = this.state;
    firebaseConfig.auth().createUserWithEmailAndPassword(Email, cofim)
      .then((user) => {
          ToastAndroid.show('Đăng kí thành công', ToastAndroid.SHORT);
          this.openProgress(false),
          this.props.navigation.navigate('Login')
      })
      .catch((error) => {
        const { code, message } = error;
        this.openProgress(true);
       Alert.alert('Lỗi! ', 'Vui lòng thử lại',[],{ cancelable: true })
  
      });
    }
  
  render() {
    const { navigation } = this.props;
    return (
        <SafeAreaView style={{height:1000}}>
    
        <View style={{ marginTop:50, marginLeft:30,marginRight:30}}>
       
        <TextInput placeholder='Password' style={{height:40,width:300,marginTop:10,borderColor:'black',borderWidth:1}} onChangeText={(Password) => this.setState({Password})}
                value={this.state.Password}/>
        <TextInput placeholder='Confirm Password' style={{height:40,width:300,borderColor:'black',borderWidth:1,marginTop:10}} onChangeText={(cofim) => this.setState({cofim})}
                value={this.state.cofim}/>
        <TextInput placeholder='Email Address' style={{height:40,width:300,borderColor:'black',borderWidth:1,marginTop:10}} onChangeText={(Email) => this.setState({Email})}
                value={this.state.Email}/>
        </View>
        <View style={{marginTop:30}}>
        <TouchableOpacity style={{}} onPress={this.getData.bind(this,this.state.Email,this.state.cofim)} >
          <Text style={{alignSelf:'center',color:'grey'}}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      
          </View>
          <View style={{  marginTop:10,marginLeft:30,marginRight:30,}}>
          <TouchableOpacity style={{}} onPress={() => this.props.navigation.goBack()}>
          <Text style={{alignSelf:'center',color:'grey'}}>SIGN UP </Text>
        </TouchableOpacity>
       </View>
       
  
       
       </SafeAreaView>
    
    );
  }

}
