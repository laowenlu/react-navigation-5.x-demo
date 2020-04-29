import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '../../components';
import navigationHelper from '../../navigation/navigationHelper';

function Test() {

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
