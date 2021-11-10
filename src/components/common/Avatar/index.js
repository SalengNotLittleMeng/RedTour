/*
      image,           头像路径 image={}
      size,            number 直接传设计稿上px
      color,
      backgroundColor,
      text,            number 直接传设计稿上px
      textSize,        number 直接传设计稿上px
      borderColor,
      borderWidth,     number 直接传设计稿上px
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { pxToDp } from '../../../utils/pxToDp';
import Icon from '../Icon';
import { activeOpacity } from '../../../constants/config';
import Shimmer from 'react-native-shimmer';

export default class Avatar extends Component {
  static propTypes = {
    image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    size: PropTypes.number,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    text: PropTypes.string,
    textSize: PropTypes.number,
    borderRadius: PropTypes.number,
    isVip: PropTypes.bool,
  };

  static defaultProps = {
    size: pxToDp(40),
    color: '#ffffff',
    backgroundColor: '#E3E3E3',
    isVip: false,
    textSize: pxToDp(88),
  };

  vipIcon(size) {
    return (
      <Icon
        name={'vip'}
        style={{
          position: 'absolute',
          top: (98 / 130) * pxToDp(size),
          left: (98 / 130) * pxToDp(size),
          fontSize: pxToDp(30),
          borderRadius: pxToDp(30) / 2,
          color: '#fff',
          backgroundColor: '#FE9E0E',
        }}
      />
    );
  }

  render() {
    const {
      image,
      size,
      color,
      backgroundColor,
      text,
      textSize,
      isVip,
    } = this.props;

    if (image) {
      return (
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={() => this.handleClick()}
          style={{
            width: pxToDp(size),
            height: pxToDp(size),
            borderRadius: pxToDp(size) / 2,
            overflow: 'hidden',
          }}
        >
          {image.uri === '' ? (
            <Shimmer style={{ marginTop: pxToDp(10) }}>
              <Image
                style={{
                  width: pxToDp(size),
                  height: pxToDp(size),
                  borderRadius: pxToDp(size) / 2,
                  borderColor: isVip ? '#FEF5E7' : '#fff',
                  borderWidth: pxToDp(4),
                  backgroundColor: '#eae8e8',
                }}
                source={image}
              />
            </Shimmer>
          ) : (
            <Image
              style={{
                width: pxToDp(size),
                height: pxToDp(size),
                borderRadius: pxToDp(size) / 2,
                borderColor: isVip ? '#FEF5E7' : '#fff',
                borderWidth: pxToDp(4),
              }}
              source={image}
            />
          )}

          {isVip ? this.vipIcon(size) : null}
        </TouchableOpacity>
      );
    }

    if (text) {
      return (
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={() => this.handleClick()}
          style={{
            width: pxToDp(size),
            height: pxToDp(size),
            borderRadius: pxToDp(size) / 2,
          }}
        >
          <View
            style={{
              width: pxToDp(size),
              height: pxToDp(size),
              borderRadius: pxToDp(size) / 2,
              backgroundColor: backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: color,
                fontSize: pxToDp(textSize),
              }}
            >
              {text}
            </Text>
            {isVip ? this.vipIcon(size) : null}
          </View>
        </TouchableOpacity>
      );
    }

    return null;
  }

  handleClick = () => {
    console.log('点击头像');
  }
}
