import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Status() {
  return (
    <View style={styles.parent}>
      <Text>Status</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  parent:{
    flex: 1,
    backgroundColor: '#101d25',
  }
})