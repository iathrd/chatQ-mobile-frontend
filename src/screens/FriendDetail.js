import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Switch} from 'react-native';
import {Container, Content} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Fontisto';
import {API_URL} from '@env';

export default function FriendDetail({route}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <Container>
      <Content style={styles.parent}>
        <View style={styles.imagerapper}>
          <Image
            style={styles.image}
            source={{uri: `${API_URL}${route.params.data.avatarw}`}}
          />
        </View>
        <View style={styles.content1}>
          <View style={styles.content11}>
            <Text style={styles.text1}>Mute notifications</Text>
            <Switch
              trackColor={{false: '#767577', true: '#00b09c'}}
              thumbColor={isEnabled ? '#00b09c' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.content11}>
            <Text style={styles.text1}>Custom notification</Text>
          </View>
          <View style={styles.contentBottom}>
            <Text style={styles.text1}>Media visibility</Text>
          </View>
        </View>
        <View style={styles.content2}>
          <Text style={styles.text1}>Encryption</Text>
          <View style={styles.encryptedWrapper}>
            <View>
              <Text style={styles.text2}>
                Message and calls are end-to-end encrypted
              </Text>
              <Text style={styles.text2}>Tap to verify</Text>
            </View>
            <Icon name="lock" color="#9b9b9b" size={25} />
          </View>
        </View>
        <View style={styles.content2}>
          <Text style={styles.colorText}>About and phone number</Text>
          <View style={styles.statusWrapper}>
            <Text style={styles.text1}>
              Di saat aku berlari di situlah intput text ...
            </Text>
            <Text style={styles.text2}>March 8,2018</Text>
          </View>
          <View style={styles.phoneWrapper}>
            <View>
              <Text style={styles.text1}>{route.params.data.phoneNumber}</Text>
              <Text style={styles.text2}>Mobile</Text>
            </View>
            <Icon name="message-reply-text" color="#00b09c" size={25} />
          </View>
        </View>
        <View style={styles.content1}>
          <View style={styles.dangerView}>
            <Icon name="block-helper" color="rgba(239,105,124,0.7)" size={20} />
            <Text style={styles.textDanger}>Blok</Text>
          </View>
        </View>
        <View style={styles.content1}>
          <View style={styles.dangerView}>
            <Icon2 name="dislike" color="rgba(239,105,124,0.7)" size={20} />
            <Text style={styles.textDanger}>Report contact</Text>
          </View>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: 'black',
    flex: 1,
  },
  imagerapper: {
    height: 300,
    borderBottomColor: 'black',
    borderStyle: 'solid',
    borderBottomWidth: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text1: {
    color: '#d2d2d8',
    fontSize: 18,
  },
  content1: {
    backgroundColor: '#101d25',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
  },
  content11: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(155,155,155,0.5)',
    borderBottomWidth: 0.5,
    paddingBottom: 20,
    paddingTop: 20,
  },
  contentBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 20,
  },
  content2: {
    backgroundColor: '#101d25',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  encryptedWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text2: {
    color: '#9b9b9b',
  },
  colorText: {
    color: '#00b09c',
    fontSize: 17,
  },
  statusWrapper: {
    borderBottomColor: 'rgba(155,155,155,0.5)',
    borderBottomWidth: 0.5,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  phoneWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dangerView: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  textDanger: {
    color: 'rgba(239,105,124,0.7)',
    fontSize: 20,
    marginLeft: 20,
  },
});
