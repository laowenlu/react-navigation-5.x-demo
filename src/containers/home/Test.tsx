import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, TitleButton } from '../../components';
import navigationHelper from '../../navigation/navigationHelper';

function Test({ navigation, route }) {

  navigation.setOptions({
    headerRight: _props => (
      <TitleButton
        titleStyle={{ fontSize: px2dp(32), color: '#fff' }}
        showArrow={false}
        title={'协议'}
        onPress={() => {
          navigationHelper.push('setting');
        }}
        {..._props}
      />
    ),
  });

  return (
    <View style={styles.container}>
      <Button title={'push mineTwo'}
        onPress={() => {
          navigationHelper.push('mineTwo');
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Test;
