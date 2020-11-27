import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Form, Item, Input} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Otp({navigation, route}) {
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (otp.length === 6) {
      navigation.navigate('SetProfile');
    }
  }, [otp]);

  return (
    <View style={styles.parent}>
      {console.log(otp)}
      <Text style={styles.des1}>
        Waiting to automaticcly detect an SMS sent to
      </Text>
      <View style={styles.desView}>
        <Text style={styles.textNumber}>{route.params.data} </Text>
        <Text style={styles.textWrong}>Wrong number</Text>
      </View>
      <Form style={styles.from}>
        <Item style={styles.item}>
          <Input
            style={styles.input}
            placeholder="- - -  - - -"
            placeholderTextColor="grey"
            keyboardType="numeric"
            onChangeText={(text) => setOtp(text)}
          />
        </Item>
      </Form>
      <Text style={styles.textCon}>Enter 6-digit code</Text>
      <View style={styles.waitView}>
        <Icon name="message-processing" color="grey" size={25} />
        <Text style={styles.resendText}>Resend SMS</Text>
        <Text style={styles.textTime}>1.00</Text>
      </View>
      <View style={styles.hr} />
      <View style={styles.waitView}>
        <Icon name="phone" color="grey" size={25} />
        <Text style={styles.textCallme}>Call me</Text>
        <Text style={styles.textTime}>1.00</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#101d25',
    alignItems: 'center',
    paddingTop: 10,
  },
  desView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  des1: {
    color: '#d2d2d8',
  },
  textNumber: {
    color: '#d2d2d8',
    fontWeight: 'bold',
  },
  textWrong: {
    color: '#609cc7',
  },
  from: {
    width: '50%',
  },
  item: {
    borderBottomColor: '#00b09c',
    borderBottomWidth: 2,
  },
  input: {
    color: '#d2d2d8',
    paddingLeft: 20,
  },
  textCon: {
    color: 'grey',
    marginTop: 15,
    fontSize: 15,
    marginLeft: 15,
  },
  waitView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  resendText: {
    color: 'grey',
    fontSize: 16,
    marginLeft: 20,
    flex: 1,
  },
  textTime: {
    color: 'grey',
  },
  hr: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    width: '80%',
    marginTop: 20,
  },
  textCallme: {
    color: 'grey',
    fontSize: 16,
    marginLeft: 20,
    flex: 1,
  },
});
