import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import navigationHelper from '../../navigation/navigationHelper';
import { Button } from '../../components';

function MineTwo() {

  useEffect(() => {
    navigationHelper.backHandle(() => {
      navigationHelper.popTo('setting');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>MineTwo</Text>
      <Button
        title={'回顶层 popToTop'}
        onPress={() => {
          navigationHelper.popToTop();
        }}
      />
      <Button
        title={'reset test'}
        onPress={() => {
          navigationHelper.reset('test');
        }}
      />
      <Button
        title={'reset home'}
        onPress={() => {
          navigationHelper.reset('index');
        }}
      />
      <Button
        title={'navigate mine'}
        onPress={() => {
          navigationHelper.navigate('mine');
        }}
      />
      <Button
        title={'goback'}
        onPress={() => {
          navigationHelper.goBack();
        }}
      />
      <Button
        title={'popTo index'}
        onPress={() => {
          navigationHelper.popTo('index');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MineTwo;
