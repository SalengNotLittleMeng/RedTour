import React,{Component} from 'react'
import {
    View,
    Text,
    Button,
    StatusBar,
    TextInput,StyleSheet,TouchableOpacity,ScrollView,
    Image,
} from 'react-native'
import { pxToDp } from '../../utils/pxToDp'
import axios from 'axios';

export default class Comment extends Component{
    constructor (props) { 
        super(props); 
        
        this.state = { 
            love:true,
            like: true,
            Collection: true,
            params:{
                current:1,
            },
            current:1,
        }; 
        title = this.props.route.params.title;
        id = this.props.route.params.id;
        
    } 
    componentDidMount(){
        this.getComment(); 
    }

    //获取评论详情
    getComment(){
        // console.log(id);
        // console.log(title);
        axios.post("http://49.233.252.20:8085/comment/commentsRoot/commentrecord",{id}+this.state.params).then(res=>{
            console.log(res) 
            console.log(current) 
        },err=>{console.log(err);console.log(this.state.params) })
    }
    render(){ 
        const {navigation}=this.props 
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

                <ScrollView>
                <View>
                    <Text style={styles.commentTitle}>评论（467）</Text>
                    <View style={{flexDirection:"row",}}>
                        <View>
                            <Image style = {styles.portrait} source={require('../../static/img/portrait-1.png')} />
                        </View>
                        <View>
                            <Text style = {styles.CommentUser}>啊~Greek</Text>
                            <Text style = {styles.Comment}>这是一个引人注目的地方，一个再也不会被忘记的地方。</Text>
                            <Text style = {styles.CommentTime}>2021-07-09</Text>
                        </View>
                        <TouchableOpacity 
                            onPress={()=>this.setState({ 
                                love: !this.state.love,
                            })}>
                        <Image style={styles.love} source={this.state.love ? images.first_love : images.second_love} />
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{flexDirection:"row",}}>
                        <View>
                            <Image style = {styles.portrait} source={require('../../static/img/portrait-1.png')} />
                        </View>
                        <View>
                            <Text style = {styles.CommentUser}>啊~Greek</Text>
                            <Text style = {styles.Comment}>这是一个引人注目的地方，一个再也不会被忘记的地方。</Text>
                            <Text style = {styles.CommentTime}>2021-07-09</Text>
                        </View>
                        <TouchableOpacity 
                            onPress={()=>this.setState({ 
                                love: !this.state.love,
                            })}>
                        <Image style={styles.love} source={this.state.love ? images.first_love : images.second_love} />
                        </TouchableOpacity>
                        
                    </View>
                </View>
                </ScrollView>
                <View style={styles.bottomView}>
                        <TextInput style={styles.textInput} placeholder="发表评论" />
                        {/* <Text style={styles.textInput}>发表评论</Text> */}
                        <Image style={styles.commentImg} source={require('../../static/img/commentImg.png')} />


                        <TouchableOpacity 
                            onPress={()=>this.setState({ 
                                like: !this.state.like,
                            })}>
                        <Image style={styles.like} source={this.state.like ? images.first_like : images.second_like} />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            onPress={()=>this.setState({ 
                                Collection: !this.state.Collection,
                            })}>
                        <Image style={styles.Collection} source={this.state.Collection ? images.first_Collection : images.second_Collection} />
                        </TouchableOpacity>

                </View>
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
    },
    Comment:{
        width:pxToDp(540),
        marginTop:pxToDp(40)
    },
    CommentTime:{
        marginLeft:pxToDp(416)
    },
    love:{
        marginTop:pxToDp(62),
        marginLeft:pxToDp(-64)
    },
    bottomView:{
        // flex:1,
        // alignItems:'center',
        backgroundColor:"#F5F5F5",
        width:pxToDp(750),
        height:pxToDp(146),
        marginTop:pxToDp(-110),
        borderColor:"#E0DDDD",
        borderTopWidth: 1,
        // position:
    },
    textInput:{
        borderRadius:15,
        width:pxToDp(454),
        height:pxToDp(74),
        backgroundColor:"#F2E4E5",
        marginLeft:pxToDp(54),
        marginTop:pxToDp(34),
        paddingTop:pxToDp(14),
        paddingLeft:pxToDp(98),
        fontSize:pxToDp(32),
    },
    commentImg:{
        marginTop:pxToDp(-50),
        marginLeft:pxToDp(414)
    },
    like:{
        marginLeft:pxToDp(564),
        marginTop:pxToDp(-36),
    },
    Collection:{
        marginLeft:pxToDp(648),
        marginTop:pxToDp(-46),
    },
});

const images = { 
    'first_love': require('../../static/img/like-3.png'), 
    'second_love': require('../../static/img/like-4.png'),
    'first_like': require('../../static/img/like-1.png'), 
    'second_like': require('../../static/img/like-2.png'), 
    'first_Collection': require('../../static/img/Collection-1.png'), 
    'second_Collection': require('../../static/img/Collection-2.png'), 
}; 