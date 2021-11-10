/*
使用时配合 Modal
<Modal
          animationType={"fade"}
          transparent={true}
          visible={loadingData.loadingVisible}
        >
          <Loading text={loadingData.loadingText}/>
        </Modal>
 */
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { deviceHeightDp, deviceWidthDp, pxToDp } from '../../../utils/pxToDp';

export default class Loading extends React.Component {
  static defaultProps = {
    text: '加载中...',
  };
  render() {
    return (
      <View style={styles.load_box}>
        <ActivityIndicator
          animating={true}
          color={'#fff'}
          size={'large'}
          style={styles.load_progress}
        />
        <Text style={styles.load_text}>{this.props.text}</Text>
      </View>
    );
  }
}

const loadTextColor = '#fff';
const loadBoxBackgroundColor = '#222';
const styles = StyleSheet.create({
  load_box: {
    width: pxToDp(150),
    height: pxToDp(150),
    backgroundColor: loadBoxBackgroundColor,
    alignItems: 'center',
    marginLeft: deviceWidthDp / 2 - pxToDp(75),
    marginTop: deviceHeightDp / 2 - pxToDp(75),
    borderRadius: pxToDp(10),
  },
  load_progress: {
    position: 'absolute',
    width: pxToDp(100),
    height: pxToDp(90),
  },
  load_text: {
    marginTop: pxToDp(90),
    color: loadTextColor,
  },
});
