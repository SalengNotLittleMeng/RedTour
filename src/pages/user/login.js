import React, { Component }  from 'react';
import { View, Alert,Text, Image ,StatusBar,ImageBackground, StyleSheet,Button,TouchableOpacity} from 'react-native';
// import Login from './login';
import { CheckBox } from 'react-native-elements'

class Login extends Component {
  constructor(props){
    super(props)
    this.state={
        checked:true
    }
}
press = () => {
  this.setState({
    checked:true
  })
};
  render() {
      return (
      <View style={{flex: 1, alignItems: 'center'}}>
        
        <StatusBar backgroundColor="transparent" translucent={true}/>
        <Image 
        style={{flex:1,height:'100%'}}
        resizeMode="stretch"
        source={require('../imgc/onec.png')}>
        </Image>
        <Text style={{position:'absolute' ,marginTop:'30%'}}> 
            <Text style={LoginStyles.login}>
                     红 侣 </Text>  
        </Text> 

        <Text style={{position:'absolute',marginTop:600,color:'white'}}>
        
        
          第三方账号登录  
        </Text>
        <Text style={{position:'absolute',marginTop:625,color:'white',height:60}}>
            <Image style={{}} source={require('../imgc/qq.png')}></Image>   
            <Text>           </Text>
            <Image source={require('../imgc/weixin.png')}></Image>
            <Text>           </Text>
            <Image source={require('../imgc/weibo.png')}></Image>
        </Text>
        <Text style={{position:'absolute',marginTop:680,color:'white'}}>
                 <CheckBox
                    checked={this.state.checked}
                    checkedColor='white'
                   onPress={this.press}
                  style={{alignSelf:'center'}}
                />                  
        <Text>                                                                             </Text>
        </Text>
        <Text style={{position:'absolute',marginTop:690,color:'white'}}>
        <Text>      已阅读并同意<Text style={{color:'#DE2910'}}>《用户协议》</Text >和<Text style={{color:'#DE2910'}}>《隐私政策》</Text></Text>
        </Text>

      </View>
      )
  }
};

const LoginStyles = StyleSheet.create({   
  login:{
    fontSize:50 , 
    fontFamily: '华文新魏',
    color:'#DE2910'
  }
});

export default Login;