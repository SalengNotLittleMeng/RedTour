import React, { useState, useRef,Component } from "react";
import axios from 'axios';
import TourMessage_comments_item from "./TourMessage_comments_item"
import {
    Alert,
    Animated,
    PanResponder,
    TouchableOpacity,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    TextInput,
    View,
    Button,
    ImageBackground
} from 'react-native';
export default class TourMessage_comments extends Component {
    constructor(props){
    super(props);
    this.state = {
  comments:[{
        userName:'游客',
        userImg:'https://roy-tian.github.io/learning-area/extras/getting-started-web/beginner-html-site/images/firefox-icon.png',
        comment: "加载中",
        updateAt: "2021-10-26 21:44:09",
        likeNumber: 0
        },{
        userName:'游客',
        userImg:'https://roy-tian.github.io/learning-area/extras/getting-started-web/beginner-html-site/images/firefox-icon.png',
        comment: "加载中",
        updateAt: "2021-10-26 21:44:09",
        likeNumber: 0
        }
        ]
    };
      this. _onPress=()=>{
             const nav =this.props.value;
            nav.navigate('TourMessage_comments_list',{id:this.props.msg.id});
        }
    }
   componentWillReceiveProps(props){
        gitComment=async function(params){
            let res=await Http.spotComment({PageNum: 0,articleId:params.msg.id})
            console.log(res)
            res=res.data.data
          res.code!==-1&&this.setState({comments:res})
        }
        gitComment.call(this,props)
    } 
    render(){
        let len=this.state.comments.length>3?3:this.state.comments.length
        let arr=this.state.comments.slice(0,len).reverse()
         let DOM =arr&&arr.map((item, index) => 
            <TourMessage_comments_item key={index} item={this.props.value} msg={this.state.comments[index]}></TourMessage_comments_item>)
    return (
        <View style={styles.body}>
            <View  style={styles.comments_box}>
                <Text style={styles.comments_title}>用户点评<Text style={{fontSize:16,fontWeight:'normal'}}> (1128)</Text></Text>
                    <Text style={styles.get_more}  onPress={this._onPress} >查看全部 &gt;</Text>
                <Text style={{fontSize:16,marginLeft:15,marginBottom:10}}>
                        <Text style={{color:'#AC2910',fontSize:28,marginBottom:20}}>4.9</Text>/5分</Text>
                        {DOM}
                    <View style={styles.comments_getmore}>
                        <Text style={{ color:'#AC2910',fontSize:18,}} onPress={this._onPress}>查看全部评论 &gt;</Text>
                    </View>
            </View> 
        </View>
    )
}
}
const styles = StyleSheet.create({  
    body:{
        backgroundColor:'white'
    },
     comments_box:{
        borderTopWidth:10,
        borderColor:'#F2F2F2', 
    },  
        comments_title:{
        marginTop:15,
        fontWeight:'bold',
        fontSize:22,
        marginLeft:15,
        marginBottom:5,
    },
        comments_content:{
        padding:10,
        flex:1,
        display:'flex',
        justifyContent:'center'
    },
    comments_word:{
        marginLeft:30,
        fontSize:16,
        lineHeight:45,
    },
    get_more:{
        position:'absolute',
        left:290,
        top:18,
        color:'#AC2910',
        fontSize:16,
    },
    comments_getmore:{
     display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:60,
    }
});