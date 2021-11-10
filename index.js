/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import NavigationHelper from './src/utils/navigationHelper';
import Http from './src/action/request';

NavigationHelper.init(NavigationHelper);
Http.init(Http);

AppRegistry.registerComponent(appName, () => App);
