
import React, { useState, useRef,Component } from "react";
import axios from 'axios';
import TourMessage_main from './TourMessage_main';
import TourMessage_news from './TourMessage_news';
import TourMessage_comments from './TourNessage_comments';
import TourMessage_other from './TourMessage_other';
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
export default class TourMessage extends Component {
    constructor(props){
    super(props);
    this.state = {
        msg:{
        articleContentDtos:[
        // {articleId: "1", articleContent: "标题1", articleContentText: "4586"},
        //  {articleId: "1", articleContent: "标题1", articleContentText: "4586"},
        //  {articleId: "1", articleContent: "标题1", articleContentText: "4586"},
        ],
        commentsDtos: [],
        id: "1",
        imges: [],
        introduct: "",
        location: "1",
        name: "",
        score: 1,
        tel: 1,
        type: "1",
            }
    };

    }
     componentWillMount(){
        getSpotDetail=async function(){
            let res=await Http.spotDetail({id:this.props.route.params.id})
            res=res.data.data;
            this.setState({msg:res})
        }
        getSpotDetail.call(this)
    } 
    render(){
    return (
        <View style={styles.body}>
             <ScrollView style={{height:800}}>
                <TourMessage_main msg={this.state.msg}></TourMessage_main>
                <TourMessage_news value={this.props} msg={this.state.msg}></TourMessage_news>
                <TourMessage_comments value={this.props.navigation} msg={this.state.msg}></TourMessage_comments>
                <TourMessage_other></TourMessage_other>
                {/* <View style={{height:800}}></View> */}
            </ScrollView>  
        </View>
    )
}
}
const styles = StyleSheet.create({  
    body:{
        backgroundColor:'white',
        height:800,
    },
});
