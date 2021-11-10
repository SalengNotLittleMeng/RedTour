import React from 'react';
import {Text} from 'react-native';
import IconMap from '../../../constants/icon';

/*
   name: icon名字
   style: 样式
 */

const Icon = (props) => (
  <Text
    style={{fontFamily: 'iconfont', ...props.style}}
    onPress={props.onPress}>
    {IconMap[props.name] || props.name}
  </Text>
);

export default Icon;
