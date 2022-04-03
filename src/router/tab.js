import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {pxToDp} from '../utils/pxToDp';
import RootStore from '../mobx/index';
import LocalStorageUtils from '../utils/LocalStorageUtils';

import Home from '../pages/home';
import DynamicList from '../pages/dynamic';
import Demand from '../pages/demand';
import Message from '../pages/message';
import personal from '../pages/personal';
// 登录
import Logintwo from '../pages/user/logintwo';
// 旅游模式
import Maintourytm from '../pages/tour/Maintourytm'

import {
  flexColumnCenter,
  flexRowSpb,
  fontStyle,
  margin,
  padding,
} from '../utils/StyleUtils';
import {
  tabbar_home_selected,
  tabbar_demand_selected,
  tabbar_message_selected,
  tabbar_mine_selected,
  tabbar_tuijian,
  tabbar_lvyou,
  tabbar_demand,
  tabbar_home,
  tabbar_message,
  tabbar_mine,
} from '../constants/svg';
import {inject,observer} from 'mobx-react'

import Svg from 'react-native-svg-uri';

const tabSelectedArray = [
  tabbar_home_selected,
  tabbar_demand_selected,
  '',
  tabbar_message_selected,
  tabbar_mine_selected,
];
// const tabArray = [tabbar_home, tabbar_demand, '', tabbar_message, tabbar_mine];
const tabArray = [tabbar_tuijian, '', tabbar_lvyou];

const Tab = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.tab_home_wrap}>
      <Image
        style={styles.tab_home_bg}
        source={require('../assets/images/Bottom_home.png')}
      />
      <View style={styles.tab_home}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label = route.name;

          // 是否当前页面
          const isFocused = state.index === index;

          // 点击事件
          const onPress = () => {
            if (
              RootStore.userStore.allData.accessToken === '' &&
              (route.name === '消息' ||
                route.name === '需求' ||
                route.name === '我的')
            ) {
              NavigationHelper.navigate('Login');
              return;
            }
            //给当前点击的标签发送```tabPress```事件
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            //判断是否已经在当前标签页面
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // 长按压
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.bottom_item}>
              {tabIcon(isFocused, index)}
              {index !== 2 ? (
                <Text
                  style={{
                    ...styles.item_text,
                    color: isFocused ? '#FE9E0E' : '#888',
                  }}>
                    {/* 图标下面对应文字 */}
                  {/* {label} */}
                </Text>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
function tabIcon(isFocused, index) {
  if (index === 1) {
    return (
    <TouchableOpacity onPress={()=>{
            console.log(RootStore.globalStore.isPlaying)
            RootStore.globalStore.setPlaying()
}}>
    <View onStartShouldSetResponderCapture={(ev) => false}
    >
      <Image
        source={require('../assets/icons/playing.png')}
        style={{
          marginBottom: pxToDp(180),
          width: pxToDp(218),
          height: pxToDp(218),
          borderTopWidth:pxToDp(140)
        }}
        resizeMode={'contain'}
      />
    </View>
    </TouchableOpacity>
    );
  }
  //有选择样式之后代码
//   if (isFocused) {
//     return (
//       <Svg
//         svgXmlData={tabSelectedArray[index]}
//         width={pxToDp(40)}
//         height={pxToDp(40)}
//         style={styles.bottom_item_svg} 
//       />
//     );
//   } else {
//     return (
//       <Svg
//         svgXmlData={tabArray[index]}
//         width={pxToDp(40)}
//         height={pxToDp(40)}
//         style={styles.bottom_item_svg}
//       />
//     );
//   }
// }
    return (
      <Svg
        svgXmlData={tabArray[index]}
        width={pxToDp(65)}
        height={pxToDp(65)}
        style={styles.bottom_item_svg}
      />
    );
  }
@inject('RootStore')
@observer
class Tabs extends Component {
  constructor(props) {
    super(props);
    this.keyboardDidShowListener = null;
    this.keyboardDidHideListener = null;
    this.state = {KeyboardShown: true};
  }

  componentWillMount() {

    LocalStorageUtils.get('userInfo').then((userInfo) => {
        console.log(userInfo)
      if (userInfo !== null) {
        // 1.重新获取用户信息
        updataInfo=async function(){
            let res=await Http.personaldata()
            console.log(res)
            if(res.data.code!=500){
                let info=res.data.data
                this.props.RootStore.userStore.infoSet(info)
            }
        }
        updataInfo();
        // 2.存储到mobx中
      } else {
        // 跳转登录
        // this.props.navigate()
        this.props.navigation.navigate('Logintwo')
      }
    });
    //监听键盘弹出事件
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardDidShowHandler.bind(this),
    );
    //监听键盘隐藏事件
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHideHandler.bind(this),
    );
  }

  componentWillUnmount() {
    //卸载键盘弹出事件监听
    if (this.keyboardDidShowListener != null) {
      this.keyboardDidShowListener.remove();
    }
    //卸载键盘隐藏事件监听
    if (this.keyboardDidHideListener != null) {
      this.keyboardDidHideListener.remove();
    }
  }

  //键盘弹出事件响应
  keyboardDidShowHandler(event) {
    this.setState({KeyboardShown: false});
    // console.log(123);
  }

  //键盘隐藏事件响应
  keyboardDidHideHandler(event) {
    this.setState({KeyboardShown: true});
  }

  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          keyboardHidesTabBar: true,
        }}
        tabBar={(props) =>
          this.state.KeyboardShown ? <MyTabBar {...props} /> : null
        }>
          {/* 推荐页面 */}
        <Tab.Screen name="首页" component={Home} />
        {/* 播放 */}
        <Tab.Screen name="需要" component={Home} />
        {/* 旅游页面 */}
        <Tab.Screen name="动态" component={Maintourytm} />


      </Tab.Navigator>
    );
  }
}

export default Tabs;

const styles = StyleSheet.create({
  tab_home_wrap: {
    width: pxToDp(750),
    height: pxToDp(90),
    position: 'relative',
  },
  tab_home_bg: {
    width: pxToDp(750),
    height: pxToDp(120),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab_home: {
    width: pxToDp(750),
    height: pxToDp(124),
    ...padding(126, 0, 126, 0),
    ...margin(0,0,0,-126),
    ...flexRowSpb,
    alignItems: 'flex-start',
  },
  bottom_item: {
    width: pxToDp(65),
    ...flexColumnCenter,
  },
  bottom_item_svg: {
    // marginBottom: pxToDp(10),
  },
  item_text: {
    marginBottom: pxToDp(30),
    ...fontStyle(22, 22, 24, 'normal', '#888', 'center'),
  },
});
