import { black } from 'chalk';
import React, { Component } from 'react';
import { View,Text,Image,StatusBar,
        TextInput,ScrollableTabView,StyleSheet,TouchableOpacity,ScrollView,FlatList, Alert
    } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import TabBar from './TabNavigation';
// import request from "../request"
// import { BASE_URI,RECOMMENT_TYPE,RECOMMENT_HOME,JUMPTO_XQ } from '../pathMap';
import axios from 'axios';

import Video from 'react-native-video';

import  {DeviceEventEmitter} from 'react-native';

export default class TuiJianQzn extends Component {
    constructor(props) {
        super(props);
        // this.setState({tablist:[{id:1,name:"热门"},{id:2,name:"高赞"}]});
        this.state = {
            index: '-1',
            //列表数组
            tablist:[],
            pageNum:1,
            type:0,
            //推荐数组
            recomments:[],
            isLoadding:false,
            //视频参数
            recommentPaused: true,//推荐栏 视频暂停 true暂停，false播放
            videoPaused:true,//视频栏 视频暂停
        };
    }

    componentDidMount(){
        this.getRecommentTab();
        this.getRecomment();
    }

    //传值
    dataFormSon(index){
        // this.state.type=index
        this.setState({type:index})
        this.getRecomment(true);
        // this.setState({type:index})
        // console.log("type:%d",this.state.type) 
        // console.log(typeof this.state.type)
    }
    //获取推荐导航栏
    getRecommentTab= async ()=>{
        // const res=await request.get(RECOMMENT_TYPE);
        axios.get("http://49.233.252.20:8085/user/content/typeShow").then(res=>{
            // console.log(res)
            this.setState({ tablist:res.data.data})
        })
        
        
    }
    //获取推荐首页
    getRecomment= async (isNew=false,i=5)=>{
        axios.post("http://49.233.252.20:8085/user/content/push",{pageNum:this.state.pageNum,type:this.state.type+1}).then(res=>{
            console.log(res.data.data) 
            if(isNew){
                this.setState({ recomments:res.data.data})
            }else{
                this.setState({ recomments:[...this.state.recomments,...res.data.data]});
            }
            if(res.data.data==undefined&&i>0){
                this.getRecomment(true,--i)
                console.log(i)
            }
        })
        this.state.isLoadding=false;
    }
        //滚顶条触底事件
        onEndReached=()=>{
            // console.log("onEndReached") 
            // 判断是否有下一页数据以及节流阀
            if(this.state.isLoadding){
                return;
            }else{
                // 还有下一页数据
                this.state.isLoadding=true;
                this.state.pageNum++;
                this.getRecomment();
            }
        }
        //推荐页视频暂停函数
        onRecommentPaused(){
            this.setState({
                recommentPaused: !this.state.recommentPaused
            })
        }
        //视频页视频暂停函数
        onVideoPaused(index){
            this.state.recomments[index].videoPaused = !this.state.recomments[index].videoPaused
        }

    render() {
        const  {navigation} = this.props
        const {recomments} = this.state
         this.getRecomment();
        return(
                    <View style={{position:"absolute",width:"100%",height:"8%",top:0,left:0}}>
                    {/* 状态栏  */}
                        <StatusBar backgroundColor="#FFFEFE" barStyle={"dark-content"} translucent={true}/>
                    <View style={{backgroundColor:"#FFFEFE",justifyContent:"space-around",flexDirection:"row"}}>
                    {/* 定位 */}
                    {/* <TouchableOpacity onPress={()=>{
                            navigation.navigate('Logintwo')}}> */}
                    <Text style={styles.location}>太原</Text>
                    {/* </TouchableOpacity> */}
                    {/* 搜索 */}
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('Search')}}>
                        <View > 
                            <View style={styles.searchInput}>
                                <Text style={styles.searchTxt} >访英雄足迹</Text>
                                <Image style={styles.searchImg} source={require('../../static/img/search.png')} />
                                {/* onChangeText={handleChangeText} */}
                            </View>
                        </View>
                        </TouchableOpacity>
                    {/* 个人中心 */}
                        <TouchableOpacity onPress={()=>{
                         this.props.navigation.navigate('Pone');}}>
                                <View>
                                    <Image style={styles.personal} source={require('../../static/img/personalCenter.png')} />
                                </View>
                        </TouchableOpacity>
                        </View>
                    
                    {/* 顶部导航栏 */}
                        <TabBar ref={e => this.tabs = e}
                        index={this.state.type}
                        data={this.state.tablist}
                        onChange={index => {this.dataFormSon(index)}} 
                        
                        />
                        <View style={{height:pxToDp(1300),bottom:pxToDp(20)}}>
                        <>
                            <FlatList
                            handleMethod = {({viewableItems}) => this.handleViewableItemsChanged(viewableItems)}
                            extraData={this.state}
                            refreshing={true}
                                onEndReached={this.onEndReached}
                                onEndReachedThreshold={0.1}
                                data={recomments}
                                keyExtractor={item => item.id+""}
                                renderItem={({item,index})=>
                                <>
                                <TouchableOpacity onPress={()=>{
                                    navigation.navigate('Details',{id:this.state.recomments[index].id})}} 
                                >
                                    {/* 热榜 */}
                                    {this.state.type===0 && <View>
                                        {item.videoId ==null ?
                                        <View key={index} style={{height:pxToDp(362),backgroundColor:"#FFFFFF",marginTop:pxToDp(34),borderRadius:10}}>
                                            <Text style={{fontSize:pxToDp(32),marginLeft:pxToDp(30),marginTop:pxToDp(32)}}>{item.articleTitle}</Text>
                                            <Image style={{width:pxToDp(286),height:pxToDp(191),marginLeft:pxToDp(34),marginTop:pxToDp(34)}} source={{uri:item.url}} />
                                            <Text numberOfLines={6} ellipsizeMode="tail" style={{fontSize:pxToDp(28),marginTop:pxToDp(-232),marginLeft:pxToDp(356),marginRight:pxToDp(32)}}>        {item.articleIntroduce} </Text>
                                                <View  style={{flexDirection:"row", position: 'absolute',}}>
                                                                            
                                                    <View>
                                                        <Image style={{width:pxToDp(24),height:pxToDp(24),marginLeft:pxToDp(58),marginTop:pxToDp(320)}} source={require('../../static/img/dingWei.png')} />
                                                        <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(92),marginTop:pxToDp(-24)}}>{item.articleLocation}</Text>
                                                    </View>
                                                    <View style={{flexDirection:"row"}}>
                                                        <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(58),marginTop:pxToDp(320),marginLeft:pxToDp(400)}}>{item.views}浏览</Text>
                                                        <Text style={{fontSize:pxToDp(20),marginTop:pxToDp(320),marginLeft:pxToDp(10)}}>{item.commentNum}评论</Text>
                                                    </View>
                                                </View>
                                        </View>
                                    :
                                        <View key={index} style={{backgroundColor:"#FFFFFF",height:pxToDp(674),width:pxToDp(750),marginTop:pxToDp(34),borderRadius:10}} >
                                            <Text style={{fontSize:pxToDp(32),marginLeft:pxToDp(30),marginTop:pxToDp(32)}}>{item.articleTitle}</Text>
                                            <View >
                                                {/* video开始 */}
                                            <TouchableOpacity onPress={()=>{
                                                this.onRecommentPaused()
                                                
                                            }}
                                                            >
                                                {this.state.recommentPaused==false ?
                                                
                                                <Video
                                                    // ref={(ref: Video) => { //方法对引用Video元素的ref引用进行操作
                                                    //     this.video = ref
                                                    // }}
                                                    style={styles.video}
                                                    source={{uri:item.videoUrl}}
                                                    rate={1.0}//播放速率 
                                                    paused={this.state.recommentPaused}//暂停 
                                                    volume={1.0}//调节音量
                                                    muted={false}//控制音频是否静音
                                                    resizeMode={'contain'}//缩放模式
                                                    // onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
                                                    // onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
                                                    // onEnd={this.onEnd}//视频播放结束时的回调函数
                                                    // onAudioBecomingNoisy={this.onAudioBecomingNoisy}//音频变得嘈杂时的回调 - 应暂停视频
                                                    // onAudioFocusChanged={this.onAudioFocusChanged}//音频焦点丢失时的回调 - 如果焦点丢失则暂停
                                                    // repeat={false}//确定在到达结尾时是否重复播放视频。
                                                />
                                                :
                                                <View style={{
                                                    width:pxToDp(700),
                                                    height:pxToDp(450),
                                                    marginLeft:pxToDp(22),
                                                    marginTop:pxToDp(17),
                                                    backgroundColor:"black"}}></View>
                                                }
                                                {/* video结束 */}
                                                </TouchableOpacity>
                                            </View>
                                            <Text numberOfLines={2} ellipsizeMode="tail" style={{fontSize:pxToDp(28),marginTop:pxToDp(0),marginLeft:pxToDp(56),marginRight:pxToDp(56)}}>        {item.videoIntroduce} </Text>
                                            <View  style={{flexDirection:"row", position: 'absolute',}}>
                                                <View>
                                                    <Image style={{width:pxToDp(24),height:pxToDp(24),marginLeft:pxToDp(58),marginTop:pxToDp(622)}} source={require('../../static/img/dingWei.png')} />
                                                    <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(92),marginTop:pxToDp(-24)}}>{item.articleLocation}</Text>
                                                </View>
                                                <View style={{flexDirection:"row"}}>
                                                    <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(58),marginTop:pxToDp(622),marginLeft:pxToDp(400)}}>{item.views}浏览</Text>
                                                    <Text style={{fontSize:pxToDp(20),marginTop:pxToDp(622),marginLeft:pxToDp(10)}}>{item.commentNum}评论</Text>
                                                </View>
                                            </View>
                                        </View>
                                    }
                                    </View>}

                                    {/* 高赞 */}
                                    {this.state.type===1 && <View>{RecommendedContent(item,index) }</View>}

                                    {/* 图文 */}
                                    {this.state.type===2 && <View>{RecommendedContent(item,index) }</View>}

                                    {/* 视频 */}
                                    {this.state.type===3 && <View>
                                        <View style={{backgroundColor:"#FFFFFF",height:pxToDp(674),width:pxToDp(750),marginTop:pxToDp(34),borderRadius:10}} >
                                            <Text style={{fontSize:pxToDp(32),marginLeft:pxToDp(30),marginTop:pxToDp(32)}}>{item.articleTitle}</Text>
                                            <View >
                                                {/* video开始 */}
                                            <TouchableOpacity onPress={()=>{
                                                this.onVideoPaused(index)
                                                
                                            }}
                                                            >
                                                {this.state.videoPaused==false ?
                                                
                                                <Video
                                                    // ref={(ref: Video) => { //方法对引用Video元素的ref引用进行操作
                                                    //     this.video = ref
                                                    // }}
                                                    style={styles.video}
                                                    source={{uri:item.videoUrl}}
                                                    rate={1.0}//播放速率 
                                                    paused={this.state.videoPaused}//暂停 
                                                    volume={1.0}//调节音量
                                                    muted={false}//控制音频是否静音
                                                    resizeMode={'contain'}//缩放模式
                                                    // onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
                                                    // onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
                                                    // onEnd={this.onEnd}//视频播放结束时的回调函数
                                                    // onAudioBecomingNoisy={this.onAudioBecomingNoisy}//音频变得嘈杂时的回调 - 应暂停视频
                                                    // onAudioFocusChanged={this.onAudioFocusChanged}//音频焦点丢失时的回调 - 如果焦点丢失则暂停
                                                    // repeat={false}//确定在到达结尾时是否重复播放视频。
                                                />
                                                :
                                                <View style={{
                                                    width:pxToDp(700),
                                                    height:pxToDp(450),
                                                    marginLeft:pxToDp(22),
                                                    marginTop:pxToDp(17),
                                                    backgroundColor:"black"}}></View>
                                                }
                                                {/* video结束 */}
                                                </TouchableOpacity>
                                            </View>
                                            <Text numberOfLines={2} ellipsizeMode="tail" style={{fontSize:pxToDp(28),marginTop:pxToDp(0),marginLeft:pxToDp(56),marginRight:pxToDp(56)}}>        {item.videoIntroduce} </Text>
                                            <View  style={{flexDirection:"row", position: 'absolute',}}>
                                                <View>
                                                    <Image style={{width:pxToDp(24),height:pxToDp(24),marginLeft:pxToDp(58),marginTop:pxToDp(622)}} source={require('../../static/img/dingWei.png')} />
                                                    <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(92),marginTop:pxToDp(-24)}}>{item.articleLocation}</Text>
                                                </View>
                                                <View style={{flexDirection:"row"}}>
                                                    <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(58),marginTop:pxToDp(622),marginLeft:pxToDp(400)}}>{item.views}浏览</Text>
                                                    <Text style={{fontSize:pxToDp(20),marginTop:pxToDp(622),marginLeft:pxToDp(10)}}>{item.commentNum}评论</Text>
                                                </View>
                                            </View>
                                        </View>
                                        </View>}

                                    {/* 美食 */}
                                    {this.state.type===4 && <View>{RecommendedContent(item,index) }</View>}
                                    {/* 旅游 */}
                                    {this.state.type===5 && <View>{RecommendedContent(item,index) }</View>}

                                </TouchableOpacity>  

                                    {item==null?<View><Text>没有更多了</Text></View>:<></> }
                                </>}
                            />
                        </>
                            
                        </View>
                    </View>
        );
    }
}
// const _this=this
RecommendedContent=(item,index,state,that)=> {
    if(item.id!=null){
        return(
            <View key={index} style={{height:pxToDp(362),backgroundColor:"#FFFFFF",marginTop:pxToDp(34),borderRadius:10}}>
                <Text style={{fontSize:pxToDp(32),marginLeft:pxToDp(30),marginTop:pxToDp(32)}}>{item.articleTitle}</Text>
                <Image style={{width:pxToDp(286),height:pxToDp(191),marginLeft:pxToDp(34),marginTop:pxToDp(34)}} source={{uri:item.url}} />
                <Text numberOfLines={6} ellipsizeMode="tail" style={{fontSize:pxToDp(28),marginTop:pxToDp(-232),marginLeft:pxToDp(356),marginRight:pxToDp(32)}}>        {item.articleIntroduce} </Text>
                    <View  style={{flexDirection:"row", position: 'absolute',}}>
                                                
                        <View>
                            <Image style={{width:pxToDp(24),height:pxToDp(24),marginLeft:pxToDp(58),marginTop:pxToDp(320)}} source={require('../../static/img/dingWei.png')} />
                            <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(92),marginTop:pxToDp(-24)}}>{item.articleLocation}</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(58),marginTop:pxToDp(320),marginLeft:pxToDp(400)}}>{item.views}浏览</Text>
                            <Text style={{fontSize:pxToDp(20),marginTop:pxToDp(320),marginLeft:pxToDp(10)}}>{item.commentNum}评论</Text>
                        </View>
                    </View>
            </View>
        )
    }else if(item.videoId!=null){
        return(
            <View key={index} style={{backgroundColor:"#FFFFFF",height:pxToDp(674),width:pxToDp(750),marginTop:pxToDp(34),borderRadius:10}} >
                <Text style={{fontSize:pxToDp(32),marginLeft:pxToDp(30),marginTop:pxToDp(32)}}>{item.articleTitle}</Text>
                <View >
                    {/* video开始 */}
                <TouchableOpacity onPress={()=>{
                    console.log("视频成功播放")
                    // console.log(that) 
                }}
                >
                    <View style={{
                        width:pxToDp(700),
                        height:pxToDp(450),
                        marginLeft:pxToDp(22),
                        marginTop:pxToDp(17),
                        backgroundColor:"black"}}></View>
                    
                    {/* video结束 */}
                    </TouchableOpacity>
                </View>
                <Text numberOfLines={2} ellipsizeMode="tail" style={{fontSize:pxToDp(28),marginTop:pxToDp(0),marginLeft:pxToDp(56),marginRight:pxToDp(56)}}>        {item.videoIntroduce} </Text>
                <View  style={{flexDirection:"row", position: 'absolute',}}>
                    <View>
                        <Image style={{width:pxToDp(24),height:pxToDp(24),marginLeft:pxToDp(58),marginTop:pxToDp(622)}} source={require('../../static/img/dingWei.png')} />
                        <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(92),marginTop:pxToDp(-24)}}>{item.articleLocation}</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(58),marginTop:pxToDp(622),marginLeft:pxToDp(400)}}>{item.views}浏览</Text>
                        <Text style={{fontSize:pxToDp(20),marginTop:pxToDp(622),marginLeft:pxToDp(10)}}>{item.commentNum}评论</Text>
                    </View>
                </View>
            </View>
        )
    }
}

function TUWen(item,index) {
    if(item.id!=null){
        return(
            <View key={index} style={{height:pxToDp(362),backgroundColor:"#FFFFFF",marginTop:pxToDp(34),borderRadius:10}}>
                <Text style={{fontSize:pxToDp(32),marginLeft:pxToDp(30),marginTop:pxToDp(32)}}>{item.articleTitle}</Text>
                <Image style={{width:pxToDp(286),height:pxToDp(191),marginLeft:pxToDp(34),marginTop:pxToDp(34)}} source={{uri:item.url}} />
                <Text numberOfLines={6} ellipsizeMode="tail" style={{fontSize:pxToDp(28),marginTop:pxToDp(-232),marginLeft:pxToDp(356),marginRight:pxToDp(32)}}>        {item.articleIntroduce} </Text>
                    <View  style={{flexDirection:"row", position: 'absolute',}}>
                                                
                        <View>
                            <Image style={{width:pxToDp(24),height:pxToDp(24),marginLeft:pxToDp(58),marginTop:pxToDp(320)}} source={require('../../static/img/dingWei.png')} />
                            <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(92),marginTop:pxToDp(-24)}}>{item.articleLocation}</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(58),marginTop:pxToDp(320),marginLeft:pxToDp(400)}}>{item.views}浏览</Text>
                            <Text style={{fontSize:pxToDp(20),marginTop:pxToDp(320),marginLeft:pxToDp(10)}}>{item.commentNum}评论</Text>
                        </View>
                    </View>
            </View>
        )
    }}

const styles = StyleSheet.create ({
    personal:{
        marginTop:pxToDp(78),
        // marginLeft:pxToDp(660),
        marginRight:pxToDp(40),
    },
    searchImg:{
        marginTop:pxToDp(-36),
        marginLeft:pxToDp(372),
    },
    searchInput:{
        borderRadius:200,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderStyle: "solid",
        borderLeftColor: "#F2E4E5",
        borderRightColor: "#F2E4E5",
        borderTopColor: "#F2E4E5",
        borderBottomColor: "#F2E4E5",
        borderColor: "#F2E4E5",
        backgroundColor:"#F2E4E5",
        width:pxToDp(472),
        height:pxToDp(80),
        marginTop:pxToDp(62),
        // marginLeft:pxToDp(140),
    },
    searchTxt:{
        fontSize:pxToDp(28),
        marginTop:pxToDp(22),
        marginLeft:pxToDp(70),
        color:"#999999"
    },
    location:{
        fontSize:pxToDp(36),
        marginTop:pxToDp(79),
        marginLeft:pxToDp(36),
        color:"#333333"
    },
    video:{
        width:pxToDp(700),
        height:pxToDp(450),
        marginLeft:pxToDp(22),
        marginTop:pxToDp(17),
        // backgroundColor:"red"
    }
});


