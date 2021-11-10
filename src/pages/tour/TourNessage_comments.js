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
        name:'游客15364577709',
        headimg:require('../../static/tour/detail/center.png'),
        content:'传统文化艺术在世界文明数千年的历史长河中，以其鲜明的个性和艺术特色洋溢着中华文明的民族特性，是中华文明的大旗。',
        time:'2020-9-10',
         islove:true,
        image:[require('../../static/tour/detail/center.png'),require('../../static/tour/detail/buttom.png'),require('../../static/tour/detail/top.png')],
        },{
        name:'游客15364577709',
        headimg:require('../../static/tour/detail/center.png'),
        content:'传统文化艺术在世界文明数千年的历史长河中，以其鲜明的个性和艺术特色洋溢着中华文明的民族特性，是中华文明的大旗。',
        time:'2020-9-10',
         islove:false,
        image:[require('../../static/tour/detail/center.png'),require('../../static/tour/detail/buttom.png'),require('../../static/tour/detail/top.png')],
        },
        ]
    };
      this. _onPress=()=>{
             const nav =this.props.value;
            nav.navigate('TourMessage_comments_list');
        }
    }
        componentWillMount(){
        axios.post('http://y2kqrq.natappfree.cc/comment/commentsRoot/commentrecord', {
        articleId:"1"
        }).then(res=>{
              console.log(res)
            // res=res.data.data;
            // this.setState({msg:res})
            // console.log(this.state.msg);
        },err=>{console.log(err)})
    } 
    render(){
         let DOM = this.state.comments.map((item, index) => 
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