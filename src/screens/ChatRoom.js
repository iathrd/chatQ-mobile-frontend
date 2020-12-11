import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {Form, Item, Input, Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import socket from '../helpers/socket';
import jwt from 'jwt-decode';

import sendMessageAction from '../redux/actions/sendmessage';
import getMessage from '../redux/actions/getmessage';
import saveMessageAction from '../redux/actions/saveMessage';

const Chat = ({data, route}) => {
  return (
    <View style={styles.chatView}>
      <View
        style={
          data.senderId === +route.params.user.user
            ? styles.boxUser
            : styles.boxFriend
        }>
        <View>
          <Text style={styles.textChat}>{data.content}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={styles.textTime}>
            {moment(data.createdAt).format('h:mm a')}
          </Text>
          {data.senderId === +route.params.user.user ? (
            <Icon name="check-all" size={16} color="#9b9b9b" />
          ) : (
            <Text> </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default function ChatRoom({route}) {
  const dispatch = useDispatch();
  const [text, setText] = useState({content: '', isSubmit: false});
  const token = useSelector((state) => state.auth.token);
  const datass = useSelector((state) => state.saveMessage.data);
  const user = jwt(token);

  const getData = async () => {
    let message = await dispatch(getMessage.getMessage(token, route.params.id));
    message = message.action.payload.data;
    dispatch(saveMessageAction.saveMessage(message));
  };

  useEffect(() => {
    socket.on(user.aud, () => {
      getData();
    });

    if (text.isSubmit) {
      getData();
      setText({content: ''});
    }
    return () => {
      socket.close();
    };
  }, [text.isSubmit]);

  const sendMessages = async () => {
    const datas = {
      content: text.content,
      recipientId: route.params.id,
    };

    dispatch(sendMessageAction.sendMessage(token, datas));
    setText({isSubmit: true});
  };

  const nextPage = async () => {
    const {nextLink} = datass.pageInfo;
    if (nextLink) {
      let load = await dispatch(getMessage.loadMessage(token, nextLink));
      load = load.action.payload.data;
      const newData = {
        ...datass,
        data: [...datass.data, ...load.data],
        pageInfo: {...load.pageInfo},
      };
      dispatch(saveMessageAction.saveMessage(newData));
    }
  };

  return (
    <>
      <View style={styles.parent}>
        <ImageBackground
          source={require('../assets/img/bg.jpg')}
          style={styles.backgoundImage}>
          <SafeAreaView style={styles.saveArea}>
            <FlatList
              inverted
              data={datass.data.length && datass.data}
              onEndReached={nextPage}
              onEndReachedThreshold={0.5}
              renderItem={({item}) => <Chat data={item} route={route} />}
              keyExtractor={(item) => item.id.toString()}
            />
            <View style={styles.formWrapper}>
              <Form>
                <View style={styles.inputWrapper}>
                  <Item style={styles.item} rounded>
                    <Icon3 name="emoji-emotions" size={25} color="#9b9b9b" />

                    <Input
                      style={styles.input}
                      placeholder="Type a message"
                      placeholderTextColor="#9b9b9b"
                      onChangeText={(text) => setText({content: text})}
                      value={text.content}
                    />
                    <Icon2
                      style={styles.iconPaper}
                      name="paperclip"
                      size={25}
                      color="#9b9b9b"
                    />
                    <Icon name="camera" size={25} color="#9b9b9b" />
                  </Item>
                  <View>
                    <Button onPress={sendMessages} style={styles.btnMic}>
                      <Icon3 name={'send'} color="white" size={23} />
                    </Button>
                  </View>
                </View>
              </Form>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fotter: {
    backgroundColor: 'transparent',
  },
  input: {
    color: '#9b9b9b',
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  item: {
    backgroundColor: '#191f1a',
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    paddingTop: 0,
  },
  boxUser: {
    backgroundColor: '#177a32',
    alignSelf: 'flex-end',
    borderRadius: 5,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    marginBottom: 10,
    maxWidth: '80%',
    flexDirection: 'row',
  },
  boxFriend: {
    backgroundColor: '#191f1a',
    alignSelf: 'flex-start',
    borderRadius: 5,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    maxWidth: '80%',
    flexDirection: 'row',
  },
  timeView: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 5,
  },
  textTime: {
    color: '#9b9b9b',
    fontWeight: '100',
    marginRight: 5,
    fontSize: 12,
  },
  btnMic: {
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 25,
    paddingLeft: 13,
    paddingRight: 12,
    marginLeft: 5,
    backgroundColor: '#00b09c',
  },
  chatView: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  textChat: {
    color: 'white',
    textAlign: 'left',
  },
  parent: {
    flex: 1,
    flexDirection: 'column',
  },
  backgoundImage: {
    flex: 1,
  },
  saveArea: {
    flex: 1,
  },
  formWrapper: {
    backgroundColor: 'transparent',
    paddingBottom: 5,
  },
  iconPaper: {
    marginRight: 20,
  },
});
