import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationState, NavigationScreenProp } from 'react-navigation';
import { TitleButton, Button } from '../../components';
import navigationHelper from '../../navigation/navigationHelper';

MineIndex.navigationOptions = ({ navigation }: { navigation: NavigationScreenProp<NavigationState> }) => {
  const _title = navigation.getParam('title');
  return _title ? { headerTitle: _title } : {};
};

function MineIndex(props) {

  useEffect(() => {
    console.log('------------ MineIndex');
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
