import React, { Component }  from 'react';
import { View, Alert,Text, Image ,StatusBar,ImageBackground, StyleSheet,Button,TouchableOpacity} from 'react-native';
import Login from './login';
// import DeviceInfo from 'react-native-device-info';
// import { CheckBox } from 'react-native-elements'

class Loginone extends Component {
  state={
    phone:" ",
    phones:''
  }
press=()=>{
console.log("一键登录");
console.log("xxx");
}
  onpress = () => {
    this.props.navigation.navigate("Logintwo");
  };
  render() {
        const { phone } = this.state;
        return (
          
          <View style={styles.containerr}>
          <Login></Login>
            <View style={styles.container}>
              <View style={styles.countContainer}>
              <Text  style={styles.number}>{phone}</Text>
              </View>
              
              <TouchableOpacity
                activeOpacity={0.7}//点击时的透明度
                style={styles.buttonone}
                onPress={this.press}
                // onPress={()=>navigation.navigate("Alerts")}//一键登录
              >
                <Text style={styles.textone}
                
                
                >本机号码一键登录</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}//点击时的透明度
                style={styles.buttontwo}
                onPress={this.onpress}
              >
                <Text style={styles.texttwo}>手机号码登录</Text>
              </TouchableOpacity>
            </View>

            {/* // <View style={ {flexDirection:'row',marginBottom:50}}> */}
            {/* //      <View style={ {flex:1,marginLeft:40}} > */}
            {/* //       <Text style={{color:'white'}}> */}
            {/* //                     <CheckBox */}
            {/* //                      checked={this.state.checked} */}
            {/* //                      checkedColor='white' */}
            {/* //                      onPress={this.press} */}
            {/* //                      style={{alignSelf:'center'}} */}
            {/* //                    />                   */}
                              {/* <Text>                                                                    </Text> */}
            {/* //       </Text> */}
            {/* //  </View> */}
            {/* //  <View style={ {flex:7}}> */}
            {/* //  <Text style={{color:'white',marginTop:12,marginLeft:-20}}> */}
            {/* //          <Text>      已阅读并同意<Text style={{color:'#DE2910'}}>《用户协议》</Text >和<Text style={{color:'#DE2910'}}>《隐私政策》</Text></Text> */}
            {/* //          </Text> */}
               
            {/* //     </View> */}
          
            {/* //  </View> */}
       
            </View>
        );
  }
}            
            
const styles = StyleSheet.create({
  number:{
    color:'#666666',fontSize:25
  },
  textone:{
    fontSize:18,color:'white',fontWeight:'bold'
  },
  texttwo:{
    fontSize:18,color:'#666666',fontWeight:'bold'
  },
  containerr: {
    flex: 1,
    justifyContent: "center",
    
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf:'center',
    position:'absolute'
  },
  buttonone: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 13,
    marginTop:20,
    width:250,
    alignSelf:'center',
    backgroundColor:'#DE2910',
    justifyContent:'center',
    borderRadius: 10//按钮圆角
  },
  buttontwo: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 13,
    marginTop:20,
    width:250,
    alignSelf:'center',
    backgroundColor:'white',
    justifyContent:'center',
    borderRadius: 10//按钮圆角
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  }
});

export default Loginone;

