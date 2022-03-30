import React, { Component }  from 'react';
import { View, Text, Image ,Input,StatusBar,ImageBackground, StyleSheet,TouchableOpacity,TextInput,Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem,Avatar,BottomSheet} from 'react-native-elements'
import LocalStorageUtils from '../../utils/LocalStorageUtils'
// import { } from 'react-native-elements'
// import { Input } from 'react-native-elements';
// import validator from './tools/validator';
 class Ptwo extends Component {
// 退出
  onPress=async()=>{
    let res =await Http.userexit({});
    console.log(res);
    LocalStorageUtils.deleteItem('userInfo');
    this.props.navigation.navigate("Logintwo");
  }
// 注销
  Press=async()=>{
    let res =await Http.userexit({});
    console.log(res);
    LocalStorageUtils.deleteItem('userInfo');
    this.props.navigation.navigate("Logintwo");
  }
    render() {
      return (
        <View >
        {/* 导航 */}
        <View style={{height:80, backgroundColor:"white",paddingTop:30}}>
            <TouchableOpacity
            onPress={this.context.goBack}
            style={{ marginLeft:20, marginTop:10, }}>
                <Text style={{}} >返回</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center',fontSize:16,marginTop:-15}}>设置{/* {this.props.title} */}</Text>
        </View>
    {/* 导航 */}
  
        <View style={{paddingTop:20}}>
              <ListItem  bottomDivider
              onPress={()=>this.props.navigation.navigate("Safe")}>
                  <Image style={{}} source={require('../imgc/a.png')}></Image>
                  <ListItem.Content><ListItem.Title>账号与安全</ListItem.Title></ListItem.Content>  
                  <ListItem.Chevron />
              </ListItem>
             <Text>  </Text>
             <ListItem bottomDivider 
             onPress={()=>this.props.navigation.navigate("Pthree")}>
                     <Image source={require('../imgc/c.png')}></Image>
                     <ListItem.Content><ListItem.Title>反馈与帮助</ListItem.Title></ListItem.Content>
                     <ListItem.Chevron />  
             </ListItem>
             <ListItem bottomDivider
              onPress={()=>this.props.navigation.navigate("Pfour")}>
                 <Image source={require('../imgc/d.png')}></Image>
                 <ListItem.Content><ListItem.Title>用户协议</ListItem.Title></ListItem.Content>
                 <ListItem.Chevron /> 
             </ListItem>
    
             <Text>  </Text>
        <ListItem bottomDivider onPress={()=>this.Press()}>
              <Image  source={require('../imgc/d.png')}></Image>
              <ListItem.Content><ListItem.Title>注销</ListItem.Title></ListItem.Content>
              <ListItem.Chevron /> 
        </ListItem>
        <ListItem bottomDivider onPress={()=>this.onPress()}>
              <Image style={{}} source={require('../imgc/d.png')}></Image>
              <ListItem.Content><ListItem.Title>退出登录</ListItem.Title></ListItem.Content>
              <ListItem.Chevron /> 
        </ListItem>



        </View>

    </View>
      );
    }
  }
  const styles = StyleSheet.create({
    one: {
      color:"red"
    },
    two:{
      
    },
    
  });
export default Ptwo;