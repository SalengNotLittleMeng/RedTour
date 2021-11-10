import React, { PureComponent } from 'react';
import { Text, View, DeviceEventEmitter } from 'react-native';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import PropTypes from 'prop-types';
import { pxToDp, deviceWidthDp } from '../../../utils/pxToDp';
import { fontStyle } from '../../../utils/StyleUtils';

export default class TopTabNavigator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  /**
   * pages: [
   {
        key: '日榜',
        title: '日榜',
        component: dayRank,
      },
   {
        key: '周榜',
        title: '周榜',
        component: weekRank,
      },
   {
        key: '月榜',
        title: '月榜',
        component: monthRank,
      },
   ],
   */
  static propTypes = {
    // ifScrollEnabled: PropTypes.number.isRequired,
    itemWidth: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    routes: PropTypes.array.isRequired,
  };

  static defaultProps = {
    routes: [
      // { key: 'first', title: 'first', component: HomeTabCase },
      // { key: 'second', title: 'Second', component: HomeTabCase },
      // { key: '3', title: 'Second', component: HomeTabCase },
      // { key: '4', title: 'Second', component: HomeTabCase },
      // { key: '5', title: 'Second', component: HomeTabCase },
      // { key: '6', title: 'Second', component: HomeTabCase },
    ],
    type: 1,
  };
  get bgC() {
    const { type } = this.props;
    if (type === 1) {
      return {
        backgroundColor: '#fef5e7',
        elevation: 0,
        shadowOpacity: 0,
        width: pxToDp(720),
        marginLeft: pxToDp(15),
        borderRadius: pxToDp(10),
      };
    } else if (type === 2 || type === 5) {
      return {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
      };
    } else if (type === 3) {
      return {
        backgroundColor: '#fff',
        elevation: 0,
        shadowOpacity: 0,
      };
    } else if (type === 4) {
      return {
        borderTopLeftRadius: pxToDp(40),
        borderTopRightRadius: pxToDp(40),
        backgroundColor: '#FF7200',
        elevation: 0,
        shadowOpacity: 0,
      };
    }
  }
  get bottomLine() {
    const { itemWidth, type } = this.props;
    if (type === 1) {
      return {
        height: pxToDp(0),
        // height: pxToDp(60),
        width: itemWidth * 0.888,
        borderRadius: pxToDp(30),
        //marginLeft: itemWidth * 0.2,
        marginLeft: pxToDp(8),
        marginBottom: pxToDp(15),
        // FEC60B
        backgroundColor: '#FEC60B',
        //elevation: 10,
      };
    } else if (type === 2) {
      return {
        width: itemWidth * 0.2,
        marginLeft: itemWidth * 0.4,
        marginBottom: pxToDp(18),
        backgroundColor: '#FE9E0E',
      };
    } else if (type === 3) {
      return {
        width: itemWidth * 0.1,
        marginLeft: itemWidth * 0.45,
        marginBottom: pxToDp(18),
        backgroundColor: '#F1A23C',
      };
    } else if (type === 4) {
      return {
        width: itemWidth * 0.1,
        marginLeft: itemWidth * 0.45,
        marginBottom: pxToDp(18),
        backgroundColor: '#FFF',
      };
    } else if (type === 5) {
      return {
        width: itemWidth * 0.3,
        marginLeft: itemWidth * 0.35,
        marginBottom: pxToDp(18),
        backgroundColor: '#FE9E0E',
      };
    }
  }

  renderRankListEmitter = (route) => {
    if (route.key === '日榜') {
      DeviceEventEmitter.emit('DayChangeRank');
    } else if (route.key === '周榜') {
      DeviceEventEmitter.emit('WeekChangeRank');
    } else if (route.key === '月榜') {
      DeviceEventEmitter.emit('MonthChangeRank');
    }
  };

  renderTabBar = (props) => {
    const { type, itemWidth, ifScrollEnabled } = this.props;
    return (
      <TabBar
        scrollEnabled={ifScrollEnabled}
        {...props}
        style={{ ...this.bgC, ...this.props.style }}
        labelStyle={{ fontSize: pxToDp(32), fontWeight: 'normal' }}
        activeColor={
          type === 1
            ? '#FEC60B'
            : type === 2 || type === 5
            ? '#FE9E0E'
            : type === 3
            ? '#333'
            : type === 4
            ? '#fff'
            : '#FFFFFF'
        }
        inactiveColor={type === 4 ? '#FFE4D8' : '#cccccb'}
        indicatorStyle={this.bottomLine}
        tabStyle={{ width: 'auto', minWidth: itemWidth }}
        onTabPress={({ route, preventDefault }) => {
          this.renderRankListEmitter(route);
        }}
        renderLabel={({ route, focused, color }) => (
          <View>
            <Text
              style={
                type === 5
                  ? {
                      fontWeight: focused ? 'bold' : 'normal',
                      color,
                      fontSize: pxToDp(38),
                    }
                  : {
                      fontWeight: focused ? 'bold' : 'normal',
                      color,
                    }
              }
            >
              {route.title}
            </Text>
            <View style={{ height: 1 }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'transparent',
                }}
              >
                {route.title}
              </Text>
            </View>
          </View>
        )}
      />
    );
  };

  render() {
    const { type, itemWidth, routes } = this.props;
    const { index } = this.state;
    let obj = {};
    routes.forEach((item) => {
      obj[item.key] = item.component;
    });
    const renderScene = SceneMap(obj);
    return (
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(index) => this.setState({ index })}
        initialLayout={deviceWidthDp}
        renderTabBar={this.renderTabBar}
        activeColor={
          type === 1
            ? '#FFFFFF'
            : type === 2
            ? '#FE9E0E'
            : type === 3
            ? '#000000'
            : '#FFFFFF'
        }
        inactiveTintColor={'#999'}
        indicatorStyle={this.bottomLine}
        tabStyle={{ width: itemWidth }}
        lazy={true}
        lazyPreloadDistance={1}
        renderLazyPlaceholder={() => <Text>加载中....</Text>}
      />
    );
  }
}
