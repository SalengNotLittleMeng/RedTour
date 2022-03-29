import React, { useState, useRef,Component } from "react";
import axios from 'axios';
import {
    Alert,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';
import TourMessage_comments_item from'./TourMessage_comments_item'
class Calllist extends Component{
    render(){
        return(
            <View style={styles.list_bg}>
                <Text><Text style={{color:'#AC2910'}}>抬头捉月光</Text> 回复 <Text style={{color:'#AC2910'}}>匿名用户</Text>：大家互相学习，一起进步</Text>
            </View>
        )
    }
}
class Commentsbox extends Component{
    constructor(props){
    super(props);
    this.state={
        islove:false
        }
    this.setLove=()=>{
        this.setState({islove:!this.state.islove})
    }
    }
        render(){
        //  let DOM = this.props.msg.reply.map((item, index) => 
        //     <Calllist key={index} msg={this.props.msg.reply[index]}></Calllist>)
    return (
            <View  style={styles.comments_content}>
                    <Image style={styles.headImage} source={this.props.msg.fromImg} />
                <Text style={styles.comments_name}>{this.props.msg.fromName}</Text>
                <View style={{display:'flex',flexDirection:'row',position:'absolute',left:300,top:25}}>
                <TouchableOpacity onPress={this.setLove}>
                <Image style={styles.love} 
                source={this.state.islove?
                    require('../../static/tour/detail/little_redlove.png')
                    :require('../../static/tour/detail/little_whitelove.png')}/>
                </TouchableOpacity>
                <Text style={{fontSize:16,marginLeft:10,color:"#999999",position:'relative',top:-2}}></Text>
                </View>
                <Text style={styles.comments_main}> <Text>&emsp;&emsp;</Text>{this.props.msg.comment}</Text> 
                 {/* {DOM} */}
            </View>
    )
}
}
export default class TourMessage_comments_detail extends Component {
    constructor(props){
    super(props);
    this.state = {
        value:'',
        msg:{
        userName:'游客15364577709',
        UserImg:require('../../static/tour/detail/center.png'),
        comment:'传统文化艺术在世界文明数千年的历史长河中，以其鲜明的个性和艺术特色洋溢着中华文明的民族特性，是中华文明的大旗。',
        time:'2020-9-10',
        articleId:'1',
        },
         comments:[{
        name:'游客15364577709',
        headimg:require('../../static/tour/detail/center.png'),
        content:'传统文化艺术在世界文明数千年的历史长河中，以其鲜明的个性和艺术特色洋溢着中华文明的民族特性，是中华文明的大旗。',
        time:'2020-9-10',
        image:[],
        reply:[{fir:'抬头捉月光',sec:'匿名用户',content:'：大家互相学习，一起进步'}]
        },],
        value:''
    };
    this. _onPress=()=>{
        addCommit=async function(){
            let msg=this.state.msg
            let res=await Http.replayCommitAdd({articleId:msg.articleId,comment:this.state.value,id:msg.id})
        }
        addCommit.call(this)
        }
    }
    componentDidMount(){
    getReplayCommit=async function(){
        await this.setState({msg:this.props.route.params.msg})
        let msg=this.state.msg
        let res=await Http.replayCommitList({PageNum:0,articleId:msg.articleId,id:msg.id})
        res=res.data.data.recordlist
        console.log(res)
        this.setState({comments:res})
    }
        getReplayCommit.call(this)
    }
    render(){
         let DOM = this.state.comments.map((item, index) => 
            <Commentsbox key={index} item={this.props.navigation} msg={this.state.comments[index]}></Commentsbox>)
    return (
        <View style={styles.body}>
            <View style={{flex:1}}>
                   <ScrollView >
        <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
             <View>
                <Image style={{position:'absolute',top:12,left:10, transform:[{scale:0.6}]}} source={require('../../static/tour/detail/back.png')} />
            </View>
                <View  style={{height:60, display:'flex',justifyContent:'center',alignItems:'center'}}>
                     <TouchableOpacity><Text style={{fontSize:21}}>评 论 详 情</Text></TouchableOpacity>
            </View>
                <TourMessage_comments_item  msg={this.state.msg}></TourMessage_comments_item>
                    <View style={styles.middle_box}>
                        <View style={styles.left_line}></View>
                            <Text style={{fontSize:18}}>全部评论</Text>
                    </View>            
                        {DOM}
            </ScrollView>
            </View>
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
    body:{
        display:'flex',
        backgroundColor:'white',
        flex:1,
    },
        comments_content:{
        paddingLeft:15,
        paddingRight:15,
        marginTop:20,
        borderBottomWidth:1,
        borderBottomColor:'#DCDCDC',
        paddingBottom:15,
    },
    middle_box:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15,
        height:60,
        borderBottomColor:'#DCDCDC',
        borderBottomWidth:1
    },
    left_line:{width:5,height:40,backgroundColor:'#AC2910',borderRadius:3,marginRight:15},
     comments_name:{
        position:'absolute',
        left:85,
        top:20,
        fontSize:16,
    },
    comments_main:{
        marginTop:10,
        fontSize:16,
        color:'rgba(0,0,0,0.8)',
        lineHeight:25,
        marginBottom:10,
    },
        headImage:{
             width: 60,
            height: 60,
            borderRadius: 30,
    },
    list_bg:{
    margin:15,
    marginTop:0,
    marginLeft:40,
    padding:20,
    width:300,
    backgroundColor:'#F5F5F5',
    borderRadius:5,
    }
});