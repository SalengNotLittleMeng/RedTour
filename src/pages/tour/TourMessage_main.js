import React, { useState, useRef,Component } from "react";
import Swiper from 'react-native-swiper';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
export default class TourMessage_main extends Component {
    constructor(props){
    super(props);
    this.state = {
        msg:{
        imges: [require('../../static/tour/detail/buttom.png'),require('../../static/tour/detail/top.png'),require('../../static/tour/detail/four.png')],
        introduct: "榆次老城即榆次古县城，也叫子母城，由北部的县城和南部的郭城两部分组成，县城为母城，郭城为子城。母城与子城相连构成了酷似鲤鱼的榆次城，头南尾北，母城为鱼腹，子城为鱼头，南、北大街为鱼脊。",
        location: "太原市阳曲县华强中路1号",
        name: "太原方特东方神话",
        score: 4.7,
        unOnline:true
        }
    };
    }
     componentWillMount(){
       if(this.props.msg&&this.props.msg.name!=""){
             this.setState({msg:this.props.msg});
        }
    } 
    render(){
        console.log(this.state.msg)
        let DOM =this.state.msg.unOnline? this.state.msg.imges.map((item, index) =>(<Image source={item} style={styles.bannerStyle}/>) )
                                        :this.state.msg.imges.map((item, index) =>(<Image source={{uri:item+""}} style={styles.bannerStyle}/>) )
    return (
        <View style={styles.body}>
            <View style={{position:'relative', height:200}}>
                <Swiper
                    height={200}
                    removeClippedSubviews={false}
                    loop={true}                    //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                    autoplay={true}                //自动轮播
                    autoplayTimeout={5}          //每隔3秒切换
                    dot={<View style={{           //未选中的圆点样式
                        backgroundColor: 'white',
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: 10,
                        marginRight: 9,
                        marginTop: 13,
                        marginBottom: 2,
                    }}/>}
                     activeDot={<View style={{    //选中的圆点样式
                        backgroundColor: '#AC2910',
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: 10,
                        marginRight: 9,
                        marginTop: 13,
                        marginBottom: 2,
                    }}/>}
                >
                {DOM}
                </Swiper>
             </View>
                    <View style={{display:'flex',flexDirection:'row'}}>
                        <View style={styles.location_bg}>
                            <Image style={styles.location_icon} source={require('../../static/tour/detail/location_icon.png')}/>
                            <Text style={styles.location_word}>山西</Text>
                            <View style={styles.location_trangle}></View>
                        </View>
                        <View style={styles.location_bg}>
                            <Image style={styles.location_icon} source={require('../../static/tour/detail/location_icon.png')}/>
                            <Text style={styles.location_word}>太原</Text>
                            <View style={styles.location_trangle}></View>
                         </View>
                    </View>
                    <Text style={styles.main_title}>{this.state.msg.name}</Text>
                        <View style={styles.common_flex}>
                            <View style={styles.mark_bg}><Text style={styles.mark_word}>{this.state.msg.score}</Text><Text style={styles.mark_word}>分</Text></View>
                            <View style={styles.common_flex}><Text style={styles.appraise_word}>12345</Text><Text style={styles.appraise_word}>条点评</Text></View>
                        </View>
                    {/* <View style={{flex:1,height:1,backgroundColor:'#707070'}}></View> */}
                    <View style={styles.map_box}>
                        <Text style={styles.map_name}>{this.state.msg.location}</Text>
                        <Text style={styles.map_manner}>距826路后湾站2.2km，步行7min</Text>
                        <View style={{position:'relative',top:-55}}>
                            <View style={styles.map_round}>
                                <Image style={styles.map_icon} source={require('../../static/tour/detail/location_icon.png')}/>
                            </View>
                            <Text style={{color:'#707070',fontSize:15,position:'absolute',left:290,top:35}}>地图·周边</Text>
                        </View>
                    </View>
                    <View style={styles.brief_box}>
                            <Text style={styles.brief_title}>景点简介</Text>
                                <Text style={styles.brief_content}>
                                        <Text>&emsp;&emsp;{this.state.msg.introduct}</Text>
                                </Text>
                    </View>
        </View>
    )
}
}
const styles = StyleSheet.create({  
    body:{
        backgroundColor:'white'
    },
    common_flex:{
        display:'flex',flexDirection:'row'
    },
      bannerStyle:{
        flex:1,
    },
    location_bg:{
        width:80,
        height:30,
        backgroundColor:'rgba(153,153,153,0.4)',
        borderRadius: 20,
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'row',
        marginLeft:15,
        marginTop:15,
    },
    location_icon:{
        transform:[{scale:0.6}],
    },
    location_word:{
        fontSize:14,
        },
    location_trangle:{
        width: 0,
        height: 0,
        borderTopWidth: 7,
        borderTopColor: 'transparent',
        borderRightWidth: 7,
        borderRightColor: 'transparent',
        borderLeftWidth: 7,
        borderLeftColor: 'black',
        borderBottomWidth: 5,
        borderBottomColor: 'transparent',
    },
    main_title:{
        fontWeight:'bold',
        fontSize:26,
        marginLeft:15,
        marginTop:20,
        marginBottom:20,
    },
    mark_bg:{
        width:50,
        height:25,
        backgroundColor:'#AC2910',
        borderRadius: 10,
        marginLeft:15,
        marginRight:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },
    mark_word:{
        color:'white',
        fontSize:17,
        fontWeight:'bold',
    },
    appraise_word:{
        fontSize:17,
        color:'#7D7D7D'
    },
    map_box:{
        // marginLeft:15,
        marginTop:18,
        paddingTop:18,
        flex:1,
        height:80,
        borderTopColor:'#707070',
        borderTopWidth:0.5
    },
    map_name:{
        marginLeft:15,
        fontSize:18,
    },
    map_manner:{
        marginLeft:15,
        fontSize:16,
        color:'#999999',
        marginTop:5,
    },
    map_round:{
        position:'absolute',
        left:305,
        width:30,
        height:30,
        borderRadius:20,
        borderWidth:2,
        borderColor:'#707070',
        display:'flex',
        justifyContent:'center',
        alignItems:"center"
    },
    map_icon:{
         transform:[{scale:0.7}],
    },
    brief_box:{
        flex:1,
        paddingBottom:10,
        borderTopWidth:10,
        borderColor:'#F2F2F2',
        backgroundColor:'white',
    },
    brief_title:{
        marginTop:15,
        fontWeight:'bold',
        fontSize:22,
        marginLeft:15
    },
    brief_content:{
        margin:15,
        fontSize:16,
        color:'#707070',
        
        }
});