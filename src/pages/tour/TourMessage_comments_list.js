import React, { useState, useRef,Component } from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import TourMessage_comments_item from'./TourMessage_comments_item'
export default class TourMessage_comments_list extends Component {
    constructor(props){
    super(props);
    this.state = {
        comments:[{
        name:'游客15364577709',
        headimg:require('../../static/tour/detail/center.png'),
        content:'传统文化艺术在世界文明数千年的历史长河中，以其鲜明的个性和艺术特色洋溢着中华文明的民族特性，是中华文明的大旗。',
        time:'2020-9-10',
        islove:false,
        image:[require('../../static/tour/detail/center.png'),require('../../static/tour/detail/buttom.png'),require('../../static/tour/detail/top.png')],
        },{
        name:'游客15364577709',
        headimg:require('../../static/tour/detail/center.png'),
        content:'传统文化艺术在世界文明数千年的历史长河中，以其鲜明的个性和艺术特色洋溢着中华文明的民族特性，是中华文明的大旗。',
        time:'2020-9-10',
         islove:false,
        image:[require('../../static/tour/detail/center.png'),require('../../static/tour/detail/buttom.png'),require('../../static/tour/detail/top.png')],
        },{
        name:'游客15364577709',
        headimg:require('../../static/tour/detail/center.png'),
        content:'传统文化艺术在世界文明数千年的历史长河中，以其鲜明的个性和艺术特色洋溢着中华文明的民族特性，是中华文明的大旗。',
        time:'2020-9-10',
         islove:false,
        image:[],
        },{
        name:'游客15364577709',
        headimg:require('../../static/tour/detail/center.png'),
        content:'传统文化艺术在世界文明数千年的历史长河中，以其鲜明的个性和艺术特色洋溢着中华文明的民族特性，是中华文明的大旗。',
        time:'2020-9-10',
         islove:false,
        image:[],
        },
        ]
    };

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
            <ScrollView>
                {DOM}
                    <View style={{height:60}}></View>
            </ScrollView>
        </View>
    )
}
}
const styles = StyleSheet.create({  
    body:{
        backgroundColor:'white'
    },
});