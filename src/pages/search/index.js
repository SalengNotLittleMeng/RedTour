import React,{Component} from 'react'
import {
    View,
    Text,
    Button,
    StatusBar,
    TextInput,
    StyleSheet,
    Image,
    ScrollView,
    Alert,
    flex,
    TouchableOpacity,
    BaseComponent,
    FlatList
    
} from 'react-native';
// import { withNavigation } from 'react-navigation';
// import { NavigationEvents } from 'react-navigation';
import LocalStorageUtils from '../../utils/LocalStorageUtils';
import { pxToDp } from '../../utils/pxToDp';
import axios from 'axios'
export default class Search1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            placeholder: '搜索',
            isPostList: false, //是否搜索
            keyword: '',//搜索关键字  
            searchHistory: [],// 搜索历史数组
            hotTagsArr: [],// 热门搜索标签数组
            pageNum:0,// 默认页码
            searchResult:[],//搜索结果数组
            isLoadding:false,//分页
        };
    }
    componentDidMount() {
        this._getHotWords()
    }
    componentWillMount() {}

    // 方法
        //获取搜索列表数据
        // (热门搜索)
        _getHotWords() {
            // ModalIndicator.show('请求中...')
            let params = '{"data":{}}'
            // this._post('common/v2/campus/getHotWords', {},
            //     params, true, data => {
            //         // ModalIndicator.hide()
            //         if (data.code == 0) {
            //             console.log('hotTagsArr: ' + data.data)
            //             console.log('hotTagsArr: ' + data.data.hot_words)
            //             if (!_.isEmpty(data.data.hot_words)) {                       //！isEmpty是非空的
            //                 this.setState({
            //                     hotTagsArr: data.data.hot_words,
            //                 })
            //             } else {
            //                 this.setState({
            //                     hotTagsArr: [],
            //                 })
            //             }
            //         } else {
            //             // _showModalMessage(this.props.navigation, data.msg);
            //         }
            //     }, err => {
            //         // ModalIndicator.hide()
            //         console.log('err: ', err)
            //     })
        }
        
        //关键字改变
        onChanegeTextKeyword= async(Val)=> {
            //输入的关键字去空格空字符
            let newVal = Val.replace(/(^\s*)|(\s*$)/g, "")
            console.log(newVal)
            if (newVal!="") {
                this.setState({isPostList: true})
            } else {
                // Toast.message('请输入搜索关键字', null, 'center')
            }
            await this.setState({keyword: newVal});
            //对接开始
// 这里是搜索的对接部分
// 测试的时候把下面这行注释取消掉，将keyword改成'逸'，能够搜索出数据
            this.setState({keyword:'逸'})
            this.setState({isPostList: true})
            axios.post(`http://49.233.252.20:8085/select/${this.state.keyword}`,{
                pageNum:this.state.pageNum
            }).then(res=>{
                // console.log(res.data.data)
                this.setState({searchResult:res.data.data})
                this.state.isLoadding=false;
                // console.log(this.state.searchResult)
            },function(err){console.log(err)})
            //对接结束
        }
    
        //历史和热门标签值赋值输入框
        _setValues(item) {
            this.setState({value: item})
        }
    
        //聚焦
        _onFous(v) {
            if (v.nativeEvent.target) {
                this.setState({isPostList: false})
            }
        }
    
        //删除历史搜索数据
        _deleteHistory() {
            // 判断是否有本地搜索历史
            if (this.state.searchHistory.length > 0) {
                Alert.alert(
                    '提示',
                    '确定清除所有历史搜索记录吗？',
                    [
                        {text: '取消', onPress: () => console.log('取消'), style: 'cancel'},
                        {
                            text: '确定', onPress: () => {
                                // Toast.message('清除历史搜索记录成功', null, 'center')
                                removeItem("searchHistory");
                                this.setState({
                                    value: '',
                                    searchHistory: [],
                                })
                            }
                        },
                    ]
                )
            }
        }
    
        //获取历史记录
        _getHistory() {
            // 查询本地历史
            getItems("searchHistory").then(data => {
                if (data == null) {
                    this.setState({
                        searchHistory: [],
                    })
                } else {
                    this.setState({
                        searchHistory: data,
                    })
                }
            })
        }
    
        // 保存搜索标签
        _insertSearch(newText) {
            let text = newText.replace(/(^\s*)|(\s*$)/g, "")
            if (text!="") {
                if (this.state.searchHistory.indexOf(text) != -1) {
                    // 本地历史 已有 搜索内容
                    let index = this.state.searchHistory.indexOf(text);
                    let tempArr = arrDelete(this.state.searchHistory, index)
                    tempArr.unshift(text);
                    LocalStorageUtils.set("searchHistory", tempArr);
                } else {
                    // 本地历史 无 搜索内容
                    let tempArr = this.state.searchHistory;
                    tempArr.unshift(text);
                    LocalStorageUtils.set("searchHistory", tempArr);
                }
            }
        }
        //以当前keyword继续发起请求（分页器）
        keywordContinueRequest=()=>{
            this.setState({isPostList: true})
            axios.post(`http://49.233.252.20:8085/select/${this.state.keyword}`,{
                pageNum:this.state.pageNum++
            }).then(res=>{
                console.log(res.data.data)
                this.setState({searchResult:res.data.data})
                console.log(this.state.searchResult)
            },function(err){console.log(err)})
        }
        //滚顶条触底事件
        onEndReached=()=>{
            // console.log("onEndReached") 
            // 判断是否有下一页数据以及节流阀
            if(this.state.isLoadding){
                return;
            }else{
                // 还有下一页数据
                this.state.isLoadding=true;
                this.keywordContinueRequest();
            }
        }    
    
    render() {
        const {navigation}=this.props
        const {searchResult}=this.state
        return (

            <View style={styles.container}>
                {/*监听页面，刷新搜索本地历史历史*/}
                {/* <NavigationEvents onWillFocus={() => {      //onWillFocus：页面将要获得焦点;react-navigation提供NavigationEvents onWillFocus
                    //查询本地搜索历史
                    this._getHistory();
                }}/> */}
                {/* <Header title='搜索'
                        navigation={this.props.navigation}      //或许是作者自己写的组件
                        show_close_img={true}
                /> */}
                <View style={styles.inputBox}>
                    <View style={styles.inputIcon}>
                        <Image source={require('../../static/img/search.png')}/>
                    </View>
                    <TextInput style={styles.inputText}
                            autoCapitalize="none"
                            value={this.state.value}
                            onChangeText={(text) => this.setState({value: text})}
                            onSubmitEditing={() => {
                                   //开始搜索
                                    this.onChanegeTextKeyword(this.state.value);
                                  // 保存搜索内容
                                    this._insertSearch(this.state.value);
                            }}
                            returnKeyType="search"
                            underlineColorAndroid="transparent"
                            placeholder={this.state.placeholder}
                            placeholderTextColor={'#BFBFBF'}
                            onFocus={this._onFous.bind(this)}
                            autoFocus={true}
                            defaultValue={this.state.value}
                            keyboardType="default"/>
                </View>
                <TouchableOpacity style={styles.button} 
                    onPress={()=>{
                        navigation.goBack()
                    }}>
                    <Text>取消</Text>
                </TouchableOpacity>
                <View style={styles.lin}/>
                {
                    (this.state.isPostList) ?
                        //列表
                        // <ScrollView style={styles.scrollView}>
                        //     <View style={styles.listView}>
                        //         {searchResult.map((item,index)=><View key={index}>
                        //             <Text style={{fontSize:pxToDp(40),backgroundColor:'#DADADA',color:"#333333",marginLeft:10,marginRight:10,paddingLeft:10,paddingRight:10}}>
                        //                 {item.name}
                        //             </Text>
                        //         </View>)}
                        //     </View>
                        // </ScrollView>
                        <>
                            <FlatList
                            handleMethod = {({viewableItems}) => this.handleViewableItemsChanged(viewableItems)}
                            extraData={this.state}
                            refreshing={true}
                            style={styles.scrollView}
                                onEndReached={this.onEndReached}
                                onEndReachedThreshold={0.1}
                                data={searchResult}
                                keyExtractor={item => item.id}
                                renderItem={({item,index})=>
                                <>
                                <TouchableOpacity onPress={()=>{
                                    navigation.navigate('Details',{id:this.state.searchResult[index].id})}} 
                                >
                                    {item.cover_url=="" ? 
                                    <View key={index} style={{height:pxToDp(362),backgroundColor:"#FFFFFF",marginTop:pxToDp(34),borderRadius:10}}>
                                        {/* 景点名称 */}
                                        <Text style={{fontSize:pxToDp(32),marginLeft:pxToDp(30),marginTop:pxToDp(32)}}>{item.name}</Text>
                                        {/* 景点图片 */}
                                        <Image style={{width:pxToDp(286),height:pxToDp(191),marginLeft:pxToDp(34),marginTop:pxToDp(34)}} source={{uri:item.cover_url}} />
                                        {/* 景点简介 */}
                                        <Text numberOfLines={6} ellipsizeMode="tail" style={{fontSize:pxToDp(28),marginTop:pxToDp(-232),marginLeft:pxToDp(356),marginRight:pxToDp(32)}}>        {item.introduce} </Text>
                                            <View  style={{flexDirection:"row", position: 'absolute',}}>
                                                {/* 景点地址 */}
                                                <View>
                                                    <Image style={{width:pxToDp(24),height:pxToDp(24),marginLeft:pxToDp(58),marginTop:pxToDp(320)}} source={require('../../static/img/dingWei.png')} />
                                                    <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(92),marginTop:pxToDp(-24)}}>{item.location}</Text>
                                                </View>
                                                {/* 景点数据 */}
                                                {/* <View style={{flexDirection:"row"}}>
                                                    <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(58),marginTop:pxToDp(320),marginLeft:pxToDp(400)}}>{item.views}浏览</Text>
                                                    <Text style={{fontSize:pxToDp(20),marginTop:pxToDp(320),marginLeft:pxToDp(10)}}>{item.commentNum}评论</Text>
                                                </View> */}
                                            </View>
                                    </View>
                                    : 
                                    <View key={index} style={{height:pxToDp(240),backgroundColor:"#FFFFFF",marginTop:pxToDp(34),borderRadius:15,}}>
                                        {/* 景点名称 */}
                                        <Text style={{fontSize:pxToDp(32),marginLeft:pxToDp(30),marginTop:pxToDp(32)}}>{item.name}</Text>
                                        {/* 景点简介 */}
                                        <Text numberOfLines={2} ellipsizeMode="tail" style={{fontSize:pxToDp(28),marginTop:pxToDp(10),marginLeft:pxToDp(30),marginRight:pxToDp(32)}}>        {item.introduce} </Text>
                                            <View  style={{flexDirection:"row", position: 'absolute',}}>
                                                {/* 景点地址 */}
                                                <View>
                                                    <Image style={{width:pxToDp(24),height:pxToDp(24),marginLeft:pxToDp(58),marginTop:pxToDp(190)}} source={require('../../static/img/dingWei.png')} />
                                                    <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(92),marginTop:pxToDp(-24)}}>{item.location}</Text>
                                                </View>
                                                {/* 景点数据 */}
                                                {/* <View style={{flexDirection:"row"}}>
                                                    <Text style={{fontSize:pxToDp(20),marginLeft:pxToDp(58),marginTop:pxToDp(320),marginLeft:pxToDp(400)}}>{item.views}浏览</Text>
                                                    <Text style={{fontSize:pxToDp(20),marginTop:pxToDp(320),marginLeft:pxToDp(10)}}>{item.commentNum}评论</Text>
                                                </View> */}
                                            </View>
                                    </View>
                                        }
                                </TouchableOpacity>                                                           

                                    {item==null?<View><Text>没有更多了</Text></View>:<></> }
                                </>}
                            />
                        </>
                        :
                        //历史和热门
                        <ScrollView >
                            <View style={styles.head1}>
                                <Text style={{fontSize: pxToDp(28), color: "#333"}}>{"搜索历史"}</Text>
                                <TouchableOpacity activeOpacity={0.3} onPress={() => this._deleteHistory()}>
                                    <Image source={require('../../static/img/delete.png')}/>
                                </TouchableOpacity>
                            </View>
                            {
                                this.state.searchHistory.length > 0 ?
                                    <View style={styles.queryList}>
                                        {this.state.searchHistory.map((item, index) => {
                                            return (
                                                <View key={index}>
                                                    <TouchableOpacity onPress={() => {
                                                        //去搜索
                                                        this.onChanegeTextKeyword(item);
                                                        //给输入框赋值
                                                        this._setValues(item);
                                                        // 保存搜索内容
                                                        this._insertSearch(item);
                                                    }} activeOpacity={0.3}>
                                                        <Text numberOfLines={1} style={styles.queryItem}>{item}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })}
                                    </View>
                                    :
                                    <View style={styles.noData}>
                                        <Text style={styles.noDataTxt}>暂无搜索历史</Text>
                                    </View>
                            }
                            <View style={styles.head}>
                                <Text style={{fontSize: pxToDp(28), color: "#333"}}>{"热门标签"}</Text>
                            </View>
                            {
                                this.state.hotTagsArr.length > 0 ?
                                    <View style={styles.queryList}>
                                        {/* 热门搜索标签渲染 */}
                                        {this.state.hotTagsArr.map((item, index) => {
                                            return (
                                                <View key={index}>
                                                    <TouchableOpacity onPress={() => {
                                                        //去搜索
                                                        this.onChanegeTextKeyword(item);
                                                        //给输入框赋值
                                                        this._setValues(item);
                                                        // 保存搜索内容
                                                        this._insertSearch(item);
                                                    }} activeOpacity={0.3}>
                                                        <Text numberOfLines={1} style={styles.queryItem}>{item}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })}
                                    </View>
                                    :
                                    <View style={styles.noData}>
                                        <Text style={styles.noDataTxt}>更多热词敬请期待</Text>
                                    </View>
                            }

                        </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputBox: {
        height: Platform.OS === 'ios' ? 25 : 35,
        width:pxToDp(496),
        marginLeft: pxToDp(72),
        // marginRight: 15,
        flexDirection: 'row',
        backgroundColor: '#F2E4E5',
        borderRadius: 15,
        borderWidth: 0,
        marginTop: 34,
    },
    button:{
        marginLeft: pxToDp(624),
        marginTop: pxToDp(-50),
        width:pxToDp(120),
        height:pxToDp(40),
    },
    lin: {
        height: 1,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: '#E7E7E7',
        marginTop: 10,
    },
    scrollView: {
        // marginTop:200,
        backgroundColor: '#E7E7E7',
    },
    listView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
        // backgroundColor:'red',
    },
    head1: {
        paddingHorizontal: pxToDp(29),
        marginTop: pxToDp(43),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    head: {
        paddingHorizontal: pxToDp(29),
        marginTop: pxToDp(223),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    queryList: {
        marginTop: 10,
        marginRight: 16,
        marginLeft: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    queryItem: {
        flex: 1,
        fontSize: pxToDp(24),
        backgroundColor: '#F4F4F4',
        paddingHorizontal: 30,
        paddingVertical: 6,
        borderRadius: 3,
        marginRight: 10,
        marginBottom: 10
    },
    inputIcon: {
        margin: Platform.OS === 'ios'
            ? 5
            : 10,
        // marginLeft: pxToDp(34),

    },
    inputText: {
        flex: 1,
        paddingLeft: 5,
        textAlignVertical: 'center',
        paddingVertical: 0
    },
    noData: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginTop: 10,
        marginBottom: 12,
    },
    noDataTxt: {
        fontSize: pxToDp(24),
    },
});