import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button} from 'native-base';

export default function Landing({navigation}) {
  return (
    <View style={styles.parent}>
      <Text style={styles.welcomeText}>Welcome to ChatQ</Text>
      <Image
        style={styles.image}
        source={require('../assets/img/community.png')}
      />
      <View style={styles.textView}>
        <Text style={styles.textRead}>
          Read our Privacy Policy. Tap "Agree and continue" to
        </Text>
        <Text style={styles.textRead}>accept the Terms of Service</Text>
      </View>
      <View style={styles.btnView}>
        <Button
          onPress={() => navigation.navigate('Register')}
          style={styles.btn}
          block>
          <Text style={styles.btnText}>Agree and continue</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#101d25',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#d2d2d8',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 40,
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  textRead: {
    color: '#d2d2d8',
  },
  btnView: {
    marginTop: 20,
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },
  btn: {
    backgroundColor: '#00b09c',
  },
  btnText: {
    textTransform: 'uppercase',
    fontStyle: 'normal',
    fontWeight: 'bold',
    // color: '#d2d2d8',
    color: 'black',
  },
});
