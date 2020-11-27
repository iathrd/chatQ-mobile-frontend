import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Form, Item, Input, Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import action from '../redux/actions/getuser';

export default function Profile() {
  const user = useSelector((state) => state.getuser.user);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(action.getUser(token));
  }, []);
  return (
    <View style={styles.parent}>
      <View style={styles.avatarView}>
        <Image
          style={styles.image}
          source={require('../assets/img/default_user.png')}
        />
      </View>
      <Form style={styles.form}>
        {/* <View style={{flexDirection:"row"}}> */}

        <Item style={styles.item}>
          <Icon name="account" color="white" size={25} />
          <Input
            placeholder="Username"
            value={user.username}
            style={styles.input}
          />
        </Item>
        <Item>
          <Icon name="phone" color="white" size={25} />
          <Input
            placeholder="Phone number"
            value={user.phoneNumber}
            style={styles.input}
          />
        </Item>

        {/* </View> */}
        <Button style={styles.btnSave}>
          <Text>Save</Text>
        </Button>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#101d25',
    alignItems: 'center',
  },
  avatarView: {
    height: 200,
    width: 200,
    marginTop: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  input: {
    color: 'white',
  },
  from: {
    width: '80%',
  },
  item: {
    marginBottom: 20,
  },
  btnSave: {
    marginTop: 50,
    marginLeft: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#00b09c',
  },
});
