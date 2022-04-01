import React, { useState,Component } from "react";
import {MapView,MapType} from "react-native-amap3d"
import { AMapSdk } from "react-native-amap3d";
import { Platform } from 'react-native';
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
        <View style={{position:'relative'}}><Text style={styles.mainTitle}>{msg.name}</Text>
            <Image style={styles.localIcon} source={require('../../../static/img/dingWei.png')}/>
        </View>
        <View style={styles.titleLine}></View>
        <Text style={styles.secTitle}>景区位置：</Text>
        <Text style={styles.detail}>&emsp;&emsp;&ensp;{msg.location}</Text>
        <View></View>
        </View>
    )
}
}
const styles = StyleSheet.create({
    mainMap:{
        width:400,
        height:500
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
        width:50,
        marginTop:12,
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
    }
});