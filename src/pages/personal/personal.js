import React, {Component,useState} from 'react';
import {View, Text} from 'react-native';
import {inject,observer} from "mobx-react";
import RootStore from '../../mobx/index';
@inject('RootStore')
@observer

class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  press= async ()=>{
    this.props.navigation.navigate("Pone");
    let res =await  Http.personaldata({});
    console.log(res);
    // console.log(11111111,res.data.data);
      //  const _birthday =res.data.data.birthday;
        this.props.RootStore.userStore.infoSet(res.data.data);
        console.log(11111,RootStore.userStore.allData.birthday);
  }
  // press= ()=>{
  //   this.props.navigation.navigate("Pone");

  // }
  render() {
    return (
      <View>
        <Text
        onPress={()=>this.press()}
        style={{ justifyContent: "center",
        alignSelf:'center',marginTop:200,fontSize:30 }}
        >个人中心</Text>        
      </View>
    );
  }
}
export default  Personal;

// import React, { Component }  from 'react';
// import { View, Text, Image ,StatusBar,ImageBackground, StyleSheet,TouchableOpacity,TextInput,Button} from 'react-native';
// // import { ListItem,Input,Avatar } from 'react-native-elements'
// // import ImagePicker from 'react-native-image-crop-picker';
// // import { } from 'react-native-elements'
// // import { Input } from 'react-native-elements';
// // import validator from './tools/validator';
//  class Pone extends Component {
//   state = {
//    show:'false'
//   }
//   onpress = () => {
//     this.props.navigation.navigate("Ptwo")
//   };
//   nicheng =() =>{
//     console.log("ddd");
//   this.nichengc();
//   }
//   nichengc =() =>{
//     return  <View style={styles.two}>
//         <View>
//     </View>
//        {/* 修改昵称 */}
//        <Input
//        placeholder="  密码长度6-12位"
//        // underlineColorAndroid='#666666'
//        //  style={{ height: 60,fontSize:20,width:220,marginTop:15,marginBottom:0}}
//        //  onChangeText={this.passwordChange}
//        // value={value}
//        />
//        </View>
//   }
  
//     render() {     

//         //  <View style={{height:50, backgroundColor:"white"}}>
//         //         <TouchableOpacity
//         //         onPress={this.context.goBack}
//         //         style={{ marginLeft:20, marginTop:10 }}>
//         //             <Text style={{}} >返回</Text>
//         //         </TouchableOpacity>
//         //         <Text style={{ textAlign: 'center',fontSize:16,marginTop:-10}}>个人信息{/* {this.props.title} */}</Text>
//         //     </View>
//       return (
//         <View >
//             {/* 导航 */}
//             <View style={ {flexDirection:'row',height:50,marginTop:10}}>
//                 <View style={ {flex:1}} >
//                   <Text 
//                onPress={()=>this.props.navigation.navigate("Ptwo")}
//               style={ {fontSize:16,marginLeft:15}}>  返回</Text>
//       {/* <Text 
//       style={{marginLeft:15,textAlign: 'center'}}
//       onPress={()=>this.props.navigation.navigate("Pthree")}>返回</Text> */}
//   {/* <Image
//                     style={{marginLeft:15}}
//                     source={require('../../../component/imgc/z.png')}></Image> */}
    
//                  </View>
//                 <View style={ {flex:1}}>
//                   <Text style={ {fontSize:18,textAlign: 'center'}}>个人信息</Text>
//                 </View>
//                 <View style={ {flex:1}}>
//                 </View>
//                 </View>
//         {/* 导航 */}
        
//           <View style={{alignItems: 'center', justifyContent: 'center',paddingTop:10}}>
//             {/* <Text onpress={this.touxiang}>修改头像</Text> */}
//           <Avatar
//               rounded
//               size={100}
//               onPress={() => console.log("Works!")}
//               source={require('../imgc/two.png')}
//           />
//           </View>

//           <View style={{textAlign: 'center'}}>

//          </View>
//             <View style={{paddingTop:30}}>
//                   <ListItem  bottomDivider>
//                       <Image
//                     style={{}}
//                     source={require('../imgc/a.png')}></Image>
//                      <ListItem.Content>
//                         <ListItem.Title>我的足迹</ListItem.Title>
                     
//                      </ListItem.Content>  
          
//                     <ListItem.Chevron />
//                  </ListItem>
            
//             <ListItem bottomDivider
//               rightTitle={'222'}>
//                   <Image
//                     style={{}}
//                     source={require('../imgc/b.png')}></Image>
//                    <ListItem.Content>
//                         <ListItem.Title>我的点赞</ListItem.Title>
                 
//                      </ListItem.Content>
                    
//                     <ListItem.Chevron /> 
//             </ListItem>
//             <Text>  </Text>
//             <ListItem bottomDivider 
//            onPress={()=>this.props.navigation.navigate("Nicheng")}
//             style={{ }}>
//                   <Image
//                     source={require('../imgc/c.png')}></Image>
//                     <ListItem.Content>
//                         <ListItem.Title>用户名称</ListItem.Title>
//                      </ListItem.Content>
//                      <ListItem.Subtitle >CCC</ListItem.Subtitle>
//                     <ListItem.Chevron />  
//             </ListItem>
//             <ListItem bottomDivider>
//                   <Image
//                     style={{}}
//                     source={require('../imgc/d.png')}></Image>
//                   <ListItem.Content>
//                         <ListItem.Title>职业</ListItem.Title>

//                      </ListItem.Content>
//                      <ListItem.Subtitle >学生</ListItem.Subtitle>
//                     <ListItem.Chevron /> 
//             </ListItem>
//             <ListItem bottomDivider>
//                   <Image
//                     style={{}}
//                     source={require('../imgc/e.png')}></Image>
//                   <ListItem.Content>
//                         <ListItem.Title>生日</ListItem.Title>

//                      </ListItem.Content>
//                      <ListItem.Subtitle >2000-00-00</ListItem.Subtitle>
//                     <ListItem.Chevron /> 
//             </ListItem>
//             <ListItem bottomDivider>
//                   <Image
//                     style={{}}
//                     source={require('../imgc/f.png')}></Image>
//                   <ListItem.Content>
//                         <ListItem.Title>手机号码</ListItem.Title>

//                      </ListItem.Content>
//                      <ListItem.Subtitle >15235684045</ListItem.Subtitle>
//                     <ListItem.Chevron /> 
//             </ListItem>
//             <Text>  </Text>
//             <ListItem bottomDivider 
            
//             // style={{ paddingTop: 10}}
//             onPress={()=>this.onpress()}
//             >
//                   <Image
//                     style={{marginLeft:-5}}
//                     source={require('../imgc/g.png')}></Image>
//                   <ListItem.Content>
//                         <ListItem.Title>设置</ListItem.Title>

//                      </ListItem.Content>
//                     <ListItem.Chevron /> 
//             </ListItem>
//             </View>

//         </View>
//       );
//     }
//   }
//   const styles = StyleSheet.create({
//     two: {
//       paddingTop:250,
//       height:500,
//       flex: 1, 
//       alignItems: 'center' ,
//       position:'absolute'
//     }
//   });
// export default Pone;