import React, { Component }  from 'react';
import { View, Text, Image ,StatusBar,ImageBackground, StyleSheet,TouchableOpacity,TextInput,Button} from 'react-native';
import { ListItem,Input,Avatar } from 'react-native-elements'
import {inject,observer} from "mobx-react";
import RootStore from '../../mobx/index';

@inject('RootStore')
@observer
class Pone extends Component {
  constructor(props) {
    super(props);
    this.state = {
    userInfo:{}
    };
  }
  componentWillMount= async ()=>{
      let res =await  Http.personaldata({});
     if(res.status&&res.status==200&&res.data.code==200){
            this.props.RootStore.userStore.infoSet(res.data.data);
            this.setState({userInfo:res.data.data})
            console.log(this.state.userInfo.img)
        }
  } 
    render() {     
      return (
        <View >
            {/* 导航 */}
            <View style={ {flexDirection:'row',height:50,marginTop:40}}>
                <View style={ {flex:1}} >
                    <Text 
                     onPress={()=>this.props.navigation.goBack()}
                    style={ {fontSize:16,marginLeft:15}}> 返回</Text> 
                 </View>
                <View style={ {flex:1}}>
                    <Text style={ {fontSize:18,textAlign: 'center'}}>个人信息</Text>
                </View>
                <View style={ {flex:1}}></View>
            </View>
           {/* 导航 */}
          <View style={{alignItems: 'center', justifyContent: 'center',paddingTop:10}}>
              <Avatar
                  rounded
                  size={100}
                  // onPress={this.Avatar}
                  source={{uri:this.state.userInfo.img}}
              />
          </View>

            <View style={{paddingTop:30}}>
                  <ListItem  bottomDivider>
                      <Image source={require('../imgc/a.png')}></Image>
                     <ListItem.Content><ListItem.Title>我的足迹</ListItem.Title></ListItem.Content>  
                    <ListItem.Chevron />
                 </ListItem>
            
                 <ListItem bottomDivider rightTitle={'222'}>
                       <Image source={require('../imgc/b.png')}></Image>
                        <ListItem.Content><ListItem.Title>我的点赞</ListItem.Title></ListItem.Content>
                         <ListItem.Chevron /> 
                 </ListItem>
            <Text>  </Text>
                <ListItem bottomDivider 
                onPress={()=>this.props.navigation.navigate("Nicheng",{showone:true,showtwo:false})}>
                      <Image  source={require('../imgc/c.png')}></Image>
                        <ListItem.Content><ListItem.Title>用户名称</ListItem.Title></ListItem.Content>
                        <ListItem.Subtitle >{this.props.RootStore.userStore.allData.name}</ListItem.Subtitle>
                        <ListItem.Chevron />  
                </ListItem>

                <ListItem bottomDivider
                onPress={()=>this.props.navigation.navigate("Nicheng",{showone:false,showtwo:true})}>
                      <Image source={require('../imgc/d.png')}></Image>
                      <ListItem.Content><ListItem.Title>职业</ListItem.Title></ListItem.Content>
                      <ListItem.Subtitle >{this.props.RootStore.userStore.allData.profession}</ListItem.Subtitle>
                      <ListItem.Chevron /> 
                </ListItem>

                <ListItem bottomDivider
                onPress={()=>this.props.navigation.navigate("Nicheng",{showone:false,showtwo:false})}>
                      <Image source={require('../imgc/e.png')}></Image>
                      <ListItem.Content><ListItem.Title>生日</ListItem.Title></ListItem.Content>
                      <ListItem.Subtitle >{this.props.RootStore.userStore.allData.birthday}</ListItem.Subtitle>
                      <ListItem.Chevron /> 
                </ListItem>

                <ListItem bottomDivider>
                      <Image source={require('../imgc/f.png')}></Image>
                      <ListItem.Content><ListItem.Title>手机号码</ListItem.Title></ListItem.Content>
                      <ListItem.Subtitle >{this.props.RootStore.userStore.allData.phoneNumber}</ListItem.Subtitle>
                      <ListItem.Chevron /> 
                </ListItem>
            <Text>  </Text>
                <ListItem bottomDivider onPress={()=>this.props.navigation.navigate("Ptwo")}>
                      <Image style={{marginLeft:-5}} source={require('../imgc/g.png')}></Image>
                      <ListItem.Content><ListItem.Title>设置</ListItem.Title></ListItem.Content>
                      <ListItem.Chevron /> 
                </ListItem>
            </View>

        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    two: {
      paddingTop:250,
      height:500,
      flex: 1, 
      alignItems: 'center' ,
      position:'absolute'
    }
  });
export default Pone;