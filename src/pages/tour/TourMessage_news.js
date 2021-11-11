import React, { useState, useRef,Component } from "react";
import TourMessage_main from './TourMessage_main'
import {
    Alert,
    Animated,
    PanResponder,
    TouchableOpacity,
    StyleSheet,
    Text,
    useColorScheme,
    TextInput,
    View,

} from 'react-native';
class Newsbox extends Component{
constructor(props){
super(props);
this.state={
    item:
     {articleContent:'',
        articleContentText:'',
        articleId:'',
    }
};
this._onPress=()=>{
        this.props.value.navigation.navigate('Details',{id:1});
    }

}
        render(){
    return (
        <TouchableOpacity onPress={this._onPress}>
            <View style={styles.news_content}>
                    <Text style={styles.one_news_title}>{this.props.msg.articleContent}</Text>
                    <Text style={styles.one_news_content}>{this.props.msg.articleContentText}</Text>
                <View style={styles.news_cover}><Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>阅读</Text></View>
            </View>
         </TouchableOpacity>
    )
}
}
export default class TourMessage_news extends Component {
    constructor(props){
    super(props);
    this.state = {
        msg:[
        {articleContent:'《神话方特》',
        articleContentText:'>榆次老城即榆次古县城，也叫子母城，由北部的县城和南部的郭城两部分组成，县城为母城，郭城为子城......',
        articleId:'',
        },
              {articleContent:'《神话方特》',
        articleContentText:'>榆次老城即榆次古县城，也叫子母城，由北部的县城和南部的郭城两部分组成，县城为母城，郭城为子城......',
        articleId:'',
        },
              {articleContent:'《神话方特》',
        articleContentText:'>榆次老城即榆次古县城，也叫子母城，由北部的县城和南部的郭城两部分组成，县城为母城，郭城为子城......',
        articleId:'',
        }
        ]
    };

    }
   componentWillMount(){
       if(this.props.msg.articleContentDtos.length!=0){
         this.setState({msg:this.props.msg.articleContentDtos})
        }
    } 
    render(){
    let DOM = this.state.msg.map((item, index) => (<Newsbox key={index} value={this.props.value} msg={this.state.msg[index]}></Newsbox>))
    return (
        <View style={styles.body}>
            <View style={styles.news_box}>
                <Text style={styles.news_title}>相关文章</Text>
                {DOM}
            </View>
        </View>
    )
}
}
const styles = StyleSheet.create({  
    body:{
        backgroundColor:'white'
    },
    news_box:{
          flex:1,
        paddingBottom:10,
        borderTopWidth:10,
        borderColor:'#F2F2F2',
        backgroundColor:'white',
    },
    news_title:{
        marginTop:15,
        fontWeight:'bold',
        fontSize:22,
        marginLeft:15
    },
    news_content:{
        marginTop:15,
        height:100,
        flex:1,
        marginLeft:15,
        marginRight:15,
    },
    one_news_title:{
        marginLeft:15,
        marginBottom:5,
        fontWeight:'bold',
        fontSize:18,
    },
    one_news_content:{
        color:'#707070',
        width:280,
    },
    news_cover:{
        position:'absolute',
        top:20,
        left:295,
        width:60,
        height:60,
        borderRadius:5,
        backgroundColor:'#AC2910',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }
});
