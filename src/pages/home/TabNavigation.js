import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native';
import { pxToDp } from '../../utils/pxToDp'; 

const dimen = Dimensions.get('window');
const deviceWidth = dimen.width;

/**
 * tab组件头部
 * props    data    tab列表
 * props    style   样式
 * props    index   默认选中的序号
 * props    onChange    选中
 */
export default class TabBar extends Component {

    static defaultProps = {
        data: [],
        // 热门,热门,热门,热门,热门,热门,
        // "热门","热门","热门","热门","热门","热门",
        index: -1,
        onChange: () => { },
    }
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        }
        
        this.scroll = null;
        this.laout_list = []
        this.scrollW = 0;
    }
    
    render() {
        return (
            <View style={[tabBarStyle.tab, this.props.style]}>
                <ScrollView ref={e => this.scroll = e}
                    horizontal directionalLockEnabled
                    showsHorizontalScrollIndicator={false}
                    snapToAlignment="center">
                    {this.props.data.map((item, index) =>
                        <TouchableOpacity onPress={() => this.setIndex(index)} onLayout={e => this.setLaout(e.nativeEvent.layout, index)} key={item.id} style={tabBarStyle.itemBtn}>
                            <Text style={[tabBarStyle.item, this.state.index === index ? tabBarStyle.active : null]} > {item.typeLabel}</Text>
                            <View style={[tabBarStyle.line, this.state.index === index ? tabBarStyle.active2 : null]}></View>
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
        )
    }
    scroll = null;
    laout_list = []
    scrollW = 0;

    shouldUpdate = true;
    
    shouldComponentUpdate() {
        if (!this.shouldUpdate) return false;
        return !(this.shouldUpdate = false);
    }
    UNSAFE_componentWillReceiveProps(pp) {
        if (pp.index != this.props.index) {
            this.setState({ index: pp.index })
            setTimeout(() => {
                this.setIndex(pp.index, false);
            }, 200);
        }
    }
    setLaout(layout, index) {
        this.laout_list[index] = layout;
        this.scrollW += layout.width;
    }

    setIndex(index, bl = true) {
        this.setState({ index })
        if (!this.scroll) return;
        let layout = this.laout_list[index];
        let rx = deviceWidth / 2;
        let sx = layout.x - rx + layout.width / 2;
        if (sx < 0) sx = 0;
        sx < this.scrollW - deviceWidth && this.scroll.scrollTo({ x: sx, animated: bl });
        sx >= this.scrollW - deviceWidth && this.scroll.scrollToEnd({ animated: bl });
        this.props.onChange && this.props.onChange(index);
        this.shouldUpdate = true;
    }
}
const tabBarStyle = StyleSheet.create({
    tab: {
        backgroundColor: '#FFFEFE',
        // #F5F5F5
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: '#efefef',
        borderBottomLeftRadius:pxToDp(40),
        borderBottomRightRadius:pxToDp(40),
        // borderBottomWidth: pxToDp(1),
        height: pxToDp(100)
    },
    itemBtn: {
        paddingHorizontal: pxToDp(24),
        paddingTop: pxToDp(4),
        // marginLeft:pxToDp(2),
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    //Tab文字样式
    item: {
        fontSize: pxToDp(28),
        color: "#333333",
        // marginLeft:pxToDp(12)
    },
    //点击选中后文字颜色
    active: {
        // color: "#d0648f"
    },
    //下划线
    line: {
        width: pxToDp(32),
        height: pxToDp(6),
        backgroundColor: "#fbfafc",
        marginTop: pxToDp(8),
        // marginBottom: 2,
    },
    //下划线颜色
    active2: {
        backgroundColor: "#D52E30"
    },
    sortimg: {
        width: 55,
        height: 40,
    }
});