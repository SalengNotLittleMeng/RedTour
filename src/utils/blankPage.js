/**
 * 页面初始化先渲染空视图减少页面转场时间
 */

import React, {PureComponent} from 'react';
import {View, Image} from 'react-native';
import {pxToDp} from './pxToDp';

export default class BlankPage extends PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: 'center',
          backgroundColor: '#fff',
          marginTop: pxToDp(200),
        }}>
        <Image
          style={{width: 150, height: 150, backgroundColor: '#f5f5f5'}}
          source={require('../assets/images/loading.gif')}
        />
      </View>
    );
  }
}
