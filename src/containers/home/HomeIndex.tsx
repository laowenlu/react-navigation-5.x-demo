import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components';
import navigationHelper from '../../navigation/navigationHelper';

function HomeIndex(props) {

  useEffect(() => {
    console.log('------------ HomeIndex');
    navigationHelper.getParams();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title={'push test'}
        onPress={() => {
          navigationHelper.push('test');
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

export default HomeIndex;
