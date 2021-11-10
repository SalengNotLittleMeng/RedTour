import { black } from 'chalk';
import React, { Component } from 'react';
import { View,Text,Image,StatusBar,
        TextInput,ScrollableTabView,StyleSheet,TouchableOpacity,ScrollView,FlatList
    } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import TabBar from './TabNavigation';
// import request from "../request"
// import { BASE_URI,RECOMMENT_TYPE,RECOMMENT_HOME,JUMPTO_XQ } from '../pathMap';
import axios from 'axios';


export default class TuiJianQzn extends Component {
    constructor(props) {
        super(props);
        // this.setState({tablist:[{id:1,name:"热门"},{id:2,name:"高赞"}]});
        this.state = {
            index: '-1',
            //列表数组
            tablist:[],
            params:{
                pageNum:1,
                type:1,
            },
            //推荐数组
            recomments:[],
            isLoadding:false,
        };
    }

    componentDidMount(){
        this.getRecommentTab();
        this.getRecomment();
    }

    //获取推荐导航栏
    getRecommentTab= async ()=>{
        const res=""; 
        // const res=await request.get(RECOMMENT_TYPE);
        axios.get("http://49.233.252.20:8085/user/content/typeShow").then(res=>{
            // console.log(res.data.data)
            this.setState({ tablist:res.data.data})
        })
        
        
    }
    //获取推荐首页
    getRecomment= async ()=>{
        axios.post("http://49.233.252.20:8085/user/content/push",this.state.params).then(res=>{
            // console.log(res.data.data) 
            this.setState({ recomments:[...this.state.recomments,...res.data.data]});
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
                this.state.params.pageNum++;
                this.getRecomment();
            }
        }
    render() {
        const  {navigation} = this.props
        const {recomments} = this.state
        return(
                    <View style={{position:"absolute",width:"100%",height:"8%",top:0,left:0}}>
                    {/* 状态栏  */}
                        <StatusBar backgroundColor="#FFFEFE" barStyle={"dark-content"} translucent={true}/>
                    {/* 搜索 */}
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('Search')}}>
                        <View style={{backgroundColor:"#FFFEFE",}}> 
                            <View style={styles.searchInput}>
                                <Text style={styles.searchTxt} >访英雄足迹</Text>
                                <Image style={styles.searchImg} source={require('../../static/img/search.png')} />
                                {/* onChangeText={handleChangeText} */}
                            </View>
                        </View>
                        </TouchableOpacity>
                    {/* 个人中心 */}
                        {/* <TouchableOpacity onPress={()=>{
                         this.props.navigation.navigate('Detail');}}> */}
                                <View>
                                    <Image style={styles.logo} source={require('../../static/img/personalCenter.png')} />
                                </View>
                    {/* </TouchableOpacity> */}
                    {/* 顶部导航栏 */}
                        <TabBar ref={e => this.tabs = e}
                        index={this.state.index}
                        data={this.state.tablist}
                        onChange={index => {}} />



                        <View style={{height:1000}}>
                        <>
                            <FlatList
                                onEndReached={this.onEndReached}
                                onEndReachedThreshold={0.1}
                                data={recomments}
                                renderItem={({item,index})=>
                                <>                               
                                    <View key={index} style={{height:pxToDp(362),backgroundColor:"#FFFFFF",marginTop:pxToDp(34),borderRadius:10}}>
                                    <TouchableOpacity onPress={()=>{
                                        navigation.navigate('Details',{id:this.state.recomments[index].id})}} 
                                    >
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
                                    </TouchableOpacity>
                                    </View>
                                    {/* <Text>没有更多了</Text> */}
                                </>}
                            />
                        </>
                            
                        </View>
                    </View>
        );
    }
}

const styles = StyleSheet.create ({
    logo:{
        marginTop:pxToDp(-60),
        marginLeft:pxToDp(660),
        // marginRight:pxToDp(50),
    },
    searchImg:{
        marginTop:pxToDp(-36),
        marginLeft:pxToDp(372),
    },
    searchInput:{
        borderRadius:15,
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
        marginLeft:pxToDp(140),
        borderRadius:10
    },
    searchTxt:{
        fontSize:pxToDp(28),
        marginTop:pxToDp(22),
        marginLeft:pxToDp(70)
    },
});

