import React,{Component } from 'react';
import { View,Button, Text,Image ,StatusBar,ImageBackground, StyleSheet} from 'react-native';
import { Input } from 'react-native-elements';
import {inject,observer} from "mobx-react";
import RootStore from '../../mobx/index';
@inject('RootStore')
@observer
// import { Button } from 'react-native-elements';
class Birthday extends Component {
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
birthdayChange=(name)=>{
  this.setState({name});
  console.log(name);
}
// 点击保存
picksave=async()=>{
  const {name} =this.state;
  console.log(name);
  const phoneNumber= this.props.RootStore.userStore.allData.phoneNumber;
  // const birthday= this.props.RootStore.userStore.allData.birthday;
  // const birthday= this.props.RootStore.userStore.allData.birthday;
  // const birthday= this.props.RootStore.userStore.allData.birthday;

  let res =await  Http.xiugaidata({name:name,birthday:birthday,phoneNumber:phoneNumber,});
  console.log(res)
  this.props.RootStore.userStore.infoSet(res.data.data);
  console.log(11111,RootStore.userStore.allData.name);
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
                  <Text style={ {fontSize:18,textAlign: 'center'}}>生日</Text>
                </View>
                <View style={ {flex:1}}>
                <Button  title="保存"
                color="#65D674"
                style={{}}
                // onPress={()=>this.picksave()}
                
                />
                   
                </View>
                </View>
        {/* 导航 */}

       {/* 修改昵称 */}
       <Input
       placeholder=" "
       underlineColorAndroid='#666666'
        style={{ height: 60,fontSize:20,width:220,marginTop:15,marginBottom:0}}
        onChangeText={this.birthdayChange}
       value={value}
       
       />
       </View>
      )
  }
};

const LoginStyles = StyleSheet.create({   
  login:{

  }
});

export default Birthday;

