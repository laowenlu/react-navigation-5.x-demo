import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '../../components';
import navigationHelper from '../../navigation/navigationHelper';

function HomeIndex(props) {

  useEffect(() => {
    console.log('------------ HomeIndex');
    // navigationHelper.getParams();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title={'push test'}
        onPress={() => {
          navigationHelper.push('test');
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
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeIndex;
