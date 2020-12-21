import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Form, Input, Item,Spinner} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import action from '../redux/actions/createprofile';
import {API_URL} from '@env';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Formik} from 'formik';
import getUserAction from '../redux/actions/getuser';

const options = {
  title: 'Select Avatar',
  takePhotoButtonTitle: 'Take from camera',
  chooseFromLibraryButtonTitle: 'choose photo from libary',
};

export default function SetProfile() {
  const [image, setImage] = useState({avatarSource: ''});
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.getuser.user);
  const avatar = useSelector((state) => state.createprofile);
  const imageSheet = useRef();
  const [username, setUsername] = useState(
    Object.keys(user).length ? user.username : '',
  );

  React.useEffect(() => {
    if (avatar.isSuccess) {
      dispatch(getUserAction.getUser(token));
    }
  }, [avatar.isSuccess]);

  const chooseImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setImage({
          avatarSource: source,
        });
      }
    });
  };
  const handleSubmit = (values) => {
    dispatch(action.createProfile(values.username, token));
  };

  const openGalery = () => {
    imageSheet.current.close();
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const form = new FormData();

        form.append('picture', {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        });

        dispatch(action.createAvatar(token, form));
      }
    });
  };

  const openCamera = () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
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
      {/* <View>
        <Image source={{uri: image.fileUri}} style={styles.images} />
        <Text style={{textAlign: 'center'}}>Base 64 String</Text>
      </View>
      <View>
        <Image source={{uri: image.fileUri}} style={styles.images} />
        <Text style={{textAlign: 'center'}}>File Uri</Text>
      </View>

      <TouchableOpacity onPress={chooseImage} style={styles.btnSection}>
        <Text style={styles.btnText}>Choose File</Text>
      </TouchableOpacity> */}
      <View style={styles.parent}>
        {avatar.isLoading && (
          <Modal animationType="none" transparent={true}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}><Spinner /></View>
            </View>
          </Modal>
        )}
        <Text style={styles.textDev}>
          Please profide your name and an optioal profie
        </Text>
        <Text style={styles.textDev}>photo</Text>

        <Button
          onPress={() => imageSheet.current.open()}
          style={styles.btnPhoto}>
          {Object.keys(user).length && user.avatar !== null ? (
            <Image
              source={{uri: `${API_URL}${user.avatar}`}}
              style={styles.image}
            />
          ) : (
            <Icon
              style={styles.icon}
              name="camera-plus"
              color="#5f717d"
              size={60}
            />
          )}
        </Button>
        <Formik
          style={styles.form}
          initialValues={{
            username: Object.keys(user).length ? user.username : '',
          }}
          enableReinitialize
          onSubmit={(values) => {
            handleSubmit(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={{width: '80%'}}>
                <Item style={styles.item}>
                  <Input
                    placeholder="Type your name here"
                    placeholderTextColor="#d2d2d8"
                    style={styles.input}
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    maxLength={20}
                  />
                </Item>
              </View>

              <View style={{marginTop: '30%'}}>
                <Button onPress={handleSubmit} style={styles.btnNext}>
                  <Text>Next</Text>
                </Button>
              </View>
            </>
          )}
        </Formik>
        <RBSheet
          ref={imageSheet}
          height={300}
          openDuration={200}
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
      </View>

      {/* <View style={styles.footer}> */}

      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#101d25',
    alignItems: 'center',
    paddingTop: 20,
  },
  textDev: {
    color: 'grey',
  },
  btnPhoto: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 50,
    backgroundColor: '#27343c',
  },
  icon: {
    marginLeft: '27%',
  },
  form: {
    width: '90%',
    marginTop: 30,
    marginBottom: 200,
  },
  item: {
    borderBottomColor: '#00b09c',
    borderBottomWidth: 2,
  },
  input: {
    color: '#d2d2d8',
  },
  footer: {
    backgroundColor: '#101d25',
    paddingBottom: 50,
  },
  btnNext: {
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#00b09c',
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 90,
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
});
