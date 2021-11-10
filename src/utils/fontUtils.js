// util.js
import { Text, TextInput, Platform } from 'react-native';
import PropTypes from 'prop-types';

const TextRender = Text.render;

let customStyle = {};
// 重点，Fix Android 样式问题
if (Platform.OS === 'android') {
  customStyle = {
    fontFamily: 'PingFang-SC-Regular',
  };
}
// ios
if (Platform.OS === 'ios') {
  customStyle = {
    fontFamily: 'PingFang-SC-Regular',
  };
}

Text.render = function render(props, ...rest) {
  const mergedProps = { ...props, style: [customStyle, props.style] };
  return TextRender.apply(this, [mergedProps, ...rest]);
};

// 字体不随系统设置变化
TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, {
  allowFontScaling: false,
});
Text.defaultProps = Object.assign({}, Text.defaultProps, {
  allowFontScaling: false,
});
