import React, { Component }  from 'react';
import {Alert, View, Text, ScrollView,SafeAreaView,Image ,StatusBar,ImageBackground, StyleSheet,TouchableOpacity,TextInput,Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem,Avatar } from 'react-native-elements'
 class Safe extends Component {
    constructor(props) {
        super(props);
      }
      state={
        show:true,
        password:null,
        passwordfirs:null,
        passwordsecond:null
      }
    Press=()=>{
        this.setState({
            show:false,
          }) 
    }
    password=(password)=>{
        this.setState({password});
      }
    passwordfirst=(passwordfirst)=>{
      this.setState({passwordfirst});
    }
    passwordsecond=(passwordsecond)=>{
      this.setState({passwordsecond});
    }
    picksave=async()=>{
        if(passwordfirst!=passwordsecond){
            Alert.alert("两次输入不一致")
            return
        }
        const {password,passwordfirst,passwordsecond} =this.state;
        let res =await  Http.xiugaipassward({newPassword:password,newPasswordAgain:passwordsecond});
        console.log(res);
    }
    one=()=>{
    return    <View >      
        {/* 导航 */}
        <View style={{height:80, backgroundColor:"white",paddingTop:30}}>
            <TouchableOpacity
            onPress={this.context.goBack}
            style={{ marginLeft:20, marginTop:10, }}>
                <Text style={{}} >返回</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center',fontSize:16,marginTop:-15}}>账号与安全{/* {this.props.title} */}</Text>
           </View>
           {/* 导航 */}
           <View style={{paddingTop:20}}>
              <ListItem  bottomDivider
              onPress={()=>this.Press()}>
                  <Image style={{}} source={require('../imgc/a.png')}></Image>
                  <ListItem.Content><ListItem.Title>修改密码</ListItem.Title></ListItem.Content>  
                  <ListItem.Chevron />
              </ListItem>
             <Text>  </Text>
             <ListItem bottomDivider >
                     <Image source={require('../imgc/c.png')}></Image>
                     <ListItem.Content><ListItem.Title>忘记密码</ListItem.Title></ListItem.Content>
                     <ListItem.Chevron />  
             </ListItem>
        </View>
  </View>
    }
    // 修改密码
    two=()=>{
        return    <View >      
            {/* 导航 */}
            <View style={ {flexDirection:'row',height:50,marginTop:40}}>
                <View style={ {flex:1}} >
                    <Text 
                    // onPress={()=>this.props.navigation.goBack()}
                    style={ {fontSize:16,marginLeft:15}}>  返回</Text>    
                 </View>
                <View style={ {flex:4}}>
                  <Text style={ {fontSize:18,textAlign: 'center'}}>修改密码</Text>
                </View>
                <View style={ {flex:1}}>
                <Button  title="保存" color="#65D674" style={{}}
               onPress={()=>this.picksave()} />
                </View>
            </View>
               {/* 导航 */}
               <View style={{paddingTop:20,flexDirection:'row'}}>
                  <Text style={{ fontSize:16,width:60,margin:20}}>原密码</Text>         
                  <TextInput
                   placeholder="  填写原密码"
                   underlineColorAndroid='#666666'
                   style={{ fontSize:15,width:250}}
                   onChangeText={this.password}
                   // value={value}
                   />
            </View>
            <View style={{flexDirection:'row'}}>
                  <Text style={{ fontSize:16,width:60,margin:20}}>新密码</Text>         
                  <TextInput
                   placeholder="  填写新密码"
                   underlineColorAndroid='#666666'
                   style={{ fontSize:15,width:250}}
                   onChangeText={this.passwordfirst}
                   // value={value}
                   />
            </View>
            <View style={{flexDirection:'row'}}>
                  <Text style={{ fontSize:16,width:80,marginLeft:20,marginRight:0,marginTop:20,marginBottom:20}}>确认密码</Text>         
                  <TextInput
                   placeholder="  再次填写确认"
                   underlineColorAndroid='#666666'
                   style={{ fontSize:15,width:250}}
                   onChangeText={this.passwordsecond}
                   // value={value}
                   />
            </View>
      </View>
        }
    render() {
    const {show}=this.state;
      return (    
        <View>
            {show ? this.one() :this.two()}
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
  
  });

  export default Safe;