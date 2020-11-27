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
import action from '../redux/actions/getmessage';
import {useSelector, useDispatch} from 'react-redux';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

import sendMessageAction from '../redux/actions/sendmessage';

const Chat = ({data, route}) => {
  return (
    <View style={styles.chatView}>
      <View
        style={
          data.senderId === +route.params.user
            ? styles.boxUser
            : styles.boxFriend
        }>
        <View>
          <Text style={styles.textChat}>{data.content}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={styles.textTime}>19.04</Text>
          {data.senderId === +route.params.user ? (
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
  const [data, setData] = useState({data: [], pageInfo: {}});
  const [page, setPage] = useState(1);
  const message = useSelector((state) => state.getmessage.data);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(action.getMessage(token, route.params.id, page));
    // const newData = {
    //   ...data,
    //   data: message.data,
    //   pageInfo: message.pageInfo,
    // };
    // setData({data: message.data, pageInfo: message.pageInfo});
    setText({content: ''});
  }, [text.isSubmit]);

  const sendMessages = () => {
    const datas = {
      content: text.content,
      recipientId: route.params.id,
    };
    dispatch(sendMessageAction.sendMessage(token, datas));
    setText({isSubmit: true});
  };

  const nextPage = async () => {
    setPage(page + 1);
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
              data={message.length && message}
              // onEndReached={nextPage}
              // onEndReachedThreshold={0.5}
              renderItem={({item}) => <Chat data={item} route={route} />}
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
    maxWidth: 200,
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
    marginBottom: 10,
    maxWidth: 200,
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
