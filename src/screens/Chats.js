import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {Thumbnail, Fab, Spinner} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import jwt from 'jwt-decode';
import {API_URL} from '@env';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import socket from '../helpers/socket';

// redux action
import action from '../redux/actions/getchat';
import getMessage from '../redux/actions/getmessage';
import saveMessageAction from '../redux/actions/saveMessage';
import loadDataAction from '../redux/actions/getchat';
import userInfoAction from '../redux/actions/userInfo';
import getUserAction from '../redux/actions/getuser';

const ChatView = ({data, navigation, user}) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const moveScreen = async (id) => {
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
  };
  return (
    <TouchableOpacity
      onPress={() =>
        moveScreen(
          `${data.senderId !== +user ? data.senderId : data.recipientId}`,
        )
      }
      style={styles.chatContent}>
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
                {moment().format('MM/DD/YY') !==
                moment(data.createdAt).format('MM/DD/YY')
                  ? moment(data.createdAt).format('MM/DD/YY')
                  : moment(data.createdAt).format('h:mm a')}
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
  const isLoading = useSelector((state) => state.getchat.isLoading);
  const getUser = useSelector((state) => state.getuser);

  const user = jwt(token);
  useEffect(() => {
    const getChatData = async () => {
      dispatch(action.getChat(token));
      socket.on(user.aud, ({senderId, message, recipientId}) => {
        getData(senderId);
        dispatch(action.getChat(token));
      });
    };
    getChatData();
    dispatch(getUserAction.getUsers(token));
  }, []);

  const getData = async (recepientId) => {
    let message = await dispatch(getMessage.getMessage(token, recepientId));
    message = message.action.payload.data;
    dispatch(saveMessageAction.saveMessage(message));
  };

  const loadData = async () => {
    const {nextLink} = chatList.pageInfo;
    if (nextLink) {
      let loadNewData = await dispatch(
        loadDataAction.loadChat(token, nextLink),
      );
      loadNewData = loadNewData.action.payload.data;
      const newData = {
        ...chatList,
        data: [...chatList.data, ...loadNewData.data],
        pageInfo: {...loadNewData.pageInfo},
      };
      dispatch(loadDataAction.saveChat(newData));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ||
        (getUser.isLoading && (
          <Modal animationType="none" transparent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>{/* <Spinner /> */}</View>
            </View>
          </Modal>
        ))}
      {}
      <FlatList
        data={chatList.data}
        renderItem={({item}) => (
          <ChatView data={item} navigation={navigation} user={user.aud} />
        )}
        onEndReached={loadData}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id.toString()}
      />
      <Fab
        position="bottomRight"
        style={{backgroundColor: '#00b09c'}}
        onPress={() => navigation.navigate('Contact')}>
        <Icon name="android-messages" size={35} />
      </Fab>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101d25',
  },
  viewContainer: {
    marginTop: 10,
    backgroundColor: '#101d25',
  },
  contentDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#101d25',
  },
  contentText: {
    borderBottomColor: 'rgba(155,155,155,0.4)',
    borderBottomWidth: 0.3,
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
  chatContent: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  modal: {
    backgroundColor: 'black',
  },
});
