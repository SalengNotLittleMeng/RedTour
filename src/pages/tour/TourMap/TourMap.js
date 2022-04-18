import React, { useState,Component } from "react";
import {MapView,MapType} from "react-native-amap3d"
import { AMapSdk } from "react-native-amap3d";
import { Platform ,  ScrollView,} from 'react-native';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
 AMapSdk.init(
  Platform.select({
    android: "c812f0c34d0f0d829e73859b16ee4a44",
  })
);
export default class TourMap extends Component {
    constructor(props){
    super(props);
    this.state = {
    arrange:[
       "8：50 从五台东方红宾馆（63起）/从碧涛苑大酒店（161 起）出发",
        "9：30 到达五台县白求恩纪念馆",
        "9：30 园内参观",
        "11：00 步行到达附近的白求恩模范病室遗址参观",
        "12：00 在附近就餐（美味斋饭店2.5km，一品香酒家3.1km）",
        "1：00 就餐稍休息后出发前往晋察冀军区司令部遗址",
        "1：30 到达晋察冀军区司令部旧址开始参观游览",
        "3：00 参观完毕，至附近休息处休息（为第二天登山做准备）",
    ]
        }
    }
    render(){
    console.log(this.props)
    const msg =this.props.route.params.msg
    return (
        <View>
        <MapView
        style={StyleSheet.absoluteFill}
        style={styles.mainMap}
        // mapType={MapType.Satellite}
        initialCameraPosition={{
            target: {
            latitude: 39.91095,
            longitude: 116.37296,
            },
            zoom: 8,
        }}
        />
        <ScrollView
            style={{height:500}}
        >
            <View>
                <View style={{position:'relative'}}><Text style={styles.mainTitle}>{msg.name}</Text>
            <       Image style={styles.localIcon} source={require('../../../static/img/dingWei.png')}/>
                 </View>
                <View style={styles.titleLine}></View>
                <Text style={styles.secTitle}>景区位置：</Text>
                  <View style={styles.secLine}></View>
                <Text style={styles.detail}>&emsp;&emsp;&ensp;{msg.location}</Text>
                <Text style={styles.secTitle}>景点介绍：</Text>
                <View style={styles.secLine}></View>
                <Text style={[styles.detail,{fontSize:16}]}>1969年12月21日，中共五台县委、五台县人民政府在松岩口建立了白求恩纪念馆。该馆占地面积5739平方米，建筑面积754平方米。纪念馆9间陈列厅内展示着白求恩大夫的模范事迹照片及实物，并对白求恩“模范病室”旧址进行保护性修复。院内正中立白求恩大夫汉白玉雕像一座，雕像后为汉白玉纪念碑，正面镌刻毛泽东著名的《纪念白求恩》文章全文，其余三面为徐向前、聂荣臻、薄一波题词。展览厅现存有图片126张，实物26件，其中剃须刀、衣架属国家一级保护文物。1997年，纪念馆重新修缮整理，对外开放。
                五台白求恩纪念馆于1995年3月被山西省委、省人民政府公布为山西省爱国主义教育基地。(资料来源：中共山西省委党史办公室)</Text>
                <Text style={styles.secTitle}>路线规划：</Text>
                <View style={styles.secLine}></View>
                {
                    this.state.arrange.map((item)=>{
                        return <View style={styles.arrangeItem}><Text>{item}</Text></View>
                    })
                }
                <Text style={styles.secTitle}>资金花费：</Text>
                <View style={styles.secLine}></View>
                <Text style={[styles.secTitle]}> <Text style={{fontSize:18}}>总计</Text> ：<Text style={{color:'red'}}>约510~759人民币</Text> </Text>
                <Text style={[styles.detail,{fontSize:16}]}>住宿费（约129-388元），餐饮费（约200+，不同人群选择不同，此处为最低），打车费（无公交或客车线路运行，滴滴出行约花费181元）</Text>
                <View style={styles.whiteBlock}></View>
            </View>
         </ScrollView>
        </View>
    )
}
}
const styles = StyleSheet.create({
    mainMap:{
        width:400,
        height:300
    },
    body:{
        backgroundColor:'white'
    },
    mainTitle:{
        fontSize:24,
        marginLeft:30,
        marginTop:20,
        fontWeight:"bold"
    },
    titleLine:{
        backgroundColor:'red',
        height:4,
        width:60,
        marginTop:12,
        marginLeft:30,
    },
    secLine:{
        backgroundColor:'red',
        height:3,
        width:30,
        marginTop:8,
        marginLeft:30,
    },
    localIcon:{
        position:'absolute',
        top:30,
        right:30,
        width:20,
        height:20
    },
    secTitle:{
        marginLeft:30,
        fontSize:16,
        marginTop:20,
    },
    detail:{
        padding:30,
        paddingTop:10,
        fontSize:18,
        lineHeight:30
    },
    whiteBlock:{
        height:130
    },
    arrangeItem:{
        marginTop:20,
        marginLeft:20,   
    }
});