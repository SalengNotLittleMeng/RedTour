import React, { useState, useRef,Component } from "react";
import {
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
export default class TourMessage extends Component {
    constructor(props){
    super(props);
    this.state = {
        islove:false,
        comments:{}
    };
    this.componentDidMount=()=>{
        this.setState({comments:this.props.msg})
        this.setState({isLove:this.props.msg.status?true:false})
    }
    this.setLove=()=>{
        this.setState({islove:!this.state.islove})
         loveCommit=async function(){
            console.log(this.props.msg)
            let res=await Http.loveCommit({articleId:this.props.msg.articleId,id:this.props.msg.id})
            console.log(res)
        }
        loveCommit.call(this)
    }
    this._onPress=()=>{
        if(this.props.item){
        const nav =this.props.item;
        nav.navigate('TourMessage_comments_detail',{msg:this.props.msg});
            }
        }
    }
    render(){
    return (
        <View style={styles.body}>
           <View style={styles.comments_content}>
          <TouchableOpacity onPress={this._onPress}>
                <View>
              <Image style={styles.headImage} source={{uri:this.state.comments.userImg}} />
                <Text style={styles.comments_name}>{this.props.msg.userName}</Text>
                <Text style={styles.comments_main}> <Text>&emsp;&emsp;</Text>{this.props.msg.comment}</Text>
                    <View style={styles.comments_img_box}>
                    </View>
                </View>
            </TouchableOpacity>
                    <View style={{marginTop:15 ,display:'flex',flexDirection:'row'}}>
                        <Text style={{color:'#666666',fontSize:17}}>{this.props.msg.updateAt}</Text>
                        <View style={styles.comments_button}>
                            <TouchableOpacity onPress={this.setLove}>
                            <Image style={{transform:[{scale:0.8}]}} 
                                source={this.state.islove?require('../../static/tour/detail/little_redlove.png'):require('../../static/tour/detail/little_whitelove.png')}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={this._onPress}>
                        <View style={styles.comments_button}>
                             <Text  style={{fontWeight:'bold',color:'#707070'}}>· · ·</Text>
                        </View>
                        </TouchableOpacity>
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
    headImage:{
             width: 60,
            height: 60,
            borderRadius: 30,

    },
    comments_content:{
        paddingLeft:15,
        paddingRight:15,
        marginTop:20,
        borderBottomWidth:1,
        borderBottomColor:'#DCDCDC',
        paddingBottom:15,
    },
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
    comments_img_box:{
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    comments_img_item:{
        width:110,
        height:100,
        marginBottom:10,
        marginRight:10
    },
    comments_button:{
        position:'relative',
        left:175,
        marginRight:30,
        width:36,
        height:24,
        borderColor:'rgba(153,153,153,0.4)',
        borderRadius:8,
        borderWidth:2,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
});