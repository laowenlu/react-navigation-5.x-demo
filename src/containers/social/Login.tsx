import React, { PureComponent } from 'react';
import {
  View, Text,
} from 'react-native';
import { Button } from '../../components';
import navigationHelper from '../../navigation/navigationHelper';

class Login extends PureComponent<any, any> {

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>请先登录</Text>
        <Button
          title="关闭页面, pop退出"
          onPress={() => {
            navigationHelper.pop();
          }}
        />
      </View>
    );
  }
}

export default Login;
