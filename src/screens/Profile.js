import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import action from '../redux/actions/getuser';
import {API_URL} from '@env';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.userInfo.data.data);
  const cobaSheet = useRef();

  // useEffect(() => {
  //   dispatch(action.getUser(token));
  // }, []);

  return (
    <>
      <View style={styles.parent}>
        <Button
          title="Open Bottom Sheet"
          onPress={() => cobaSheet.current.open()}>
          <Text>ppppp</Text>
        </Button>
        <RBSheet
          ref={cobaSheet}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}>
          <Text>PPPPPP</Text>
        </RBSheet>
        <View style={styles.iamgeDisplay}>
          <View style={styles.avatarView}>
            <Image
              style={styles.image}
              source={{uri: `${API_URL}${user.avatar}`}}
            />
            <View style={styles.btnWrapper}>
              <TouchableOpacity onPress={}>
                <View style={styles.btnCamera}>
                  <Icon name="camera" color="white" size={30} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.inputWrapper}>
            <View style={styles.contentView}>
              <View style={styles.iconDisplay}>
                <Icon name="account" size={30} color="#9b9b9b" />
              </View>
              <View style={styles.contentWrapper}>
                <View style={styles.informationDisplay}>
                  <View style={styles.editNameView}>
                    <View>
                      <View>
                        <Text style={styles.labelText}>Name</Text>
                      </View>
                      <Text style={styles.username}>{user.username}</Text>
                    </View>
                    <View>
                      <Icon name="pencil" size={24} color="#00b09c" />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.descriptionText}>
                      This is not your username or pin. This name will be
                      visible to your ChatQ contacts
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.contentView}>
              <View style={styles.iconDisplay}>
                <Icon name="alert-circle-outline" size={30} color="#9b9b9b" />
              </View>
              <View style={styles.contentWrapper}>
                <View style={styles.informationDisplay}>
                  <View style={styles.editNameView2}>
                    <View>
                      <View>
                        <Text style={styles.labelText}>About</Text>
                      </View>
                      <Text style={styles.username}>Ada</Text>
                    </View>
                    <View>
                      <Icon name="pencil" size={24} color="#00b09c" />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.contentView}>
              <View style={styles.iconDisplay}>
                <Icon name="phone" size={30} color="#9b9b9b" />
              </View>
              <View style={styles.contentWrapper}>
                <View style={styles.informationDisplay}>
                  <View style={styles.editNameView2}>
                    <View>
                      <View>
                        <Text style={styles.labelText}>Phone</Text>
                      </View>
                      <Text style={styles.username}>{user.phoneNumber}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#101d25',
  },
  avatarView: {
    height: 200,
    width: 200,
    marginTop: 40,
    position: 'relative',
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
  btnWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 20,
  },
  btnCamera: {
    backgroundColor: '#00b09c',
    padding: 10,
    borderRadius: 35,
  },
  iamgeDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputWrapper: {
    paddingLeft: 16,
    marginTop: 50,
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  editNameView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelText: {
    color: '#9b9b9b',
    fontSize: 16,
  },
  username: {
    color: '#d2d2d8',
    fontSize: 18,
  },
  descriptionText: {
    color: '#9b9b9b',
  },
  iconDisplay: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  informationDisplay: {
    paddingRight: 16,
  },
  contentWrapper: {
    flex: 1,
    marginLeft: 30,
    borderBottomColor: 'rgba(155,155,155,0.4)',
    borderBottomWidth: 0.5,
    paddingBottom: 20,
  },
  editNameView2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
