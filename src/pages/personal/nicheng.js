import React,{Component } from 'react';
import {Alert, View,Button, Text,Image ,StatusBar,ImageBackground, StyleSheet} from 'react-native';
import { Input,BottomSheet,ListItem } from 'react-native-elements';
import {inject,observer} from "mobx-react";
import RootStore from '../../mobx/index';
@inject('RootStore')
@observer
// import { Button } from 'react-native-elements';
class Nicheng extends Component {
  constructor(props) {
    super(props);
  }
  state={
    showone:this.props.route.params.showone,
    showtwo:this.props.route.params.showtwo,
    name: this.props.RootStore.userStore.allData.name,
    phoneNumber:this.props.RootStore.userStore.allData.phoneNumber,
    img:this.props.RootStore.userStore.allData.img,
    profession:this.props.RootStore.userStore.allData.profession,
    birthday:this.props.RootStore.userStore.allData.birthday,
  }
press = () => {
  this.setState({
    checked:true
  })
}
// 输入昵称
nameChange=(name)=>{
  this.setState({name});
}
professionChange=(profession)=>{
  this.setState({profession});
}
birthdayChange=(birthday)=>{
  this.setState({birthday});
}
// 点击保存
picksave=async()=>{
  // const {name} =this.state;
  const name= this.state.name;
  const phoneNumber= this.state.phoneNumber;
  const img= this.state.img;
  const profession= this.state.profession;
  const birthday= this.state.birthday;
console.log(this.state)
  let res=await Http.xiugaidata({birthday:birthday,img:img,name:name,phoneNumber:phoneNumber,profession:profession})
  console.log(res.data)
  if(res.data.code==200){
      this.props.navigation.navigate("Pone")
      let res =await Http.personaldata({});
      this.props.RootStore.userStore.infoSet(res.data.data);
        Alert.alert('修改成功')
   }
}


// 生日
renderBirthday=()=>{
  return    <View >      
  {/* 导航 */}
  <View style={ {flexDirection:'row',height:50,marginTop:40}}>
        <View style={ {flex:1}} >
            <Text 
            onPress={()=>this.props.navigation.navigate("Pone")}
            style={ {fontSize:16,marginLeft:15}}>  返回</Text>    
         </View>
        <View style={ {flex:4}}>
          <Text style={ {fontSize:18,textAlign: 'center'}}>生日</Text>
        </View>
        <View style={ {flex:1}}>
          <Button  title="保存" color="#65D674" style={{}}
          onPress={()=>this.picksave()} />
        </View>
       </View>
       {/* 修改昵称 */}
       <Input
       placeholder=" "
      //  underlineColorAndroid='#666666'
        style={{ height: 60,fontSize:20,width:220,marginTop:15,marginBottom:0}}
        onChangeText={this.birthdayChange}
      //  value={value}
       />
   
</View>
}

// 职业
renderProfession=()=>{
  return    <View >      
  {/* 导航 */}
  <View style={ {flexDirection:'row',height:50,marginTop:40}}>
        <View style={ {flex:1}} >
            <Text 
            onPress={()=>this.props.navigation.navigate("Pone")}
            style={ {fontSize:16,marginLeft:15}}>  返回</Text>    
         </View>
        <View style={ {flex:4}}>
          <Text style={ {fontSize:18,textAlign: 'center'}}>职业</Text>
        </View>
        <View style={ {flex:1}}>
          <Button  title="保存" color="#65D674" style={{}}
          onPress={()=>this.picksave()} />
        </View>
       </View>
       {/* 修改昵称 */}
       <Input
       placeholder=" "
      //  underlineColorAndroid='#666666'
        style={{ height: 60,fontSize:20,width:220,marginTop:15,marginBottom:0}}
        onChangeText={this.professionChange}
      //  value={value}
       />
     
</View>
}

// 昵称
renderName=()=>{
  return    <View >      
  {/* 导航 */}
  <View style={ {flexDirection:'row',height:50,marginTop:40}}>
        <View style={ {flex:1}} >
            <Text 
            onPress={()=>this.props.navigation.navigate("Pone")}
            style={ {fontSize:16,marginLeft:15}}>  返回</Text>    
         </View>
        <View style={ {flex:4}}>
          <Text style={ {fontSize:18,textAlign: 'center'}}>用户名称</Text>
        </View>
        <View style={ {flex:1}}>
          <Button  title="保存" color="#65D674" style={{}}
          onPress={()=>this.picksave()} />
        </View>
       </View>
       {/* 修改昵称 */}
       <Input
        placeholder=" "
      //  underlineColorAndroid='#666666'
        style={{ height: 60,fontSize:20,width:220,marginTop:15,marginBottom:0}}
        onChangeText={this.nameChange}
      //  value={value}
       />
        
</View>
}


  render() {
    const {showone,showtwo}=this.state;
      return (
        <View>      
        {showone ? this.renderName() :(showtwo ? this.renderProfession() :this.renderBirthday() )}
       </View>
      )
  }
};

const LoginStyles = StyleSheet.create({   
  login:{

  }
});

export default Nicheng;

