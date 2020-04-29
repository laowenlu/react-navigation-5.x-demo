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
