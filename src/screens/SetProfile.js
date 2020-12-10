import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Form, Input, Item} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import action from '../redux/actions/createprofile';

const options = {
  title: 'Select Avatar',
  takePhotoButtonTitle: 'Take from camera',
  chooseFromLibraryButtonTitle: 'choose photo from libary',
};

export default function SetProfile() {
  const [image, setImage] = useState({avatarSource: ''});
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

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
  const handleSubmit = () => {
    dispatch(action.createProfile(username, token));
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
        <Text style={styles.textDev}>
          Please profide your name and an optioal profie
        </Text>
        <Text style={styles.textDev}>photo</Text>

        <Button onPress={chooseImage} style={styles.btnPhoto}>
          {Object.keys(image.avatarSource).length ? (
            <Image source={image.avatarSource} style={styles.image} />
          ) : (
            <Icon
              style={styles.icon}
              name="camera-plus"
              color="#5f717d"
              size={60}
            />
          )}
        </Button>

        <Form style={styles.form}>
          <Item style={styles.item}>
            <Input
              placeholder="Type your name here"
              placeholderTextColor="#d2d2d8"
              style={styles.input}
              onChangeText={(text) => setUsername(text)}
            />
          </Item>
        </Form>
        <Button onPress={handleSubmit} style={styles.btnNext}>
          <Text>Next</Text>
        </Button>
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
    marginBottom: 50,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 90,
  },
});
