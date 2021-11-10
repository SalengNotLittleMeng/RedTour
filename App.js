import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import Nav from './src/router/nav';
import {Provider} from 'mobx-react';
import RootStore from './src/mobx/index';
import './src/utils/fontUtils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Provider RootStore={RootStore}>
          <Nav />
        </Provider>
      </View>
    );
  }
}

export default App;
