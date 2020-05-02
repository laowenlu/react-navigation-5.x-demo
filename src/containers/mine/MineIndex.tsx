import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TitleButton, Button } from '../../components';
import navigationHelper from '../../navigation/navigationHelper';

function MineIndex({ navigation, route }) {
  console.log('-------======');
  console.log(navigation);

  // tab页的导航栏参数不能这样动态设置
  // navigation.setOptions({
  //   headerRight: _props => (
  //     <TitleButton
  //       titleStyle={{ fontSize: px2dp(32), color: '#fff' }}
  //       showArrow={false}
  //       title={'设置'}
  //       onPress={() => {
  //         navigationHelper.push('setting', { myKey: 'myValue' });
  //       }}
  //       {..._props}
  //     />
  //   ),
  // });

  useEffect(() => {
    console.log('------------ MineIndex');

    // 可以这样设置导航栏右边按钮
    const _headerRight = _props => (
      <TitleButton
        titleStyle={{ fontSize: px2dp(32), color: '#fff' }}
        showArrow={false}
        title={'设置'}
        onPress={() => {
          navigationHelper.push('setting', { myKey: 'myValue' });
        }}
        {..._props}
      />
    );
    navigationHelper.setParams({ headerRight: _headerRight });

  }, []);

  return (
    <View style={styles.container}>
      <Button
        title={'更换标题'}
        onPress={() => {
          navigationHelper.setParams({ title: '改标题' });
        }}
      />
      <Button
        title={'带参数 push setting'}
        onPress={() => {
          navigationHelper.push('setting', { myKey: 'myValue' });
        }}
      />
      <Text style={{ left: 0, top: 0, position: 'absolute' }}>顶部文字</Text>
      <Text style={{ left: 0, bottom: 0, position: 'absolute' }}>底部文字</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MineIndex;
