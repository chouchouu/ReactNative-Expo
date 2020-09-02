import React from 'react';
import { View, Text, Button,SafeAreaView,Image } from 'react-native';

export default class Welco extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={{backgroundColor:'#FFC1C1',height:1000}}>
      <Image style={{width:150,height:150,borderBottomLeftRadius:150,borderBottomRightRadius:150,borderTopLeftRadius:150,borderTopRightRadius:150,left:100,marginTop:150}} source={{uri:'https://i.pinimg.com/originals/58/71/61/58716100d7b241cdf612c29fc7ffb7c2.jpg'}}/>
      <View style={{marginTop:20}}>
      <View style={{width:290,height:100,left:30}}>
      <Button
        title="SIGN UP"
        onPress={() => {
            navigation.navigate('Login');
        }}/>
        </View>
        <View style={{marginTop:-50,width:290,height:100,left:30}}>
        <Button
        title="CREATE ACCOUNT"
        onPress={()=>{navigation.navigate('Regist');
        }}/>
        </View>
    </View>
    </SafeAreaView>
    );
  }
}
