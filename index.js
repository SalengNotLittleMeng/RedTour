/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import NavigationHelper from './src/utils/navigationHelper';
import Http from './src/action/request';

NavigationHelper.init(NavigationHelper);
Http.init(Http);

AppRegistry.registerComponent(appName, () => App);

//    <application>
//     <meta-data
//         android:name="com.amap.api.v2.apikey"
//         android:value="c812f0c34d0f0d829e73859b16ee4a44" />
//     </application>