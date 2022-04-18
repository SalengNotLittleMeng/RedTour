import React, { useState} from "react";
import Pubsub from 'pubsub-js'
import Video from 'react-native-video';
import {
    StyleSheet,
    View,
} from 'react-native';
function Audio(){
    const [isPlay,setIsPlay] = useState(true);
    	Pubsub.subscribe('changePlay', (msg, data) => {
            setIsPlay(!data)
	})
    return (
        <View style={styles.body}>
         <Video
    ref={(ref) => { //方法对引用Video元素的ref引用进行操作
        this.video = ref
    }}
    source={require('../../static/tour/honglv.mp3')}//设置视频源  
    // style={styles.fullScreen}//组件样式
    // rate={this.state.rate}//播放速率
    paused={isPlay}//暂停
    // paused={false}//暂停
    // volume={this.state.volume}//调节音量
    muted={false}//控制音频是否静音
    // resizeMode={this.state.resizeMode}//缩放模式
    // onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
    // onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
    // onEnd={this.onEnd}//视频播放结束时的回调函数
    // onAudioBecomingNoisy={this.onAudioBecomingNoisy}//音频变得嘈杂时的回调 - 应暂停视频
    // onAudioFocusChanged={this.onAudioFocusChanged}//音频焦点丢失时的回调 - 如果焦点丢失则暂停
    repeat={true}//确定在到达结尾时是否重复播放视频。
/>   
        </View>
    )
}


const styles = StyleSheet.create({  
    body:{
        backgroundColor:'white'
    },  
});
export default  Audio