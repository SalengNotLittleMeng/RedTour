import { func } from "prop-types";
import React, { useState, useRef,Component } from "react";
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
     Keyboard
} from 'react-native';
import TourMessage_comments_item from'./TourMessage_comments_item'
let commitId='111'
class Calllist extends Component{
    render(){
        console.log(this.props.msg)
        return(
            <View style={styles.list_bg}>
                <Text><Text style={{color:'#AC2910'}}>{this.props.msg.fromName}</Text> 回复 <Text style={{color:'#AC2910'}}>{this.props.msg.toName}</Text>：{this.props.msg.comment}</Text>
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
    this.onPressItem=()=>{
        this.props.eventDom&&this.props.eventDom.focus()
        commitId=this.props.msg.commentId
    }
    this.setLove=()=>{
        this.setState({islove:!this.state.islove})
    }
    }
        render(){
         let DOM = this.props.msg.commentsReplyDtos3?this.props.msg.commentsReplyDtos3.map((item, index) => 
            <Calllist key={index} msg={this.props.msg.commentsReplyDtos3[index]}></Calllist>):<View></View>
    return (
            <View  style={styles.comments_content}>
                    <TouchableOpacity onPress={this.onPressItem}>
                <View>
                    <Image style={styles.headImage} source={{uri:this.props.msg.fromImg}} />
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
                </View>
                </TouchableOpacity>
                 {DOM}
            </View>
    )
}
}
export default class TourMessage_comments_detail extends Component {
    constructor(props){
    super(props);
    this.keyboardDidHideListener = null;
    this.state = {
        value:'',
        msg:{},
         comments:[],
        value:''
    };
    this._onPress=()=>{
        if(this.state.value==''){
            Alert.alert('输入不能为空哦')
            return
        }
        addCommit=async function(){
            let msg=this.state.msg
            let res=await Http.replayCommitAdd({articleId:msg.articleId,comment:this.state.value,id:commitId})
            console.log(res)
            if(res.data.code==200){
                this.setState({value:''})
                this.getReplayCommit.call(this)
            }
        }
        addCommit.call(this)
        commitId=this.state.msg.id
        }
        this.getReplayCommit=async function(){
            await this.setState({msg:this.props.route.params.msg})
            let msg=this.state.msg
            let res=await Http.replayCommitList({PageNum:0,articleId:msg.articleId,id:msg.id})
                console.log(res)
            res=res.data.data
            this.setState({comments:res})
        }
    }
    componentDidMount(){
        commitId=this.state.msg.id
        this.getReplayCommit.call(this)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
       commitId=this.state.msg.id );
    }
    render(){
         let DOM = this.state.comments.map((item, index) => 
            <Commentsbox key={index} item={this.props.navigation} msg={this.state.comments[index]} eventDom={this.refs.commitInput}></Commentsbox>)
    return (
        <View style={styles.body}>
            <View style={{flex:1}}>
                   <ScrollView >
        <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
              <TouchableOpacity onPress={()=>{console.log(this.props.navigation)}}>
               <View>
                     <Image style={{position:'absolute',top:12,left:10, transform:[{scale:0.6}]}} source={require('../../static/tour/detail/back.png')} />
                </View>
             </TouchableOpacity>
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
                ref='commitInput'
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
    love:{
        position:'relative',
        left:20
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