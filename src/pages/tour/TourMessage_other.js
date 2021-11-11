import React, { useState, useRef,Component } from "react";
import TourMessage_main from './TourMessage_main';
import TourMessage_news from './TourMessage_news';
import {
    Alert,
    Animated,
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
    Button,
    ImageBackground
} from 'react-native';
export default class TourMessage_other extends Component {
    constructor(props){
    super(props);
    this.state = {
        list:[
        '10月1日-10月7日','09:00-21:00(最晚入园20:30)',
        '10月1日-10月7日','09:00-21:00(最晚入园20:30)',
        '10月1日-10月7日','09:00-21:00(最晚入园20:30)',
        '10月1日-10月7日','09:00-21:00(最晚入园20:30)',
        ],
        traList:[
        '·826路后湾站','步行2.2公里到达',
        '·826路后湾站','步行2.2公里到达',
        ]
        ,
        word:`*方特主题乐园内大部分项目及欣赏表演无需收费
(特殊时期举行的特别表演及项目除外)，可以自
行选择观看演出、体验游乐设施或参与主题活动。
园区联营项目、尊享服务项目、租赁服务等，游客
可根据需求自愿购买。

*根据相关法规，如遇自然灾害或恶劣天气以及其
它不可控因素可能影响安全，园内部分项目可能关
闭。乐园将不予退票或补偿，不便之处，敬请谅
解。

*本网站购买的电子门票，如需另开发票请在门中
有效期当日内凭门票等信息在对应公园售票父发票
，过期及已开过发票的不再办理发票业务。兵
体开票流程以景区售票处为准。

*乐园门票仅限使用一-次,如出园后再入园需重新
购票。未经景区同意门票不
可转让，除非法律另有规定。门票及其他活动权益
一经私自改动立即作废。

*疫情防控期间，为了保护好您的健康与安全，请
您一定要做好自我防护，进入景区佩戴口罩。同
时，请您配合景区做好入园体温检测以及信息心
工作。由此给您带来不便敬请谅解。`,
ticketsMsg:'需购票￥280.00起，方特主题乐园内大部分项目及欣赏表演无需收费(特殊时期举行的特别表演及项目除外)，可以自行选择观看演出、体验游乐设施或参与主题活动。园区联营项目、尊享服务项目、租赁服务等，游客可根据需求自愿购买。'
    };

    }
    render(){
        let DOM = this.state.list.map((item, index) => ( <View key={index} style={styles.time_content,{backgroundColor:index%2==0?'#EFF2F6':'white'}}><Text style={styles.time_word}>{item}</Text></View>))
        let traffic=this.state.traList.map((item, index) => 
                ( <Text key={index} 
                    style={index%2==0?{fontSize:16,fontWeight:'bold',marginLeft:25,marginBottom:5}:{fontSize:17,marginLeft:25,marginBottom:10}}>
                          {item}</Text>))
    return (
        <View style={styles.body}>
            <View  style={styles.time_box}>
                <Text style={styles.time_title}>开放时间</Text>
                <Text style={{color:'#707070',marginLeft:15,marginBottom:10}}>建议时间为1~1.5天</Text>
               {DOM}
            </View>
        <View  style={styles.time_box}>
                <Text style={styles.time_title}>门票信息</Text>
                <Text style={{color:'#707070',fontSize:18,marginLeft:15,marginBottom:10}}>
                    <Text>&emsp;&emsp;</Text>{this.state.ticketsMsg}</Text>
            </View>
             <View  style={styles.time_box}>
                <Text style={styles.time_title}>实用攻略</Text>
                <Text style={{fontSize:18,marginLeft:15,marginBottom:10}}>交通攻略</Text>
                    {traffic}
            </View>
            <View  style={styles.time_box}>
                <Text style={styles.time_title}>必看贴士</Text>
                <Text style={{fontSize:16,marginLeft:15,marginBottom:10}}>{this.state.word}</Text>
                <View style={{height:60}}></View>
            </View>
        </View>
    )
}
}
const styles = StyleSheet.create({  
    body:{
        backgroundColor:'white'
    },
    time_box:{
        borderTopWidth:10,
        borderColor:'#F2F2F2', 
    },  
       time_title:{
        marginTop:15,
        fontWeight:'bold',
        fontSize:22,
        marginLeft:15,
        marginBottom:5,
    },
       time_content:{
        padding:10,
        flex:1,
        display:'flex',
        justifyContent:'center'
    },
        time_word:{
        marginLeft:30,
        fontSize:16,
        lineHeight:45,
    }
});