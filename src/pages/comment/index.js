import React,{Component} from 'react'
import {
    View,
    Text,
    StatusBar,
    TextInput,StyleSheet,TouchableOpacity,ScrollView,
    Image,
    FlatList,
    Modal
} from 'react-native'
import { pxToDp } from '../../utils/pxToDp'

export default class Comment extends Component{
    constructor (props) { 
        super(props); 
        
        this.state = { 
            //判断是否用户点赞 0否 1是
            loveKey:"",
            //用户评论点赞数
            likeNumber:"",
            flag:true,
            like: true,
            Collection: true,
            PageNum:1,
            commentList:[],
            isLoadding:false,
            //评论展开属性
            numLines: null,
            maxHeight: 0,
            showOpenDetail: false,
            //评论框
            showInput:true,
            text:"",
            
        }; 
        articleId = this.props.route.params.id;
        title = this.props.route.params.title;
        
    } 
    componentDidMount(){
        this.getComment(); 
    }

    //获取评论详情
    getComment=async(isNew=false)=>{
        let res=await Http.getComment({PageNum:this.state.PageNum,articleId:articleId})
        if(isNew){
            this.setState({ commentList:res.data.data})
        }else{
            this.setState({ commentList:[...this.state.commentList,...res.data.data]});
        }
        // console.log(this.state.commentList);
        // console.log(res)

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
                this.state.PageNum++;
                this.getComment();
            }
        }
    //文章点赞函数
    likeFun=async()=>{

        let res=await Http.userDZ({articleId:articleId})
        console.log(res)
        if(res.data.code!=-1){
            console.log("点赞成功")
            this.setState({ 
                like: !this.state.like,
            }) 
        }else{
            console.log("失败")
        }
        
    }
    //判断用户是否点赞函数
    itLike=async()=>{
        let res=await Http.userItDZ({articleId:articleId,PageNum:this.state.PageNum})
        console.log(res.data.data.status)
        if(res.data.data.status==0){
            this.setState({ 
                like: true,
            }) 
        }else{
            this.setState({ 
                like: false,
            })
        }
    }
    //文章收藏函数
    CollectionFun=async()=>{

        let res=await Http.userSC({articleId:articleId})
        console.log(res)
        if(res.data.code!=-1){
            console.log("收藏成功")
            this.setState({ 
                Collection: !this.state.Collection,
            }) 
        }else{
            console.log("失败")
        }
        
    }
    //判断用户是否收藏函数
    itCollection=async()=>{
        let res=await Http.userItSC({articleId:articleId,PageNum:this.state.PageNum})
        console.log(res.data.data.status)
        if(res.data.data.status==0){
            this.setState({ 
                Collection: true,
            }) 
        }else{
            this.setState({ 
                Collection: false,
            }) 
        }
    }
    //评论点赞函数
    loveFun=(index,loveStatus,loveNumber) =>async()=>{
        let res=await Http.userXH({articleId:articleId,id:this.state.commentList[index].id})
        console.log(res.data.data)
        // console.log("用户点赞状态"+loveStatus)
        // // console.log(this.state.loveKey)
        // console.log(this.state.likeNumber)
        if(res.data.code==200){
            this.state.PageNum=1
            this.getComment(true); 
            console.log("喜欢成功")
        }else{
            console.log("失败")
        }
        
    }
    //结束输入
    handleEditingEnd = () => {
        this.setState({ showInput: false,text: ""})
    }
    //提交评论
    handleSubmit=async()=>{
        // const{text}=this.state.text
        // if(!text.trim()){
        //     console.log("评论不能为空");
        //     return;
        // }
        let res=await Http.insertComment({articleId:articleId,comment:this.state.text})
        console.log(res)
        console.log(res.data.code)
        // console.log(this.state.text)
        // console.log(articleId)
        this.handleEditingEnd()
        // this.setState({flag:!flag})
        if(res.data.code!=-1){
            this.state.PageNum=1
            this.getComment(true); 
            console.log("评论成功")
        }else{
            console.log("评论失败")
        }
    }

    render(){ 
        const {navigation}=this.props 
        const {commentList} = this.state ;
        // const {newCommentList} = this.state ;
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor="#F5F5F5" barStyle={"dark-content"} translucent={true}/>
                {/* 顶部导航栏 */}
                <View style={styles.tabNavigetion}>
                    <TouchableOpacity 
                        onPress={()=>{
                            navigation.goBack()
                        }}>
                        <Image style={styles.goBack} source={require('../../static/img/goBack.png')} />
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity 
                        onPress={()=>{
                            // navigation.goBack()
                        }}>
                        <Image style={styles.share} source={require('../../static/img/share.png')} />
                    </TouchableOpacity>
                </View>
                {/* 评论内容 */}
                <Text style={styles.commentTitle}>评论({commentList.length})</Text>
                {/* <View>
                    {
                        newCommentList = commentList.map((item)=>{
                            return{
                                ...item, love: false
                        }
                        })
                    }
                </View> */}
                <View style={{height:pxToDp(1050)}}>
                        <>
                            <FlatList
                            handleMethod = {({viewableItems}) => this.handleViewableItemsChanged(viewableItems)}
                            extraData={this.state}
                            refreshing={true}
                                onEndReached={this.onEndReached}
                                onEndReachedThreshold={0.1}
                                data={commentList}
                                keyExtractor={item => item.id+""}
                                renderItem={({item,index})=>
                                <>

                                    <View style={{flexDirection:"row",}}>
                                        <View>
                                            <Image style = {styles.portrait} source={require('../../static/img/portrait-1.png')} />
                                        </View>
                                        <View>
                                            <Text style = {styles.CommentUser}>{item.userName}</Text>
                                            {/* 评论开始 */}
                                                {/* 测试 */}
                                            <View>
                                                {/* <Text
                                                    style = {styles.Comment}
                                                    allowFontScaling={false}
                                                    numberOfLines={this.state.numLines}
                                                    onLayout={(event) => {
                                                        const height = Math.floor(event.nativeEvent.layout.height || 0);
                                                        // 第一次测量view的最大高度
                                                        if (this.state.maxHeight === 0) {
                                                            this.setState({
                                                            maxHeight: height,
                                                            numLines: 4
                                                        });
                                                        // 第二次当测量的最大高度>设置行数后的高度的时候，则需要展开按钮。
                                                        } else if (this.state.maxHeight > height) {
                                                            if (!this.state.showOpenDetail) {
                                                                this.setState({
                                                                    showOpenDetail: true,
                                                            });
                                                            }
                                                        }
                                                    }}
                                                    >
                                                        
                                                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                                                        测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本测试文本
                                                        测试文本测试文本测试文本测试文本测试文本测试文本
                                                        {item.comment}
                                                    </Text>
                                                    {this.state.showOpenDetail 
                                                    && (<TouchableOpacity
                                                        onPress={()=>{
                                                            console.log(this.state.numLines)
                                                            this.state.numLines=this.state.maxHeight
                                                            console.log(this.state.numLines)
                                                            console.log(this.state.maxHeight)
                                                        }}>
                                                        <Text>展开</Text></TouchableOpacity>
                                                    )} */}
                                                    
                                                {/* 测试结束 */}
                                            </View>
                                            <Text numberOfLines={4} ellipsizeMode="tail" style = {styles.Comment}>
                                                {item.comment}</Text>
                                            {/* 评论结束 */}
                                            <Text style = {styles.CommentTime}>{item.createAt}</Text>
                                        </View>
                                        <TouchableOpacity 
                                            style={{width:pxToDp(50),height:pxToDp(50),marginTop:pxToDp(62),marginLeft:pxToDp(-64)}}
                                            onPress={this.loveFun(index,this.state.commentList[index].status,this.state.commentList[index].likeNumber)}>
                                                {/* 操控数组里的status属性来控制点赞 status是否等于零 点击函数通过index更改对应的love this.commengList[index].status==1? a : b */}
                                            <Image style={styles.love} source={this.state.commentList[index].status==0 ? images.first_love : images.second_love} />
                                            {/* <Svg style={styles.love} svgXmlData={this.state.love ? user_Love_1 : user_Love_2} /> */}
                                        </TouchableOpacity>
                                        <Text style={{top:pxToDp(62)}}>{item.likeNumber}</Text>
                                        
                                    </View>                                                        

                                    {/* <Text>没有更多了</Text> */}
                                </>}
                            />
                        </>
                            
                </View>
                        <View style={styles.bottomView}>
                            {/* 发表评论 */}
                                <Text style={styles.textInput}
                                    onPress={() => this.setState({ showInput: true})}>发表评论</Text>
                                <Image style={styles.commentImg} source={require('../../static/img/commentImg.png')} />
                                {/* 文章点赞 */}
                                <TouchableOpacity 
                                    onPress={this.likeFun.bind()}
                                    style={{width:pxToDp(50),height:pxToDp(50),marginTop:pxToDp(10),marginLeft:pxToDp(90)}}
                                    >
                                <Image source={this.state.like ? images.first_like : images.second_like} />
                                </TouchableOpacity>
                                {/* 文章收藏 */}
                                <TouchableOpacity 
                                    style={{width:pxToDp(50),height:pxToDp(50),marginRight:pxToDp(56),marginTop:pxToDp(15)}}
                                    onPress={this.CollectionFun.bind()}
                                    >
                                <Image source={this.state.Collection ? images.first_Collection : images.second_Collection} />
                                </TouchableOpacity>
                        </View>
                        <Modal
                            visible={this.state.showInput}
                            transparent={true}
                            animationType="slide"
                        >
                            <TouchableOpacity
                                onPress={this.handleEditingEnd}
                                style={{flex:1,backgroundColor:"rgba(0,0,0,0.5)",position:"relative"}}>
                                <View style={{position:"absolute",bottom:0,alignContent:"center"}}>
                                    <View style={styles.commentBox}>
                                        <TextInput
                                            autoFocus
                                            style={styles.textInput_1}
                                            placeholder="友善发言，温暖评论区~"
                                            multiline={true}//输入多行
                                            enablesReturnKeyAutomatically={true}//键盘会在文本框内没有文字的时候禁用确认按钮
                                            onSubmitEditing={this.handleSubmit}
                                            value={this.state.text}
                                            onChangeText={t =>this.setState({text: t})}/>
                                        <Text
                                        onPress={this.handleSubmit}
                                        style={styles.submit}>发表</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Modal>

            </View>
        )
    }

}


const styles = StyleSheet.create ({
    tabNavigetion:{
        backgroundColor:"#F5F5F5",
        width:pxToDp(750),
        height:pxToDp(168),
        justifyContent:"space-around",
        flexDirection:"row"
    },
    goBack:{
        // marginLeft:pxToDp(24),
        marginTop:pxToDp(74)
    },
    title:{
        marginTop:pxToDp(84),
        fontSize:pxToDp(28)
    },
    share:{
        marginTop:pxToDp(82)
    },
    commentTitle:{
        fontSize:pxToDp(32),
        fontWeight: "bold",
        marginLeft:pxToDp(76),
        marginTop:pxToDp(60)
    },
    portrait:{
        marginLeft:pxToDp(76),
        marginTop:pxToDp(50),
    },
    CommentUser:{
        marginLeft:pxToDp(40),
        marginTop:pxToDp(80),
        fontSize:pxToDp(28)
    },
    Comment:{
        width:pxToDp(540),
        marginTop:pxToDp(40),
        fontSize:pxToDp(24)
    },
    CommentTime:{
        // marginLeft:pxToDp(435),
        color:"#999999"
    },
    love:{
        // marginTop:pxToDp(62),
        // marginLeft:pxToDp(-64)
    },
    bottomView:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center',
        position:"absolute",
        width:"100%",
        height:pxToDp(110),
        left:0,
        bottom:0,
        backgroundColor: "#F5F5F5",
        borderColor:"#E0DDDD",
        borderTopWidth: 1,

    },
    textInput:{
        borderRadius:15,
        width:pxToDp(454),
        height:pxToDp(64),
        backgroundColor:"#F2E4E5", 
        marginLeft:pxToDp(54),
        // marginTop:pxToDp(24),
        paddingTop:pxToDp(12),
        paddingLeft:pxToDp(98),
        fontSize:pxToDp(32),
        color:"#999999"
    },
    commentImg:{
        marginTop:pxToDp(4),
        marginLeft:pxToDp(-150)
    },
    commentBox:{
        width:pxToDp(750),
        height:pxToDp(398),
        backgroundColor:"#FFFFFF",
    },
    textInput_1:{
        width:pxToDp(656),
        height:pxToDp(262),
        fontSize:pxToDp(16),
        backgroundColor:"#E9E9E9",
        marginTop:pxToDp(36),
        marginLeft:pxToDp(48),
        fontSize:pxToDp(32),
        color:"#666666",
        paddingBottom:pxToDp(190),
        paddingLeft:pxToDp(56)
    },
    submit:{
        width:pxToDp(112),
        height:pxToDp(50),
        backgroundColor:"#E9E9E9",
        color:"#999999",
        fontSize:pxToDp(28),
        borderRadius:pxToDp(12),
        textAlign:"center",
        marginLeft:pxToDp(592),
        marginTop:pxToDp(28),
        paddingTop:pxToDp(4)
    }
});

const images = { 
    'first_love': require('../../static/img/like-3.png'), 
    'second_love': require('../../static/img/like-4.png'),
    'first_like': require('../../static/img/like-1.png'), 
    'second_like': require('../../static/img/like-2.png'), 
    'first_Collection': require('../../static/img/Collection-1.png'), 
    'second_Collection': require('../../static/img/Collection-2.png'), 
}; 