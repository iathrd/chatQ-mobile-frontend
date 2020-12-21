import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Thumbnail, Form, Item, Input, Spinner} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {API_URL} from '@env';
import getUserAction from '../redux/actions/getuser';
import getMessage from '../redux/actions/getmessage';
import saveMessageAction from '../redux/actions/saveMessage';
import jwt from 'jwt-decode';

const RenderItem = ({item, navigation}) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const user = jwt(token).aud;

  const moveScreen = async (id) => {
    let message = await dispatch(getMessage.getMessage(token, item.id));
    message = message.action.payload.data;
    dispatch(saveMessageAction.saveMessage(message));
    navigation.navigate('ChatRoom', {
      id: item.id,
      user: {user: user},
      data: {
        username: item.username,
        avatar: item.avatar,
        phoneNumber: item.phoneNumber,
      },
    });
  };
  return (
    <View style={{marginBottom: 20, paddingLeft: 16, paddingRight: 16}}>
      <TouchableOpacity onPress={moveScreen}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Thumbnail
              source={
                item.avatar !== null
                  ? {uri: `${API_URL}${item.avatar}`}
                  : require('../assets/img/default_user.png')
              }
            />
          </View>
          <View style={{marginLeft: 16}}>
            <View>
              <Text style={{color: 'white', fontSize: 16}}>
                {item.username}
              </Text>
            </View>
            <View>
              <Text style={{color: '#9b9b9b'}}>Ada</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default function Contact({navigation}) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.getuser.userList);
  const isLoading = useSelector((state) => state.getuser.isLoading);
  const token = useSelector((state) => state.auth.token);
  const [search, setSearch] = React.useState({search: '', isSubmit: false});

  useEffect(() => {}, [search.search, isLoading.isSubmit]);

  const handleSubmit = () => {
    dispatch(getUserAction.getUsers(token, search.search));
  };

  return (
    <SafeAreaView style={styles.parent}>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          marginBottom: 40,
        }}>
        <View style={{width: '80%'}}>
          <Form>
            <Item style={{paddingRight: 20, paddingLeft: 15}} rounded>
              <Input
                placeholder="Search phone number"
                style={{color: 'white'}}
                keyboardType="phone-pad"
                value={search.search}
                onChangeText={(text) => setSearch({search: text})}
                onSubmitEditing={handleSubmit}
              />
              <Icon name="search" color="#9b9b9b" size={30} />
            </Item>
          </Form>
        </View>
      </View>
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          data={data.data}
          renderItem={({item}) => (
            <RenderItem item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#101d25',
    paddingTop: 16,
  },
});
