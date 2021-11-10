import React, { Component }  from 'react';
import { View, Text, ScrollView,SafeAreaView,Image ,StatusBar,ImageBackground, StyleSheet,TouchableOpacity,TextInput,Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem,Avatar } from 'react-native-elements'
// import { } from 'react-native-elements'
// import { Input } from 'react-native-elements';
// import validator from './tools/validator';
 class Pfour extends Component {
 
    render() {
       
      return (    
        //    <View style={{height:60, backgroundColor:"white"}}>
        //     <TouchableOpacity
        //     onPress={this.context.goBack}
        //     style={{ marginLeft:20, marginTop:10 }}>
        //         <Text style={{}} >返回</Text>
        //     </TouchableOpacity>
        //     <Text style={{ textAlign: 'center',fontSize:16,marginTop:-10}}>"红色伴侣"用户服务协议{/* {this.props.title} */}
        //     </Text>
            
        // </View>
    <SafeAreaView style={styles.container}>
   <View style={ {flexDirection:'row',height:50,marginTop:10}}>
  <View style={ {flex:1}} >
  <Text 
   onPress={()=>this.props.navigation.navigate("Ptwo")}
  style={ {fontSize:16,marginLeft:15}}>  返回</Text>
      {/* <Text 
      style={{marginLeft:15,textAlign: 'center'}}
      onPress={()=>this.props.navigation.navigate("Pthree")}>返回</Text> */}
  {/* <Image
                    style={{marginLeft:15}}
                    source={require('../../../component/imgc/z.png')}></Image> */}
    
  </View>
  <View style={ {flex:1}}>
    <Text style={ {fontSize:16,textAlign: 'center'}}>"红色伴侣"用户服务协议</Text>
  </View>
  <View style={ {flex:1}}>
  </View>          
</View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
        引言{'\r\n'}{'\r\n'}

1.1编写目的【阐明编写手册的目的。指明读者对象。】{'\r\n'}{'\r\n'}
1.2项目背景【说明项目来源、委托单位、开发单位及主管部门】{'\r\n'}{'\r\n'}
1.3 定义【列出手册中使用的专门术语的定义和缩写词的原意】{'\r\n'}{'\r\n'}
1.4参考资料【列出有关资料的作者、标题、编号、发表日期、出版单位或资料来源，{'\r\n'}{'\r\n'}

可包括：a.项目的计划任务书、合同或批文；b.项目开发计划；C. 需求规格说

明书；d.概要设计说明书；e。详细设计说明书；f.测试计划；g。手册中引用

的其他资料、采用的软件工程标准或软件工程规范。】

2. 软件概述

2.1目标

2.2功能

2.3 性能

a.数据精确度【包括输入、输出及处理数据的精度】

b.时间特性【如响应时间、处理时间、数据传输时间等。】

c.灵活性【在操作方式、运行环境需做某些变更时软件的适应能力。】

3. 运行环境

3.1硬件【列出软件系统运行时所需的硬件最小配置，如a. 计算机型号、主存容量；b.

外存储器、媒体、记录格式、设备型号及数量；c。输入、输出设备；d.数据传输设

备及数据转换设备的型号及数量。】

3.2支持软件【如：a。操作系统名称及版本号；b. 语言编译系统或汇编系统的名称及版

本号；C。数据库管理系统的名称及版本号；d.其他必要的支持软件。】

4. 使用说明

4.1安装和初始化【给出程序的存储形式、操作命令、反馈信息及其含意、表明安装完成

的测试实例以及安装所需的软件工具等。】

4.2输入【给出输入数据或参数的要求。】

4.2.1数据背景【说明数据来源、存储媒体、出现频度、限制和质量管理等。】

4.2.2数据格式【如：a。长度；b.格式基准；C，标号；d.顺序；e。分隔符；f.

词汇表；g. 省略和重复；h.控制。】

4.2.3输入举例

4.3输出【给出每项输出数据的说明】

4.3.l数据背景【说明输出数据的去向使用频度、存放媒体及质量管理等。】

4.3.2数据格式【详细阐明每一输出数据的格式，如：首部、主体和尾部的具体形式。】

4.3.3举例

4.4出错和恢复【给出：a。出错信息及其含意；b.用户应采取的措施，如修改、恢复、

再启动.】

4.5求助查询【说明如何操作】

5. 运行说明

5.1运行表【列出每种可能的运行情况，说明其运行目的。】

5.2运行步骤【按顺序说明每种运行的步骤，应包括：】

5.2.1运行控制

5.2.2操作信息

a. 运行目的；b.操作要求；C。启动方法; d.预计运行时间；e。操作命令格

式及格式说明；f.其他事项。

5.2.3输入／输出文件【给出建立或更新文件的有关信息，如：】

a.文件的名称及编号；b.记录媒体；C。存留的目录；d.文件的支配

【说明确定保留文件或废弃文件的准则，分发文件的对象，占用硬件的优先

级及保密控制等.】

5.2.4启动或恢复过程

6. 非常规过程

【提供应急或非常规操作的必要信息及操作步骤，如出错处理操作、向后备系统切换操作以

及维护人员须知的操作和注意事项。】

7. 操作命令一览表

【按字母顺序逐个列出全部操作命令的格式、功能及参数说明。】

8. 程序文件（或命令文件）和数据文件一览表

【按文件名字母顺序或按功能与模块分类顺序逐个列出文件名称、标识符及说明。】

9. 用户操作举例

作者：李白端了一碗汤
链接：https://www.jianshu.com/p/b30c80f6a05d
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
        </Text>
      </ScrollView>
    </SafeAreaView>
      );
    }
  }
  const styles = StyleSheet.create({
    one: {
      color:"red"
    },
    two:{
      
    },
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
      },
    scrollView: {
        // backgroundColor: 'white',
        marginHorizontal: 10,
      },
      text: {
        fontSize: 18,
        color:"#000000"
      },
  });
export default Pfour;