import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

function SocialIndex() {

  useEffect(() => {
    console.log('------- SocialIndex');
  });

  return (
    <View style={styles.container}>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
});

export default SocialIndex;
