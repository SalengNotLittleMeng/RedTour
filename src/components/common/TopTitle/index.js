{
  /* <TopTitle bgColor="#FFF" color="#000"  returnBack={this.sss} onPress={this.hello} title="购物列表" showBtn={true}></TopTitle> */
}
// returnBack是返回按钮得参数，onpress是右侧详情按钮得函数，title是中间得文字，showBtn是右侧按钮是否展示 bgColor背景色 color字的颜色  只有#FFF和#000两种
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { pxToDp } from '../../../utils/pxToDp';
import PropTypes from 'prop-types';
import SvgUri from 'react-native-svg-uri';
import { goBack, goBackWhite } from '../../../constants/svg';
export class index extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    showBtn: PropTypes.bool.isRequired,
    color: PropTypes.string,
    bgColor: PropTypes.string,
  };
  static defaultProps = {
    color: '#000',
    bgColor: '#FFF',
  };
  ifShowBtn = () => {
    if (this.props.showBtn === false) {
      return (
        <View
          style={{
            marginTop: pxToDp(89),
            // backgroundColor: 'blue',
            width: pxToDp(180),
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        />
      );
    } else if (this.props.showBtn === true) {
      return (
        <View
          style={{
            marginTop: pxToDp(89),
            // backgroundColor: 'blue',
            width: pxToDp(180),
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              width: pxToDp(91),
              height: pxToDp(46),
              backgroundColor: '#FE9E0E',
              borderRadius: pxToDp(8),
              elevation: 10,
              marginRight: pxToDp(18),
              justifyContent: 'center',
            }}
            onPress={this.props.onPress}
          >
            <Text
              style={{
                fontSize: pxToDp(24),
                fontWeight: '500',
                color: '#FFF',
                alignSelf: 'center',
              }}
            >
              清空
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  showBackSvg = () => {
    const { color } = this.props;
    if (color === '#000') {
      return <SvgUri svgXmlData={goBack} width={26} height={30} />;
    } else if (color === '#FFF') {
      return <SvgUri svgXmlData={goBackWhite} width={26} height={30} />;
    }
  };
  render() {
    const { title, color, bgColor } = this.props;
    return (
      <View
        style={{
          backgroundColor: bgColor,
          alignItems: 'center',
          zIndex: 8,
          ...this.props.style,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: pxToDp(178),
            width: '90%',
          }}
        >
          <View
            style={{
              marginTop: pxToDp(89),
              // backgroundColor: 'red',
              width: pxToDp(180),
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <TouchableOpacity onPress={() => NavigationHelper.goBack()}>
              {this.showBackSvg()}
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: pxToDp(89),
              // backgroundColor: 'yellow',
              width: pxToDp(230),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: pxToDp(38),
                fontWeight: 'bold',
                color: color,
              }}
            >
              {title}
            </Text>
          </View>
          {/* 右侧按钮开始 */}
          {this.ifShowBtn()}
          {/* 右侧按钮结束 */}
        </View>
        {this.props.children}
      </View>
    );
  }
}

export default index;
