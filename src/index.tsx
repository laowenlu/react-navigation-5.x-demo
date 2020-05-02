import React, { PureComponent } from 'react';
import { View, StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import 'react-native-gesture-handler';
import { width } from './styles/size';

const _dev = __DEV__;

declare const global: any;
if (!_dev) {
  // 去掉console
  global.console = {
    log: () => { },
    info: () => { },
    error: () => { },
    warn: () => { },
    group: () => { },
    groupEnd: () => { },
    groupCollapsed: () => { },
    assert: () => { },
  };
}

class App extends PureComponent<any, any> {

  render() {
    return (
      <View style={{ flex: 1, width: width }}>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          showHideTransition={'fade'}
          barStyle={'light-content'}
        />
        <AppNavigator />
      </View>
    );
  }
}

export default App;
