import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Thumbnail} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import action from '../redux/actions/getchat';
import jwt from 'jwt-decode';
import getMessage from '../redux/actions/getmessage';
import saveMessageAction from '../redux/actions/saveMessage';
import {API_URL} from '@env';
import moment from 'moment';

const ChatView = ({data, navigation, user}) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const coba = useSelector((state) => state.saveMessage.data.data);

  const moveScreen = async (id) => {
    let curentId = 0;
    if (coba.length) {
      const {senderId, recipientId} = coba[0];
      curentId = `${senderId !== +user ? senderId : recipientId}`;
    }
    if (curentId !== id) {
      let message = await dispatch(getMessage.getMessage(token, id));
      message = message.action.payload.data;
      dispatch(saveMessageAction.saveMessage(message));
      navigation.navigate('ChatRoom', {
        id: `${data.senderId !== +user ? data.senderId : data.recipientId}`,
        user: {user: user},
        data: {
          username: `${
            data.senderId !== +user
              ? data.sender.username
              : data.recipient.username
          }`,
          avatar: `${
            data.senderId !== +user ? data.sender.avatar : data.recipient.avatar
          }`,
          phoneNumber: `${
            data.senderId !== +user
              ? data.sender.phoneNumber
              : data.recipient.phoneNumber
          }`,
        },
      });
    } else {
      navigation.navigate('ChatRoom', {
        id: `${data.senderId !== +user ? data.senderId : data.recipientId}`,
        user: {user: user},
        data: {
          username: `${
            data.senderId !== +user
              ? data.sender.username
              : data.recipient.username
          }`,
          avatar: `${
            data.senderId !== +user ? data.sender.avatar : data.recipient.avatar
          }`,
          phoneNumber: `${
            data.senderId !== +user
              ? data.sender.phoneNumber
              : data.recipient.phoneNumber
          }`,
        },
      });
    }
  };
  return (
    <TouchableOpacity
      onPress={() =>
        moveScreen(
          `${data.senderId !== +user ? data.senderId : data.recipientId}`,
        )
      }>
      <View style={styles.viewContainer}>
        <View style={styles.contentDisplay}>
          <Thumbnail
            source={{
              uri: `${API_URL}${
                data.senderId !== +user
                  ? data.sender.avatar
                  : data.recipient.avatar
              }`,
            }}
          />
          <View style={styles.contentText}>
            <View style={styles.userInfo}>
              <Text numberOfLines={1} style={styles.userName}>
                {data.senderId !== +user
                  ? data.sender.username
                  : data.recipient.username}
              </Text>
              <Text style={styles.date}>
                {moment(data.createdAt).format('MM/DD/YY')}
              </Text>
            </View>
            <Text numberOfLines={1} style={styles.chat}>
              {data.content}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
        keyExtractor={(item) => item.id.toString()}
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
