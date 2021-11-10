import React, { Component }  from 'react';
import { View, Text, Image ,StatusBar,ImageBackground, StyleSheet,TouchableOpacity,TextInput,Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem,Avatar } from 'react-native-elements'
// import { } from 'react-native-elements'
// import { Input } from 'react-native-elements';
// import validator from './tools/validator';
 class Pthree extends Component {
    render() {
      return (
        <View >

        {/* 导航 */}
        <View style={{height:60, backgroundColor:"white"}}>
            <TouchableOpacity
            onPress={this.context.goBack}
            style={{ marginLeft:20, marginTop:10 }}>
                <Text style={{}} > 返回 </Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center',fontSize:16,marginTop:-10}}>反馈与帮助{/* {this.props.title} */}</Text>
        </View>
    {/* 导航 */}
    <Text style={{lineHeight:40}}>   热门问题 </Text>
    {/* <Text > </Text> */}
        <View 
        // style={{paddingTop:20}}
        >
              <ListItem  bottomDivider>
                 <ListItem.Content>
                    <ListItem.Title>   如何找到我的旅游记录</ListItem.Title>
                 </ListItem.Content>  
                <ListItem.Chevron />
             </ListItem>
        <ListItem bottomDivider >
                <ListItem.Content>
                    <ListItem.Title>   如何进入音频模式</ListItem.Title>
                 </ListItem.Content>
                <ListItem.Chevron />  
        </ListItem>
        <ListItem bottomDivider>
              <ListItem.Content>
                    <ListItem.Title>   如何进入文字模式</ListItem.Title>
                 </ListItem.Content>
                <ListItem.Chevron /> 
        </ListItem>
        <ListItem bottomDivider >
              <ListItem.Content>
                    <ListItem.Title>   更换地点后如何刷新旅游模式</ListItem.Title>
                 </ListItem.Content>
                <ListItem.Chevron /> 
        </ListItem>
        <Text style={{lineHeight:40}}>   意见反馈 </Text>
        <ListItem bottomDivider 
        // style={{ paddingTop: 10}}
        // onPress={()=>this.onpress()}
        >
              <ListItem.Content>
                    <ListItem.Title>   卡退或闪退</ListItem.Title>
                 </ListItem.Content>
                <ListItem.Chevron /> 
        </ListItem>
        <ListItem bottomDivider>
              <ListItem.Content>
                    <ListItem.Title>   文章无法打开</ListItem.Title>
                 </ListItem.Content>
                <ListItem.Chevron /> 
        </ListItem>
        <ListItem bottomDivider>
              <ListItem.Content>
                    <ListItem.Title>   足迹功能</ListItem.Title>
                 </ListItem.Content>
                <ListItem.Chevron /> 
        </ListItem>
        <ListItem bottomDivider>
              <ListItem.Content>
                    <ListItem.Title>   界面错位</ListItem.Title>
                 </ListItem.Content>
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
export default Pthree;