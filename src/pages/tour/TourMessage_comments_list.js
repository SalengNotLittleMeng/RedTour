import React, { useState, useRef,Component } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    View,
} from 'react-native';
import TourMessage_comments_item from'./TourMessage_comments_item'
export default class TourMessage_comments_list extends Component {
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
        ],
        value:''
    };
    this._onPress=()=>{
            addCommit=async function(){
                let res=await Http.addCommit({articleId:this.props.route.params.id,comment:this.state.value})
                console.log(res)
                if(res.data.code==200){
                    this.setState({value:''})
                    this.gitComment.call(this)
                    console.log(this.state.comments)
                }else{
                Alert.alert("发生了一点错误哦")
                }
            }
            addCommit.call(this)
        }
    this.gitComment=async function(){
            let res=await Http.spotComment({PageNum: 0,articleId:this.props.route.params.id})
            res=res.data.data
          res.code!==-1&&this.setState({comments:res})
        }
    }
    componentWillMount(){
        this.gitComment.call(this)
    } 
    render(){
         let DOM = this.state.comments.map((item, index) => 
            <TourMessage_comments_item key={index} item={this.props.navigation} msg={this.state.comments[index]}></TourMessage_comments_item>)
    return (
        <View style={styles.body}>
        <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
            <Image style={{position:'absolute',top:12,left:10, transform:[{scale:0.6}]}} source={require('../../static/tour/detail/back.png')} />
            <View style={{height:60, display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:21}}>评 论</Text>
            </View>
            <ScrollView style={styles.middle}>
                {DOM}
                    <View style={{height:60}}></View>
            </ScrollView>
            <View style={styles.buttom_box}>
                <TextInput placeholder="说说你的看法..." 
                style={styles.input}
                onChangeText={text =>{this.setState({value:text})}}
                value={this.state.value}
                />
                <Image source={require('../../static/tour/detail/little_whitelove.png')} />
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.send_button}><Text style={styles.send_text}>发送</Text></View>
            </TouchableOpacity>
            </View>
        </View>
    )
}
}
const styles = StyleSheet.create({  
    body:{
        flex:1,
        display:'flex',
         flexDirection:'column',
        justifyContent:"space-between",
        backgroundColor:'white'
    },
    middle:{
    flexBasis:1
    },
    send_button:{
    width:70,
    height:35,
    textAlign:"center",
    backgroundColor:'#AC2910',
    borderRadius:5,
    display:'flex',
     justifyContent:'center',
    alignItems:'center'
    },
    send_text:{
    color:'white',
    },
    input:{
    width:250,
    borderRadius:20,
    height: 40, 
    borderColor:'rgba(0,0,0,0)',
    backgroundColor: '#F5F5F5', 
    borderWidth: 1 ,
    color:'#707070',
    paddingLeft:20,
    },
    buttom_box:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
    height:60, 
    backgroundColor:'white',
    borderTopWidth:1,
    borderTopColor:'#E4E4E4'
    },
});