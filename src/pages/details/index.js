import React,{Component} from 'react'
import {
    View,
    Text,
    Button,
    StatusBar,
    TextInput,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
    flex,
    TouchableOpacity,
    Dimensions
    
} from 'react-native';

import { pxToDp } from '../../utils/pxToDp';
import { WebView } from 'react-native-webview';
// import request from "../request"
// import { BASE_URI,XQ_PAGE,ARTICLE_LIKE } from '../pathMap';
import axios from 'axios';

import {
    user_like_1,
    user_like_2
} from '../../constants/svg';
import Svg from 'react-native-svg-uri';

import { NavigationContext } from '@react-navigation/native';

import {inject,observer} from "mobx-react";
import RootStore from '../../mobx/index';
@inject('RootStore')
@observer

export default class XiangQing extends Component{
    static contextType=NavigationContext;
    constructor (props) { 
        super(props); 
        this.state = { 
            like: true,
            Collection: true,
            details:{},
            PageNum:1
        }; 
        id = this.props.route.params.id;
        
    } 
    // componentWillMount(){
    //     this.transmitId();
    // }
    componentDidMount(){
        this.transmitId();
        this.itLike();
        this.itCollection();
    }

    //传递ID获取详情
    transmitId=async()=>{
        // console.log(id);
        axios.post("http://49.233.252.20:8085/user/content/articleShow",{id}).then(res=>{
            // console.log(res.data.data) ;
            this.setState({ details:res.data.data })
        })
    }
    //文章点赞函数
    likeFun=async()=>{

        let res=await Http.userDZ({articleId:id})
        console.log(res)
        if(res.data.code!=-1){
            console.log("喜欢成功")
            this.setState({ 
                like: !this.state.like,
            }) 
        }else{
            console.log("失败")
        }
    }
    //判断用户是否点赞函数
    itLike=async()=>{
        let res=await Http.userItDZ({articleId:id,PageNum:this.state.PageNum})
        console.log(res.data.data.status)
        if(res.data.data.status==0){
            this.setState({ 
                like: true,
            }) 
        }else{
            this.setState({ 
                like: false,
            }) 
        }
    }
    //文章收藏函数
    CollectionFun=async()=>{

        let res=await Http.userSC({articleId:id})
        console.log(res)
        if(res.data.code!=-1){
            console.log("收藏成功")
            this.setState({ 
                Collection: !this.state.Collection,
            }) 
        }else{
            console.log("失败")
        }
    }
    //判断用户是否收藏函数
    itCollection=async()=>{
        let res=await Http.userItSC({articleId:id,PageNum:this.state.PageNum})
        console.log(res.data.data.status)
        if(res.data.data.status==0){
            this.setState({ 
                Collection: true,
            }) 
        }else{
            this.setState({ 
                Collection: false,
            }) 
        }
    }
    render(){
        const {navigation}=this.props;
        const {details} = this.state ;
        var windowHeight = Dimensions.get('window').height*0.88;
        return (
            <View>
                <View style={styles.tabNavigetion}>
                    {/* 返回按钮 */}
                    <TouchableOpacity 
                        onPress={()=>{
                            navigation.goBack()
                        }}>
                        <Image style={styles.goBack} source={require('../../static/img/goBack.png')} />
                    </TouchableOpacity>
                    {/* 文章标题 */}
                    <Text style={styles.title}>{details.articleTitle} </Text>
                    {/* 分享按钮 */}
                    <TouchableOpacity >
                        <Image style={styles.share} source={require('../../static/img/share.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView> 
                    <View style={{flex:1,backgroundColor:"FFFFFF",height:windowHeight}}>
                        <StatusBar backgroundColor="#F5F5F5" barStyle={"dark-content"} translucent={true}/>
                        {/* 测试页面文本 */}
                        {/* <Text style = {styles.textTitle}>走进红色故都瑞金,探寻共和国诞生地</Text>
                        <Image style = {styles.img} source={require('../../static/img/12345.png')} />
                        <Text style = {styles.textContent}>       瑞金市，江西省直辖、赣州市代管县级市，位于江西省南部，武夷山脉南段西麓，赣江东源，贡水上游。
                            东与福建省长汀县交界，南与会昌县毗邻，西连于都县，北接宁都、石城二县。</Text>                 */}
                    <WebView 
                        originWhitelist={['*']}
                        source={{ html: details.text }}
                    />
                    {/* <Text style={styles.timeStyle}>{details.createAt}</Text> */}
                    {/* 画面填充 */}
                    <View style={{height:60}}></View> 
                    </View>
                </ScrollView>
                <View style={styles.bottomView}>
                    {/* 发表评论 */}
                    <TouchableOpacity onPress={()=>{
                            navigation.navigate('Comment',{title:this.state.details.articleTitle,id:id})}}> 
                        <Text style={styles.textInput}>发表评论</Text>
                        <Image style={styles.commentImg} source={require('../../static/img/commentImg.png')} />
                    </TouchableOpacity>
                        {/* 文章点赞 */}
                        <TouchableOpacity 
                            onPress={this.likeFun.bind()}
                            style={{width:pxToDp(50),height:pxToDp(50),marginTop:pxToDp(10),}}
                            >
                                    <Svg style={styles.like} svgXmlData={this.state.like ? user_like_1 : user_like_2} />
                        </TouchableOpacity>
                        {/* 文章收藏 */}
                        <TouchableOpacity 
                            style={{width:pxToDp(50),height:pxToDp(50),marginRight:pxToDp(56),marginTop:pxToDp(15)}}
                            onPress={this.CollectionFun.bind()}
                            >
                        <Image style={styles.Collection} source={this.state.Collection ? images.first_Collection : images.second_Collection} />
                        </TouchableOpacity>

                </View>
            </View>
            
        )
    }

}
const styles = StyleSheet.create ({
    textTitle:{
        fontSize:pxToDp(32),
        marginTop:pxToDp(80),
        marginLeft:pxToDp(102),
        marginRight:pxToDp(100),
    },
    img:{
        marginTop:pxToDp(100),
        width:pxToDp(704),
        height:pxToDp(554),
        marginLeft:pxToDp(20)
    },
    textContent:{
        fontSize:pxToDp(32),
        marginTop:pxToDp(126),
        marginLeft:pxToDp(44),
        marginRight:pxToDp(44),
    },
    bottomView:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        position:"absolute",
        width:"100%",
        height:"8%",
        left:0,
        bottom:0,
        backgroundColor:"#F5F5F5",
        // width:pxToDp(750),
        // height:pxToDp(100),
        // marginTop:pxToDp(0),
        borderColor:"#E0DDDD",
        borderTopWidth: 1,
    },
    textInput:{
        borderRadius:15,
        width:pxToDp(454),
        height:pxToDp(64),
        backgroundColor:"#F2E4E5", 
        marginLeft:pxToDp(54),
        // marginTop:pxToDp(24),
        paddingTop:pxToDp(12),
        paddingLeft:pxToDp(98),
        fontSize:pxToDp(32),
        color:"#999999"
    },
    commentImg:{
        marginTop:pxToDp(-43),
        marginLeft:pxToDp(360)
    },
    like:{
        
    },
    Collection:{
        // marginLeft:pxToDp(-100),
        // marginTop:pxToDp(8),
    },
    tabNavigetion:{
        backgroundColor:"#F5F5F5",
        width:pxToDp(750),
        height:pxToDp(168),
        justifyContent:"space-around",
        flexDirection:"row"
        
    },
    goBack:{
        // marginLeft:pxToDp(24),
        marginTop:pxToDp(74)
    },
    title:{
        marginTop:pxToDp(84),
        fontSize:pxToDp(28)
    },
    share:{
        marginTop:pxToDp(82)
    },
    timeStyle:{
        fontSize:pxToDp(24),
        marginLeft:pxToDp(532),
        // color:"#999999"
    }
})
const handleChangeText=(text)=>{
    alert(text)
}


const images = { 
    'first_like': require('../../static/img/like-1.png'), 
    'second_like': require('../../static/img/like-2.png'), 
    'first_Collection': require('../../static/img/Collection-1.png'), 
    'second_Collection': require('../../static/img/Collection-2.png'),
}; 