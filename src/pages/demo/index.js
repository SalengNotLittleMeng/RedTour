import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '../../components/common/Icon';
import {fontStyle, margin} from '../../utils/StyleUtils';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSkip = () => {
    NavigationHelper.navigate('Login');
  };

  onPress = async () => {
    let res = await Http.dynamicList({page: 1, size: 8});
    console.log(res);
    if (res.code === 0) {
      // 成功的操作
    } else {
      // 失败的操作
    }
  };

  render() {
    return (
      <View>
        <View>
          <Text>1. iconfont使用</Text>
          {/* icon使用 */}
          <Icon name={'telUpdate'} />
          {/* svg使用看route/tab */}
        </View>
        <View>
          <TouchableOpacity onPress={this.onSkip}>
            <Text>2. 页面跳转以及导航使用</Text>
            {/* 导航使用看route/nav.js */}
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={this.onPress}>
            <Text>3. 请求使用</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>4. mobx使用(全局)</Text>
        </View>
        <View>
          {/* 一定要会es6的解构赋值 */}
          {/* 使用stylesheet */}
          <Text style={styles.title}>5. 样式使用</Text>
          {/* 行内 */}
          <Text style={{...margin(20, 30, 30, 20)}} />
          {/* 多个样式 */}
          <Text style={{...styles.title, ...styles.font}}>
            {/* 或者 style={[styles.title, styles.font]} */}
            这条是结合的样式
          </Text>
        </View>
        <View>
          <Text>
            action/request.js一定要看懂；整个src都过一遍，注意utils里的东西可以使代码更高效
          </Text>
          <Text>退出一定要从黑框退出，终端推出不会关闭黑框</Text>
          <Text>推荐使用yarn，yarn的启动命令：yarn android</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    // 使用了封装的样式，在utils里看更多封装的样式
    ...margin(30, 20, 20, 30),
  },
  font: {
    ...fontStyle(32, 34, 34, 'bold', '#333', 'center'),
  },
});

export default Index;
