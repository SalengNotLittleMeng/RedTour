import React,{Component } from 'react';
import { View,Button, Text,Image ,StatusBar,ImageBackground, StyleSheet} from 'react-native';
import { Input,BottomSheet,ListItem } from 'react-native-elements';
import {inject,observer} from "mobx-react";
import RootStore from '../../mobx/index';
@inject('RootStore')
@observer
// import { Button } from 'react-native-elements';
class Nicheng extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
press = () => {
  this.setState({
    checked:true
  })
};
// 输入昵称
nichengChange=(name)=>{
  this.setState({name});
}
// 点击保存
picksave=async()=>{
  const {name} =this.state;

  const phoneNumber= this.props.RootStore.userStore.allData.phoneNumber;
  const img= this.props.RootStore.userStore.allData.img;
  const profession= this.props.RootStore.userStore.allData.profession;
  const birthday= this.props.RootStore.userStore.allData.birthday;

  // console.log(222,RootStore.userStore.allData.birthday);
  // console.log(222,RootStore.userStore.allData.phoneNumber);
  
  // Http.xiugaidata({birthday:birthday,img:'222',name:name,phoneNumber:phoneNumber,profession:'xues'}).then((res)=>{
  //      console.log(res)
  //     },err=>{
  //       console.log(err)
  //     }
  //    );

  let res=await Http.xiugaidata({birthday:birthday,img:'222',name:name,phoneNumber:phoneNumber,profession:'xues'})
   console.log(res.data.code)
   if(res.data.code==200){
    this.props.navigation.navigate("Pone")
    let res =await Http.personaldata({});
   this.props.RootStore.userStore.infoSet(res.data.data);
  //  console.log(RootStore.userStore.allData.name);
   }
  //  if(res
  // this.props.RootStore.userStore.infoSet(res.data.data);
  // console.log(11111,RootStore.userStore.allData.name);  
}
  render() {
      return (
        <View style={{}}>
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
                <Button  title="保存"
                color="#65D674"
                style={{}}
                onPress={()=>this.picksave()}
                
                />
                   

                   
                </View>
                </View>

       {/* 修改昵称 */}
       <Input
       placeholder=" "
      //  underlineColorAndroid='#666666'
        style={{ height: 60,fontSize:20,width:220,marginTop:15,marginBottom:0}}
        onChangeText={this.nichengChange}
      //  value={value}
       
       />

       </View>
      )
  }
};


const LoginStyles = StyleSheet.create({   
  login:{

  }
});

export default Nicheng;

