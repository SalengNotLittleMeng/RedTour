import React, { Component }  from 'react';
import { View, Alert,Text, Image ,StatusBar,ImageBackground, StyleSheet,TouchableOpacity,TextInput,Button} from 'react-native';
// import { Input } from 'react-native-elements';
// import validator from './tools/validator';
import Login from './login';
import utils from '../../utils/utils';

class Loginfive extends Component {
  state = {    
    phone:" ", // 电话号码  
    vernumber:" ",// 验证码  
    newpassword:" ", //新密 码
    one:true,  // 输入电话号码
    two:false,  // 输入验证码
    three:false,   // 输入新密码
  }
// 获取电话号码
  phonenumber=(phone)=>{
    this.setState({phone});
  }

  // 点击下一步
  next=async()=>{   
     const {phone}=this.state;
    console.log(phone);
    const phoneValid=utils.checkPhone(phone);
    if(!phoneValid){
     Alert.alert('请输入正确的电话号码！');
     // console.log(phoneNumber);
     this.setState({ phoneValid});
   }
   else{
    this.setState({
      one:false,
      // 输入验证码
      two:true,
      // 输入新密码
      three:false,
    });

    let res =await  Http.hqyanzhengma({phoneNumber:phone});
    console.log(res);
            //   const res=await Http.VER({phoneNumber:phone});
            //  console.log(res)
}  }
// 获取验证码 
  vercode=(vernumber)=>{
    this.setState({vernumber});
  }
  // 点击验证
yanzheng=async()=>{

  const {vernumber}=this.state;
  console.log(vernumber);  
  if(!vernumber){
    console.log("hanhan");
  }else{
  this.setState({
    // 输入验证码
    two:false,
    // 输入新密码
    three:true,
  });
  let res =await Http.xiugaipassward({note:vernumber,number:phone});
  console.log(res);
}
}
// 获取新密码
newpassword=(newpassword)=>{
  this.setState({newpassword});
}

// 点击确定
queding=async()=>{
  const {newpassword}=this.state;
  let res =await  Http.xiugaipassward({phoneNumber:phone,password:newpassword});
  console.log(res);
  this.props.navigation.navigate("Logintwo");
}
// 渲染页面——重置密码输入手机号码
  phone=()=>{
    const {one,two,three}=this.state;
    return  <View style={styles.one}>
    <View>
    </View>
    <View>
          <TextInput
          placeholder="+86 输入手机号码"
          maxLength={11}
          inputStyle={{color:"#666666"}} 
          keyboardType="phone-pad"     //输入时键盘为数字键
          underlineColorAndroid='#666666'
          style={{ height: 60,fontSize:20,width:230}}
          onChangeText={this.phonenumber}
          // value={value}
          />                 
    </View>
    <View style={{marginTop:60}}>
    
    <TouchableOpacity
          activeOpacity={0.7}//点击时的透明度
          style={styles.button2}
          //点击事件，要记得绑定
          onPress={this.next}
          >
          <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}>下一步</Text>
    </TouchableOpacity>

    </View>

</View>
  }
// 渲染页面——重置密码输入验证码
  vernumber=()=>{
    const {one,two,three,phone}=this.state;
    return <View style={styles.two}>      
    <Text style={styles.text}>输入验证码                        </Text>
   <Text style={styles.textthree}> 短信验证码已发送至手机+86 {phone}  </Text>
     <View>
           <TextInput
           placeholder="         输入验证码"
           underlineColorAndroid='#666666'
           style={{ height: 60,fontSize:20,width:220,marginTop:15,marginBottom:30}}
           onChangeText={this.vercode}
           // value={value}
           />
     </View>
     <View style={{marginTop:10}}>
     
     <TouchableOpacity
           activeOpacity={0.7}//点击时的透明度
           style={styles.button2}
           //点击事件，要记得绑定
           onPress={this.yanzheng}
           >
           <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}> 验证</Text>
     </TouchableOpacity>
  
     </View>
  </View>
  }
// 渲染页面--输入新密码
  password=()=>{
    return <View style={styles.two}>      
    <Text style={styles.text}>输入新密码                        </Text>
  
     <View>
           <TextInput
           placeholder="     密码长度6-12位"
           underlineColorAndroid='#666666'
           style={{ height: 60,fontSize:20,width:220,marginTop:15,marginBottom:30}}
           onChangeText={this.newpassword}
           secureTextEntry={true}
           // value={value}
           />

     </View>
     <View style={{marginTop:10}}>
     
     <TouchableOpacity
           activeOpacity={0.7}//点击时的透明度
           style={styles.button2}
           //点击事件，要记得绑定
           onPress={this.queding}
           >
           <Text style={{fontSize:18,color:'white',fontWeight:'bold'}}> 确定</Text>
     </TouchableOpacity>
  
     </View>
  </View>
  }

  render() {
    const {one,two,three}=this.state;
    return (
      <View  style={{alignItems: 'center' }}>
          <Login></Login>
          {/* <Text style={{position:'absolute', marginTop:250,fontSize:18}}>重置密码                           </Text> */}
         {one ? this.phone():(two ? this.vernumber() :this.password() )}
         
        </View>
    );
  }
}
  const styles = StyleSheet.create({
    one: {
      paddingTop:290,
      height:500,
      flex: 1, 
      alignItems: 'center' ,
      position:'absolute'
    },
    button2 :{
      // marginTop:50,
      // position:'absolute',
      width:250,
      height:50,
      borderRadius: 10,//按钮圆角
      alignSelf:'center',
      backgroundColor:'#DE2910',
      justifyContent:'center',
      alignItems:'center'//显示Text组件居中
      }, 
      text:{
        fontSize:20,color:'#666666'
      },
      textthree:{
        color:"#666666",marginTop:7
      },
      two: {
        paddingTop:250,
        height:500,
        flex: 1, 
        alignItems: 'center' ,
        position:'absolute'
      }
  });

export default Loginfive;