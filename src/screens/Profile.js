import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Form, Item, Input, Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import action from '../redux/actions/getuser';
import {API_URL} from '@env';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.userInfo.data.data);
  const nameSheet = useRef();
  const imageSheet = useRef();

  // useEffect(() => {
  //   dispatch(action.getUser(token));
  // }, []);

  const openGalery = () => {
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response.uri);
      }
    });
  };

  const openCamera = () => {
    const options = {
      saveToPhotos: true,
      mediaType:'photo',
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response.uri);
      }
    });
  };

  return (
    <>
      <View style={styles.parent}>
        <RBSheet
          ref={nameSheet}
          height={300}
          openDuration={500}
          customStyles={{
            container: {
              backgroundColor: '#101d25',
              maxHeight: '25%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingLeft: 30,
              paddingTop: 20,
              paddingRight: 30,
              paddingBottom: 30,
            },
          }}>
          <View>
            <View>
              <Text style={styles.enterNameText}>Enter your name</Text>
              <View>
                <Form>
                  <View style={styles.inputShip}>
                    <Item style={styles.itemShip}>
                      <Input
                        autoFocus={true}
                        style={styles.inputItem}
                        value={user.username}
                      />
                      <Text style={styles.textLength}>12</Text>
                    </Item>
                    <View style={styles.iconShip}>
                      <Icon name="emoticon" size={25} color="#9b9b9b" />
                    </View>
                  </View>
                  <View>
                    <View style={styles.btnShipWrapper}>
                      <TouchableOpacity
                        onPress={() => nameSheet.current.close()}>
                        <View style={styles.btnCancelView}>
                          <Text style={styles.textBtnShip}>Cancel</Text>
                        </View>
                      </TouchableOpacity>
                      <View>
                        <Text style={styles.textBtnShip}>Save</Text>
                      </View>
                    </View>
                  </View>
                </Form>
              </View>
            </View>
          </View>
        </RBSheet>
        <RBSheet
          ref={imageSheet}
          height={300}
          openDuration={500}
          customStyles={{
            container: {
              backgroundColor: '#101d25',
              maxHeight: '25%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingLeft: 30,
              paddingTop: 20,
              paddingRight: 30,
              paddingBottom: 30,
            },
          }}>
          <View>
            <View>
              <Text style={styles.enterNameText}>Profile photo</Text>
              <View style={styles.imagePicker}>
                <View style={styles.iconView}>
                  <TouchableOpacity onPress={openGalery}>
                    <Image
                      style={styles.iconPicker2}
                      source={require('../assets/img/galery.png')}
                    />
                  </TouchableOpacity>
                  <Text style={styles.textIcon}>Galery</Text>
                </View>
                <View style={styles.iconView}>
                  <TouchableOpacity onPress={openCamera}>
                    <Image
                      style={styles.iconPicker}
                      source={require('../assets/img/camera.png')}
                    />
                  </TouchableOpacity>
                  <Text style={styles.textIcon}>Camera</Text>
                </View>
              </View>
            </View>
          </View>
        </RBSheet>
        <View style={styles.iamgeDisplay}>
          <View style={styles.avatarView}>
            <Image
              style={styles.image}
              source={{uri: `${API_URL}${user.avatar}`}}
            />
            <View style={styles.btnWrapper}>
              <TouchableOpacity onPress={() => imageSheet.current.open()}>
                <View style={styles.btnCamera}>
                  <Icon name="camera" color="white" size={30} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.inputWrapper}>
            <TouchableOpacity
              onPress={() => nameSheet.current.open()}
              style={styles.contentView}>
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
            </TouchableOpacity>

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
  inputShip: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemShip: {
    marginLeft: 0,
    paddingBottom: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#00b09c',
    flex: 1,
    marginRight: 20,
  },
  iconShip: {
    marginTop: 15,
  },
  btnShipWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  btnCancelView: {
    marginRight: 50,
  },
  enterNameText: {
    color: '#d2d2d8',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputItem: {
    color: '#d2d2d8',
  },
  textLength: {
    color: '#9b9b9b',
  },
  textBtnShip: {
    color: '#00b09c',
    fontSize: 15,
    fontWeight: 'bold',
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    alignItems: 'center',
    marginLeft: 25,
  },
  iconPicker: {
    height: 50,
    width: 50,
  },
  textIcon: {
    color: '#9b9b9b',
    fontSize: 16,
  },
  iconPicker2: {
    height: 50,
    width: 54,
  },
});
