import React, { useState, useRef,Component } from "react";
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';


// 路由
import Tab from './tab';
// ---------------旅游模式----------------
import Maintourytm from '../pages/tour/Maintourytm'
import TourMessage from '../pages/tour/TourMessage'
import TourMessage_comments_list from '../pages/tour/TourMessage_comments_list'
import TourMessage_comments_detail from '../pages/tour/TourMessage_comments_detail'

// 留几处作为参考
// ---------------个人中心----------------
// import MyWallet from '../pages/personal/myWallet';
// import MyFans from '../pages/personal/myFans';
// import DataEdit from '../pages/personal/setting/dataEdit';

// ---------------主页----------------
// import HomeSearch from '../pages/home/HomeSearch';
import Recomment from '../pages/home/index';
import Details from '../pages/details/index';
import Comment from '../pages/comment/index';
// ---------------书籍----------------
// 书籍内容
// import bookContent from '../pages/books/bookContent';

// ---------------用户----------------
import Loginfive from '../pages/user/loginfive';
import Logintwo from '../pages/user/logintwo';
import Loginone from '../pages/user/loginone';
import Login from '../pages/user/login';

import Birthday from '../pages/personal/birthday';
import Nicheng from '../pages/personal/nicheng';
import Pfour from '../pages/personal/pfour';
import Pthree from '../pages/personal/pthree';
import Personal from '../pages/personal/personal';
import Pone from '../pages/personal/pone';
import Ptwo from '../pages/personal/ptwo';


const Stack = createStackNavigator();

class Nav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer
        onStateChange={(state: NavigationState) => {
          //加入该行
          //这个是跳转了才去回调，所以不能利用routes来判断路由栈
          NavigationHelper.navRouters = state.routes;
        }}>
        <Stack.Navigator
          initialRouteName="Tab"
          headerMode={'none'}
          screenOptions={(navigation) => {
            NavigationHelper.navigation = navigation.navigation;
          }}>
          {/* 从这里开始是pages */}
{/* 登录和个人中心部分 */}
         <Stack.Screen
            name="Loginone"
            component={Loginone}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
            <Stack.Screen
            name="Personal"
            component={Personal}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
             <Stack.Screen
            name="Ptwo"
            component={Ptwo}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
             <Stack.Screen
            name="Pone"
            component={Pone}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
              <Stack.Screen
            name="Pthree"
            component={Pthree}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="Pfour"
            component={Pfour}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="Nicheng"
            component={Nicheng}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="Birthday"
            component={Birthday}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
             <Stack.Screen
            name="Logintwo"
            component={Logintwo}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="Loginfive"
            component={Loginfive}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        {/* 主页部分 */}
          <Stack.Screen
            name="Tab"
            component={Tab}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="Recomment"
            component={Recomment}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="Comment"
            component={Comment}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
  {/* 旅游模式 */}
            <Stack.Screen
                name="Maintourytm" 
                component={Maintourytm}
                options={{headerShown: false}}
            />
           <Stack.Screen 
                name="TourMessage" 
                component={TourMessage} 
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="TourMessage_comments_detail" 
                component={TourMessage_comments_detail} 
                options={{headerShown: false}}
            /> 
            <Stack.Screen 
                name="TourMessage_comments_list" 
                component={TourMessage_comments_list} 
                options={{headerShown: false}}
            />
       
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Nav;
