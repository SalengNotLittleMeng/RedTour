import React, { Component }  from 'react';
import { View, Text, Button,Image ,ImageBackground, Alert,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
// import { Input } from 'react-native-elements';
// import validator from '../../tools/validator';
import utils from '../../utils/utils';
import Login from './login';
// import {VERACCOUNT_LOGIN} from '../../tools/api';
// import request from '../../tools/request';
// import axios from 'axios';
import { AsyncStorage } from 'react-native';
import {inject,observer} from "mobx-react";
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import RootStore from '../../mobx/index';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
@inject('RootStore')
@observer


class Logintwo  extends Component {
   constructor(props){
     super(props);
   }
    state = {
      phoneNumber:"13303454658",
      phoneValid:true,
      showone:true,
      showtwo:false,
      // showone:false,
      // showtwo:false,
      // 验证码
      verphone:"123456",
      password:"123456",
      disabled: false,
    }

// 验证码的定时器
// count=()=>{
//   let seconds=60;
//   this.set
// }

// 填写电话号码
   phoneChange=(phoneNumber)=>{
     this.setState({phoneNumber});
     if(phoneNumber==""){
      Alert.alert('请输入电话号码！');
     }
     // console.log(phoneNumber);
   }
// 点击获取验证码
    press= async()=>{
      const {phoneNumber}=this.state;
      // 输入的电话号码phoneNumber
      // console.log(phoneNumber);
      const phoneValid=utils.checkPhone(phoneNumber);
             if(!phoneValid){
              Alert.alert('请输入正确的电话号码！');
              // console.log(phoneNumber);
             this.setState({ phoneValid});
            }else{
              // console.log(phoneNumber);
              this.setState({
                showone:false,
                showtwo:true
              })  
            
              console.log(phoneNumber);
              let res =await  Http.hqyanzhengma({phoneNumber:phoneNumber});
              console.log(res);
            // const token =index.setToken(token);

            
            // axios.post("49.233.252.20:8085/authentication/user/logind",{phoneNumber:phoneNumber}).then(res=>{
            //   console.log(res);
            // },err=>{console.log(err)});
            // const res=await request.post(VERACCOUNT_LOGIN,{phoneNumber:phoneNumber})
          
            //   const res=await Http.VER({phoneNumber:phoneNumber});
            //  console.log(res)
            //  const  { token }=res.data;
            //  console.log(token);
            }
            

    }
// 点击密码登录
    presstwo=async()=>{
      const {phoneNumber}=this.state;
      // 输入的电话号码phoneNumber
      console.log(phoneNumber);
      const phoneValid=utils.checkPhone(phoneNumber);
             if(!phoneValid){
              Alert.alert('请输入正确的电话号码！');
              // console.log(phoneNumber);
             this.setState({ phoneValid});
            }else{
                 this.setState({
                  showone:false,
                  showtwo:false
                })
             
            }
}

// 填写验证码
verNumber=(verphone)=>{
  this.setState({verphone});
  // console.log(verphone);

}
// 验证验证码
verpress=async()=>{
  const {verphone,phoneNumber} =this.state;
  console.log(verphone);

  let res =await Http.yzmyanzheng({note:verphone,number:phoneNumber});
res.data&&res.data.code==200?this.loginSuccee(res):this.loginError(res)
              // AsyncStorage.setItem("userinfo",JSON.stringify({
              //   token:res.data.token, 
              // }))

        
}   

// 填写密码
passwordChange=(password)=>{
  this.setState({password});
}
// 验证密码

onpress=async()=>{
      const {password,phoneNumber} =this.state;
      console.log(password);   
      let res= await Http.dynamicList({number:phoneNumber,password:password});
    console.log(res)
      // let res= await Http.dynamicList({number:'13303454658',password:'123456'});
     res.data&&res.data.code==200?this.loginSuccee(res):this.loginError(res)

     
        // LocalStorageUtils.set('token', token);
        // console.log(RootStore.userStore.allData.ANSWER_ACCESS_TOKEN);
}
  
loginSuccee=(res)=>{
      const token =res.data.data.accessToken;
      this.props.RootStore.userStore.setToken(token);
      let config={'name':"redtour"}
      LocalStorageUtils.set('userInfo',config)
      this.props.navigation.navigate("Tab");
}
loginError=(res)=>{
        Alert.alert('好像有点问题哦...')
}
    // 渲染登录
renderLogin=()=>{
  // const {phoneNumber,phoneValid}=this.state;
  return <View style={styles.one}> 
  <View>
    </View>
    <View>
    
          <TextInput
          placeholder="      请输入手机号码"
          maxLength={11}
          inputStyle={{color:"#666666"}} 
          keyboardType="phone-pad"     //输入时键盘为数字键
          underlineColorAndroid='#666666'
          style={{ height: 60,fontSize:20,width:220}}
          // onSubmitEditing={this.onSubmitEditing}
          // errorMessage="手机号码不正确"
          onChangeText={this.phoneChange}
          // value={phoneNumber}
          />
    </View>

    <View style={{}}>
    
    <TouchableOpacity
        activeOpacity={0.7}//点击时的透明度
        style={styles.buttonone}
        onPress={this.press}
      >
        <Text style={styles.textone}>获取验证码</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}//点击时的透明度
        style={styles.buttontwo}
        onPress={this.presstwo}
        
      >
        <Text style={styles.texttwo}
        >密码登录</Text>
      </TouchableOpacity>
    </View>
</View>
  
}

    // 输入验证码
renderVcode=()=>{
  const {phoneNumber,verphone,phoneValid,showone,showtwo}=this.state;
  return    <View style={styles.two}>      
  <Text style={styles.text}>输入验证码                        </Text>
 <Text style={styles.textthree}> 短信验证码已发送至+86   {phoneNumber}     </Text>
   <View>
         <TextInput
         placeholder="         输入验证码"
         underlineColorAndroid='#666666'
         style={{ height: 60,fontSize:20,width:220,marginTop:15,marginBottom:30}}
         // value={value}
         onChangeText={this.verNumber}
         />
   </View>

   <View style={{marginTop:10}}>
   
   <TouchableOpacity
         activeOpacity={0.7}//点击时的透明度
         style={styles.buttonone}
         onPress={this.verpress}
         //点击事件，要记得绑定
         
         >
         <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}> 验证</Text>
   </TouchableOpacity>

   </View>
</View>
}
onPressButton = (state) => {
  this.setState({
    disabled: state,
  });
};
// 密码登录
renderpass=()=>{
  return    <View style={styles.two}>      
  <Text style={styles.text}>输入密码                        </Text>
   <View>
         <TextInput
         placeholder="  密码长度6-12位"
         underlineColorAndroid='#666666'
         style={{ height: 60,fontSize:20,width:220,marginTop:15,marginBottom:0}}
         onChangeText={this.passwordChange}
         password={true}
         secureTextEntry={true}
         // value={value}
         />
   </View>
   <View style={{marginTop:10}}>
   <Text
    style={{color:'#666666',marginBottom:40,marginLeft:180}}
    onPress={()=>this.props.navigation.navigate("Loginfive")} 
    >找回密码</Text>
   <TouchableOpacity
   disabled={this.state.disabled}
         activeOpacity={0.7}//点击时的透明度
         style={styles.buttonone}
         //点击事件，要记得绑定
         onPress={()=>this.onpress()}
         >
         <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}> 验证</Text>
   </TouchableOpacity>

   </View>
</View>
}

render() {
      const {phoneNumber,phoneValid,showone,showtwo}=this.state;
      return (
        <View  style={{alignItems: 'center' , flex: 1,
       
}}>
          <Login></Login>
          {/* 登录 */}
          {/* 填写验证码 */}
          {/* 密码登录 */}
          {showone ? this.renderLogin() :(showtwo ? this.renderVcode() :this.renderpass() )}
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    text:{
      fontSize:20,color:'#666666'
    },
    textthree:{
      color:"#666666",marginTop:7
    },
    textone:{
      fontSize:18,color:'white',fontWeight:'bold'
    },
    texttwo:{
      fontSize:18,color:'#666666',fontWeight:'bold'
    },
    buttonone: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 13,
      marginTop:20,
      width:250,
      alignSelf:'center',
      backgroundColor:'#DE2910',
      justifyContent:'center',
      borderRadius: 10//按钮圆角
    },
    buttontwo: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 13,
      marginTop:20,
      width:250,
      alignSelf:'center',
      backgroundColor:'white',
      justifyContent:'center',
      borderRadius: 10//按钮圆角
    },
    one: {
      paddingTop:280,
      height:500,
      flex: 1, 
      alignItems: 'center' ,
      position:'absolute'
    },
    two: {
      paddingTop:250,
      height:500,
      flex: 1, 
      alignItems: 'center' ,
      position:'absolute'
    }
  });
export default Logintwo;