import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {Thumbnail} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import action from '../redux/actions/getchat';
import jwt from 'jwt-decode';

const ChatView = ({data, navigation, user}) => {
  return (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate('ChatRoom', {
          id: `${data.senderId !== +user ? data.senderId : data.recipientId}`,
          user: user,
          data: {
            username: `${
              data.senderId !== +user
                ? data.sender.username
                : data.recipient.username
            }`,
            avatar: `${
              data.senderId !== +user
                ? data.sender.avatar
                : data.recipient.avatar
            }`,
            phoneNumber: `${
              data.senderId !== +user
                ? data.sender.phoneNumber
                : data.recipient.phoneNumber
            }`,
          },
        })
      }>
      <View style={styles.viewContainer}>
        <View style={styles.contentDisplay}>
          <Thumbnail source={require('../assets/img/default_user.png')} />
          <View style={styles.contentText}>
            <View style={styles.userInfo}>
              <Text numberOfLines={1} style={styles.userName}>
                {data.senderId !== +user
                  ? data.sender.username
                  : data.recipient.username}
              </Text>
              <Text style={styles.date}>12-01-2019</Text>
            </View>
            <Text numberOfLines={1} style={styles.chat}>
              {data.content}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default function Chats({navigation}) {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.getchat.data);
  const token = useSelector((state) => state.auth.token);
  const user = jwt(token);
  useEffect(() => {
    dispatch(action.getChat(token));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chatList}
        renderItem={({item}) => (
          <ChatView data={item} navigation={navigation} user={user.aud} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingLeft: 16,
    paddingRight: 16,
  },
  viewContainer: {
    marginTop: 10,
  },
  contentDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentText: {
    borderBottomColor: '#9b9b9b',
    borderStyle: 'solid',
    borderWidth: 0.3,
    flexGrow: 1,
    flexDirection: 'column',
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: 15,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    color: 'white',
    fontSize: 19,
  },
  date: {
    color: '#9b9b9b',
    fontSize: 12,
  },
  chat: {
    color: '#9b9b9b',
    fontSize: 16,
    marginTop: 5,
    width: 236,
  },
});
