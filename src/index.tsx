import React, { PureComponent } from 'react';
import { View, StatusBar } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

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
      <View style={{ flex: 1 }}>
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
