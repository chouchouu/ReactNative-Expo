import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    Button,
    FlatList,
    Alert,
    ListView,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native'
import Modal from 'react-native-modal'
import firebase from '../firebase/firebase.js';
//expo
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
export default class HomeScreen extends React.Component{
    constructor(props){
        super(props)
        //
     
        this.state={
            postContent:'',
            post:[],
            modalVisible:false,
            modalVisible1:false,
            
            
        }
        this.itemsRef = firebase.database().ref().child('products');
     
    }
    _showDialog = () => {
        this.setState({modalVisible: true})
    }
   
    _hideDialog = () => {
        this.setState({modalVisible: false})
    }
    _post = () => {
        this.setState({modalVisible:true})
    }
    _showDialog1 = () => {
        this.setState({modalVisible1: true})
    }
   
    _hideDialog1 = () => {
        this.setState({modalVisible1: false})
    }
    _post1 = () => {
        this.setState({modalVisible1:true})
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                let item = {
                    key:(child.key),
                    //pic
                    image:child.val().uri,
                    name:child.val().name,
                    price: child.val().price,
                    info: child.val().info,
                   
                }
                items.push(item);
            });


            this.setState({
                post: items,
               
            });
            this.state.post.map((item, idx) =>{
                console.log(item.key)
            })

        });
    }
   
    _delete(key){
        firebase.database().ref().child('products').child(key).remove()
    }
//sửa
_edit(){
    this._showDialog1();
  
    
}

    componentWillMount (){
        this.listenForItems(this.itemsRef)
    }
  
    
    render(){
        //mới đưa
        let {image} =this.state;
        return(
            <View style={styles.container}>
                <Modal
                    isVisible={this.state.modalVisible}
                    onBackButtonPress={this._hideDialog}
                    onBackdropPress={this._hideDialog}>
                    <InsertProduct/>

                </Modal>

                <Modal
                    isVisible={this.state.modalVisible1}
                    onBackButtonPress={this._hideDialog1}
                    onBackdropPress={this._hideDialog1}>
                    <UpdateProduct/>

                </Modal>
              
              
               
                <View style={styles.postStatus}>
                <TouchableOpacity 
                        onPress={()=>{this._showDialog()}}>
                        <ImageBackground style={{backgroundColor:'yellow'}} >
                        <Image style={{width:50,height:50,borderBottomLeftRadius:150,borderBottomRightRadius:150,borderTopLeftRadius:150,borderTopRightRadius:150,left:300,marginTop:25}} source={{uri:'https://i.pinimg.com/originals/f1/03/7c/f1037c020078c5be94a5a8219db9f3eb.png'}}>
                        </Image>
                        <Text style={{marginTop:-35,alignSelf:'center',fontSize:25}}>PEACEMINUSONE</Text>
                        </ImageBackground>
                        </TouchableOpacity>                      
                </View>
            
            
                <FlatList
                    data={this.state.post}
                    //
                    renderItem={({item}) => 
                    <View style={styles.postContainer}>
                  
                   <Image style={{width:80,height:80,borderBottomLeftRadius:100,borderBottomRightRadius:100,borderTopLeftRadius:100,borderTopRightRadius:100,left:5}} source={{uri:'https://i.pinimg.com/originals/f1/03/7c/f1037c020078c5be94a5a8219db9f3eb.png'}}>
                    </Image>
                         <Text style={{left:100, marginTop:-80}}>Name: {item.name} </Text> 
                        <Text style={{left:100,marginTop:10}}>Price: {item.price}</Text>
                        <Text style={{left:100,marginTop:10}}>Description: {item.info}</Text>
                        <TouchableOpacity style={{position:'absolute',right:1}}
                                    onPress={()=>{
                                        this._delete(item.key)
                                    }}>
                                    <Text style={{marginTop:70}}>Delete</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                                    style={{
                                        position:'absolute',
                                        right:50
                                    }}
                                    onPress={()=>{this._edit(item.name)}}>
                                    
                                    
                                    <Text style={{marginTop:70}}>Update</Text>
                        </TouchableOpacity>
                    </View>
                             }
                />
                
            </View>
        )
 
    }
}
    const {width, height} = Dimensions.get('window')
    const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:'#fff'
        },
        postStatus:{
            backgroundColor:'#f2f2f2'
        },
        //item background
        postContainer:{
            backgroundColor:'#f1f1f1',
            margin:width*3.6/187.5,
            padding:width*3.6/187.5,
            borderRadius: width*3.6/187.5,
        },
        nameAuth:{
            color:'#000',
            fontSize:16
        },
        postText:{
            color:'#000',
            // backgroundColor:'#fff',
            padding:width*3.6/187.5
        },

    })

    
    //Thêm
    export class InsertProduct extends React.Component{
        constructor(props){
            super(props)
            this.state={
                name:'',
                price:'',
                info:'',
                image: null,
                
            }
        }
        _post = () =>{
            console.log('post' ,new Date().getTime())
            firebase.database().ref().child('products').push({

                name:this.state.name,
                price:this.state.price,
                info:this.state.info,
                image:this.state.image,
            
            })
        }

        render(){
            let {image} =this.state;
            
            return(
                <View style={{
                    width: width*167.5/187.5,

                    backgroundColor:'#fff',
                    padding:width*5/187.5
                }}>
                <View style={{alignSelf:'center'}}>
                <TouchableOpacity onPress={this._pickImage}>
                <Text style={{alignSelf:'center',fontSize:15}}>Choose photo</Text>
                </TouchableOpacity>
                {image && <Image source={{uri:image}} style={{width:100,height:100}}/>}
                </View>
               
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                    
                        <Text>Tên sản Phẩm:</Text>
                        <TextInput
                            style={{flex:1}}
                            onChangeText={(value)=>{this.setState({name:value})}}
                        />
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Giá:</Text>
                        <TextInput
                            style={{flex:1}}
                            onChangeText={(value)=>{this.setState({price:value})}}
                        />
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Mô tả:</Text>
                        <TextInput
                            style={{flex:1}}
                            onChangeText={(value)=>{this.setState({info:value})}}
                        />
                    </View>

                    <View style={{flexDirection:'row', margintop:width*3.6/187.5, alignItems:'center',justifyContent:'center'}}>

                        <Button style={{width:width*80/187.5}} title='Save' onPress={()=>{this._post()}}/>
                    </View>
                </View>
            )
        }
        //Picture
        componentDidMount(){
            this.getPermissionAsync();
            console.log('hi');
        }
        getPermissionAsync =async ()=>{
            if(Constants.platform.ios){
                const {status} =await
                Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted'){
                    Alert("Sorry!!!");
                }
            }
        }
        //thư viện hoặc camera
        _pickImage =async()=>{
            let result =await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.All,allowsEditing:true,aspect:[4,3],quality:1
            });
            //console.log(result);
            if (!result.cancelled){
                //set trên img
                this.setState({image: result.uri});
                //up firebase
                this.uploadImage(result.uri).then(() =>{
                  
                })
                .catch((error)=>{
                });
            }
        }
        //firebase up
        uploadImage =async (uri) =>{
            const reponse = await fetch(uri);
            const blob = await reponse.blob();
            var ref = firebase.storage().ref().child(uri);
            return ref.put(blob);


        }
    }
//Sửa
    export class UpdateProduct extends React.Component{
        constructor(props){
            super(props)
            this.state={
                name:'',
                price:'',
                info:'',
            }
           
        }
        /*_edit = () =>{
           
            firebase.database().ref().child('products').child().set({

                name:this.state.name,
                price:this.state.price,
                info:this.state.info,
      
            })
        }*/
        
        _edit(key){
            
            this.setState({modalVisible: true})
              firebase.database().ref().child('products').child(key).set({
                
                name:this.state.name,
                price:this.state.price,
                info:this.state.info,
              })
            }


        render(){
            return(
                <View style={{
                    width: width*167.5/187.5,

                    backgroundColor:'#fff',
                    padding:width*5/187.5
                }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Tên sản Phẩm: </Text>
                        <TextInput
                            style={{flex:1}}
                            value={this.state.name}
                            onChangeText={(value)=>{this.setState({name:value})}}
                        />
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Giá: </Text>
                        <TextInput
                            style={{flex:1}}
                            value={this.state.price}
                            onChangeText={(value)=>{this.setState({price:value})}}
                        />
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text>Mô tả: </Text>
                        <TextInput
                            value={this.state.info}
                            style={{flex:1}}
                            onChangeText={(value)=>{this.setState({info:value})}}
                        />
                    </View>

                    <View style={{flexDirection:'row', margintop:width*3.6/187.5, alignItems:'center',justifyContent:'center'}}>

                    <Button style={{width:width*80/187.5}} title='Save' onPress={()=>{this._edit()}}/>
                    </View>
                </View>
            )
        }
    }
