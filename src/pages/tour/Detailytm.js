 
import React, { useState } from "react";
// import type {Node} from 'react';
import {
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
ImageBackground
} from 'react-native';
const Detailytm = ({ navigation}) => {
const _panResponder = PanResponder.create({
onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanRespondeCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
onPanResponderRelease: (evt,gestureState) => {
 if(gestureState.dx>35){
navigation.navigate('Maintourytm');
 }
}

});
// 爱心点亮部分
const [isLove, setLove] = useState(true);
const icon = isLove
  ? require('../../static/tour/detail/whitelove.png')
  : require('../../static/tour/detail/redlove.png');
  return (
    <ScrollView style={{whiteSpace: 'pre-wrap'}}  >
  <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>
{/* 网络 */}
  {/* <ImageBackground source={ {uri: 'https://facebook.github.io/react/logo-og.png',
    method: 'POST',
    headers: {
      Pragma: 'no-cache',
    },} }
style={{width: '100%', height: 210 }}> */}
  <ImageBackground source={require('../../static/tour/detail/top.png')} style={{ width: '100%', height: 210}}>
  <ImageBackground source={require('../../static/tour/detail/backblock.png')} style={{ width: '100%', height: 210,opacity:0.9}}>

<Text style={{color:'white',fontSize:16,lineHeight:25,fontWeight:'bold',margin:17,top:60}}>榆次老城，位于山西省晋中市榆次区，在古城旧址上修筑进来的，迄今已有1400年的历史。</Text>
  <View style={{backgroundColor:'white',height:7,width:30,top:55,margin:17}}></View>
  <Text style={{color:'white',fontSize:16,fontWeight:'bold',margin:17,top:30}}>榆次老城</Text>
 <TouchableOpacity
       onPress={() => {
    setLove(!isLove);
  }} >
       <Image  source={icon} 
style={{resizeMode :'contain' ,width: '26%', height: '26%',left:'63%',top:'-40%',margin:30,marginLeft:50,marginTop:30}}></Image>
      </TouchableOpacity>
    </ImageBackground>
</ImageBackground>

<View  {..._panResponder.panHandlers}>
<Text style={{fontFamily:'Georgia',fontSize:14,fontWeight:'200',lineHeight:28,margin:18,top:10}}> 
 
     &emsp;&emsp;榆次老城即榆次古县城，也叫子母城，由北部的县城和南部的郭城两部分组成，县城为母城，郭城为子城。母城与子城相连构成了酷似鲤鱼的榆次城，头南尾北，母城为鱼腹，子城为鱼头，南、北大街为鱼脊，东、西两城门为鱼侧鳍，位于南关中央的清虚阁为背鳍。
  民间传说，在清虚阁中央地下有一眼井，暗通大海，鲤鱼卧其上，得长养之气。 
  {"\n"}&emsp;&emsp;
    榆次老城以市楼所在位置为中心，东、西、南、北四条城市主干道交会于此。东大街有城隍庙、县衙，是榆次老城的政治中心；西大街有文庙、凤鸣书院，为文化教育中心；北大街、南大街和阁北街为商业街市，即老城的商业中心。榆次老城还保留了许多小街小巷，大量民居就建在街巷之内。
 
</Text>
<Image source={require('../../static/tour/detail/center.png')} style={{width: '100%', height: 200}} />
<Text style={{fontFamily:'Georgia',fontSize:14,fontWeight:'200',lineHeight:28,margin:18,top:10}}>  &emsp;&emsp;
榆次老城即榆次古县城，也叫子母城，由北部的县城和南部的郭城两部分组成，县城为母城，郭城为子城。母城与子城相连构成了酷似鲤鱼的榆次城，头南尾北，母城为鱼腹，子城为鱼头，南、北大街为鱼脊，东、西两城门为鱼侧鳍，位于南关中央的清虚阁为背鳍。
  民间传说，在清虚阁中央地下有一眼井，暗通大海，鲤鱼卧其上，得长养之气。 {"\n"}&emsp;&emsp;
  榆次老城以市楼所在位置为中心，东、西、南、北四条城市主干道交会于此。东大街有城隍庙、县衙，是榆次老城的政治中心；西大街有文庙、凤鸣书院，为文化教育中心；北大街、南大街和阁北街为商业街市，即老城的商业中心。榆次老城还保留了许多小街小巷，大量民居就建在街巷之内。

</Text>
<Image source={require('../../static/tour/detail/buttom.png')} style={{width: '100%', height: 200}} />
<Text style={{fontFamily:'Georgia',fontSize:14,fontWeight:'200',lineHeight:28,margin:18,top:10}}> &emsp;&emsp; 榆次老城即榆次古县城，也叫子母城，由北部的县城和南部的郭城两部分组成，县城为母城，郭城为子城。母城与子城相连构成了酷似鲤鱼的榆次城，头南尾北，母城为鱼腹，子城为鱼头，南、北大街为鱼脊，东、西两城门为鱼侧鳍，位于南关中央的清虚阁为背鳍。
    榆次老城中的一楼、一阁、一砖、一瓦、一口枯井、一棵老树，都折射出千年老城独特的历史文化魅力。在广场旁建立起以榆次老城为中心的民俗博物馆，深受游客喜爱。 {"\n"}&emsp;&emsp;
  传统文化艺术在世界文明数千年的历史长河中，以其鲜明的个性和艺术特色洋溢着中华文明的民族特性，是中华文明的大旗。传统文化艺术浩如烟海，本馆难穷其尽，但是每件藏品却是不可多得的中国文化载体，它展示的不仅是中国的优秀文化，更多地折射出中国人坚忍不拔、勤奋敬业的精神实质。该馆的创办，其意义已远远超出了它的价值本身。 中国民间文化艺术博物馆现已开馆的主题展馆有晋商博物馆、民间艺术博物馆、官制文化展馆、老城出土文物展馆、山西陈醋制作展馆等。 乘车：太原游客可从火车站乘901公交车到榆次老城终点站下车即到 .
</Text>

</View>

    </ScrollView>
  );
}
export default Detailytm;
 
