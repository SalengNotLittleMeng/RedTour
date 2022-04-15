
import React, { useState, useRef,Component } from "react";
import Audio from './Audio';
import {
    TouchableOpacity,
    Animated,
    PanResponder,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {inject,observer,action} from 'mobx-react'
@inject('RootStore')
@observer
export default class Maintourytm extends Component {
    constructor(props){
    super(props);
    this.state = {
        msg:[
        {id:1,coverUrl:'../../static/tour/detail/buttom.png',description:'想握住此生辽阔 赠你满天星火'},
        {id:2,coverUrl:'../../static/tour/detail/top.png',description:'是落日弥漫的橘，天边透亮的星。'},
        {id:3,coverUrl:'../../static/tour/detail/center.png',description:'想握住此生辽阔 赠你满天星火'},
        {id:4,coverUrl:'../../static/tour/detail/four.png',description:'是落日弥漫的橘，天边透亮的星。'},
        {id:5,coverUrl:'../../static/tour/detail/five.png',description:'想握住此生辽阔 赠你满天星火'}
        ],
         _scrollView: ScrollView | null | undefined,
          _scrollView_word: ScrollView | null | undefined,
        begin:0,
        temp:0,
        bar:1,
        init:0,
        flag:true,
        stopAuto:true,
        isshow:false,
        calHeight: new Animated.Value(0),
    };
        this.pan=PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        })
           this._panResponder=PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => false,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
          onPanResponderTerminatinRequest: ($e,$gs)=>true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
        if(gestureState.dx>40){
            this.props.navigation.navigate('TourMessage');
            }
        //    if(gestureState.dx<-40){
        //     this.props.RootStore.globalStore.setPlaying();
        //     console.log(this.props.RootStore.globalStore.isPlaying)
        //     }
        }
    })
    this.fadeOutAnimated = Animated.timing(
            this.state.calHeight,{
                toValue: 1,
                duration: 800
            }
     );
// 底部按钮的显示与隐藏
    this.handleshow=()=>{
        this.setState({
            isshow:true
        })
    }
    this.handlehide=()=> {
        this.setState({
            isshow:false
        })
    }
    this.handleScroll=(event)=>{
        this.state.begin = Math.floor(event.nativeEvent.contentOffset.y)
             this.state.temp = (this.state.begin)%400;
            this.state.bar = Math.floor(this.state.begin/400);
    }
// 停止拖动时文字和图片进行自动偏移
    this.onScrollEndDrag=async ()=>{
        if(this.state.temp<150){
             this.state._scrollView_word.scrollTo({y:300*(this.state.bar)})
             this.state._scrollView.scrollTo({y:400*(this.state.bar)})
            }
        if(this.state.temp>=150){
            this.state.bar++;
            this.state._scrollView.scrollTo({y:400*(this.state.bar)});
            this.state._scrollView_word.scrollTo({y:300*(this.state.bar)});
            }
        }
    //文字滑动部分
    this._handleScroll=(event)=>{
       if(this.state.stopAuto){
        // if(this.state.flag){
        //     this.state.init =this.state.bar*400;
        //     this.state.flag = false;
        // }
        //     let offset =  event.nativeEvent.contentOffset.y-this.state.init;
        //  this.state._scrollView.scrollTo({y: this.state.init+offset*2})
        if(event.nativeEvent.contentOffset.y>=1000){
                this.handleshow()
            this.fadeOutAnimated.start( () => this.state.calHeight.setValue(1))
        }
        if(event.nativeEvent.contentOffset.y<1000){
             this.fadeOutAnimated.start( () => this.state.calHeight.setValue(0))
                this.handlehide()}
            this.state.begin = Math.floor(event.nativeEvent.contentOffset.y)
            this.state.temp = (this.state.begin)%130;
            this.state.bar = Math.floor(this.state.begin/300);
                    }
        }
    this._onScrollEndDrag=async ()=>{
        this.state.stopAuto = false;
        if(this.state.temp<30){
          await  this.state._scrollView_word.scrollTo({y:300*(this.state.bar)})
          await  this.state._scrollView.scrollTo({y:400*(this.state.bar)})
            }
         if(this.state.temp>=30){
            this.state.bar++;
            await  this.state._scrollView.scrollTo({y:400*(this.state.bar)});
            await this.state._scrollView_word.scrollTo({y:300*(this.state.bar)});
            }
            this.state.flag = true;
            this.state.stopAuto = true;
        }
// 刷新或请求信息
        this.flushed=()=>{
        let getSpotMessage=async function () {
        let res=await Http.spotShow()
        res=res.data.data
        if(res){this.setState({msg:res})}
    }
    getSpotMessage.call(this)
        }
// 回到顶部
        this.scollTop=()=>{
            this.state._scrollView.scrollTo({ x:0, y: 0, animated: true })
            this.state._scrollView_word.scrollTo({ x:0, y: 0, animated: true })
        }
// 展示更多信息
        this.getMore=()=>{
            this.scollTop()
            this.flushed()
        }
    };
 componentWillMount(){
        this.flushed()
    }  
render(){
     let DOM = this.state.msg.map((item, index) => 
            <Text key={index} style={[styles.textmain]}>{item.description}</Text>)
      let cover = this.state.msg.map((item, index) => 
            <TouchableWithoutFeedback {...this.pan.panHandlers}
                     key={index} onPress={
                        ()=> this.props.navigation.navigate('TourMessage',{id:this.state.msg[index].id})}>
                <Image  source={{uri:item.coverUrl}} style={styles.bannerStyle}/>
            </TouchableWithoutFeedback>)
    return (
        <View>
            <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
            <View  style={{ backgroundColor: '#1E1E1E',width: '100%', height: 48, zIndex: 10 }}>
                <Text style={[styles.toptitle]}>旅游模式</Text>
            </View>  
            <View style={styles.container}>
                    <ScrollView  
                        scrollEnabled={false}
                        snapToInterval={400}
                         ref={component => this.state._scrollView = component}
                        onScroll={this.handleScroll}
                        onScrollEndDrag = {()=>this.onScrollEndDrag()}
                        >
                    {cover}
                    </ScrollView>
            </View>
                <View pointerEvents="none" style={styles.blockground} >
                <Image source={require('../../static/tour/detail/backblock.png')}
                 />
                </View>
            <View style={{ position: 'absolute', backgroundColor: '#1E1E1E', top: 415, width: '100%', height: '85%', opacity: 1 }}>
                
            <View  style={styles.swiperStyle}>
                <ScrollView  
                    style={{position:'relative'}}
                    ref={component => this.state._scrollView_word = component}
                    onScroll={this._handleScroll}
                    onScrollEndDrag = {()=>this._onScrollEndDrag()}
                >
                    <View style={{position:'relative'}} {...this._panResponder.panHandlers}>
                        {DOM}
                       <View style = {styles.buttomBlock}></View>
                    </View>
                </ScrollView>
                     <Animated.View style = {[styles.buttomBox,{opacity:this.state.calHeight}]} >
                            <View style={{display:this.state.isshow?'flex':'none'}}>
                            <TouchableOpacity onPress={this.scollTop}>
                                <Image style={[styles.buttom_icon]} 
                                resizeMethod="scale"
                                source={require('../../static/tour/detail/flash.png')} />
                             </TouchableOpacity>
                                <Text style={{position:'absolute',top:60,left:55, fontSize:20,color:'white'}}>返回</Text>
                            </View >
                               <View style={{display:this.state.isshow?'flex':'none'}}>
                                <TouchableOpacity onPress={this.getMore}>
                                    <Image style={[styles.buttom_icon]} 
                                        resizeMethod="scale"
                                        source={require('../../static/tour/detail/more.png')} />
                                </TouchableOpacity>
                                    <Text  style={{position:'absolute',top:60,left:55, fontSize:20,color:'white'}}>更多</Text>
                                </View>
                        </Animated.View>
            </View>
            </View>
        <Audio></Audio>
        </View>

    )
}

}
const styles = StyleSheet.create({  
   container: {
        height:400
    },
    swiperStyle:{
        position:'relative',
        top:-100,
        // height:400,
        flex:1,

    },
       bannerStyle:{
        flex:1,
        height:400,

    },
    toptitle: {
        top: '35%', fontSize: 18, textAlign: 'center', color:'white'
    },
    textmain: {
        top: '0%',
        color: 'white',
        height:180,
        fontSize: 20,
        marginLeft: 30,
        marginBottom:120,
    },

    blockground: { position:'absolute', top:5,height:300,opacity: 0.9},
    buttomBox:{
        position:'absolute',
        top:220,
        display:'flex',
        flexDirection:'row',
        alignSelf:'center',
        flex:1,
        height:280,
    },
    buttomBlock:{
        height:240,
    },
    buttom_icon:{
    position:'relative',
    top:-50,
    width:50,
    height:50,
    margin:50,
    // transition: 0.5,
}
});
