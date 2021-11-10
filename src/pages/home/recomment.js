import React, { Component } from 'react';
import { View,Text,Image,StatusBar,
        TextInput,ScrollableTabView,StyleSheet,TouchableOpacity,ScrollView,FlatList
    } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import axios from 'axios';

export default class RecommentContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: '-1',
            params:{
                pageNum:1,
                type:1,
            },
            //推荐数组
            recomments:[],
            isLoadding:false,
        };
        // isLoadding=false;
    }
    componentDidMount(){
        this.getRecomment();
    }
        //获取推荐首页
        getRecomment= async ()=>{
            axios.post("http://49.233.252.20:8085/user/content/push",this.state.params).then(res=>{
                // console.log(res.data.data)
                this.setState({ recomments:[...this.state.recomments,...res.data.data]});
                this.state.isLoadding=false;
            })
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
    render(){
        const {navigation} = this.props
        const {recomments} = this.state
        return(
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
        )
    }
}