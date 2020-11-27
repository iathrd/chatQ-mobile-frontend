import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainTab} from './TabNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Thumbnail} from 'native-base';
import {useSelector} from 'react-redux';

// Screens
import ChatRoom from '../screens/ChatRoom';
import Landing from './Landing';
import Register from './Register';
import CountryPicker from './CountryPicker';
import Otp from './Otp';
import SetProfile from './SetProfile';
import FriendDetail from './FriendDetail';
import Profile from './Profile';

const Stack = createStackNavigator();

export default function Main({navigation}) {
  const isLogin = useSelector((state) => state.createprofile.isLoginn);
  return (
    <NavigationContainer>
      {console.log(isLogin)}
      {!isLogin ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="landing"
            component={Landing}
          />

          <Stack.Screen
            options={{
              title: 'Enter your phone number',
              headerTitleAlign: 'center',
              headerLeft: null,
              headerTitleStyle: {color: '#d2d2d8'},
              headerStyle: {elevation: 0, backgroundColor: '#101d25'},
              headerRight: () => (
                <Icon2
                  style={styles.icon}
                  name="dots-vertical"
                  size={25}
                  color="#9b9b9b"
                />
              ),
            }}
            name="Register"
            component={Register}
          />
          <Stack.Screen
            options={{
              title: 'Choose a country',
              headerTitleStyle: {color: '#d2d2d8'},
              headerStyle: {backgroundColor: '#232d36'},
              headerTintColor: 'grey',
              headerRight: () => (
                <Icon
                  style={styles.icon}
                  name="search"
                  size={25}
                  color="#9b9b9b"
                />
              ),
            }}
            name="Country"
            component={CountryPicker}
          />
          <Stack.Screen
            name="OTP"
            options={({route}) => ({
              title: route.params.data,
              headerStyle: {backgroundColor: '#101d25'},
              headerLeft: null,
              headerTitleStyle: {color: '#d2d2d8'},
              headerTitleAlign: 'center',
              headerRight: () => (
                <Icon2
                  style={styles.icon}
                  name="dots-vertical"
                  size={25}
                  color="#9b9b9b"
                />
              ),
            })}
            component={Otp}
          />
          <Stack.Screen
            options={{
              title: 'Profile info',
              headerLeft: null,
              headerTintColor: '#d2d2d8',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: '#101d25',
              },
            }}
            name="SetProfile"
            component={SetProfile}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={({navigation}) => ({
              headerStyle: {elevation: 0, backgroundColor: '#191f1a'},
              title: 'chatQ',
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#9b9b9b',
                fontSize: 25,
              },
              headerRight: ({size, color, focused}) => (
                <View style={styles.iconView}>
                  <Icon
                    style={styles.icon2}
                    name="search"
                    color="#9b9b9b"
                    size={25}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}>
                    <Icon2 name="dots-vertical" size={25} color="#9b9b9b" />
                  </TouchableOpacity>
                </View>
              ),
            })}
            name="Chats"
            component={MainTab}
          />
          <Stack.Screen
            options={({navigation, route}) => ({
              title: null,
              headerLeft: () => (
                <View style={styles.chatRoomWrapper}>
                  <TouchableOpacity onPress={() => navigation.popToTop()}>
                    <Icon2 name="arrow-left" size={30} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navigationFriend}
                    onPress={() =>
                      navigation.navigate('FriendInfo', {
                        data: route.params.data,
                      })
                    }>
                    <Thumbnail
                      small
                      source={require('../assets/img/default_user.png')}
                    />
                    <View style={styles.userInfo}>
                      <Text style={styles.textUser}>
                        {route.params.data.username}
                      </Text>
                      <Text style={styles.textLastseen}>
                        last seen today at 20:18
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ),
              headerStyle: {backgroundColor: '#191f1a'},
              headerRight: () => (
                <Icon2
                  style={styles.icon}
                  name="dots-vertical"
                  size={25}
                  color="#9b9b9b"
                />
              ),
            })}
            name="ChatRoom"
            component={ChatRoom}
          />
          <Stack.Screen
            options={({route, navigation}) => ({
              headerStyle: {backgroundColor: '#27343c'},
              title: null,
              headerLeft: () => (
                <View style={styles.headerFriendInfo}>
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() =>
                      navigation.reset({index: 1, routes: [{name: 'ChatRoom'}]})
                    }>
                    <Icon2 name="arrow-left" size={30} color="white" />
                  </TouchableOpacity>
                  {console.log('form Firend', route.params.data.username)}
                  <View style={styles.firendInfoWrapper}>
                    <Text style={styles.textUser}>
                      {route.params.data.username}
                    </Text>
                    <Text style={styles.textLastseen}>
                      last seen today at 20:18
                    </Text>
                  </View>
                </View>
              ),
              headerRight: () => (
                <Icon2
                  style={styles.icon}
                  name="dots-vertical"
                  size={25}
                  color="#9b9b9b"
                />
              ),
            })}
            name="FriendInfo"
            component={FriendDetail}
          />
          <Stack.Screen
            options={({navigation}) => ({
              title: 'Profile',
              headerStyle: {backgroundColor: '#27343c'},
              headerTitleStyle: {color: 'white'},
              headerTintColor: '#9b9b9b',
            })}
            name="Profile"
            component={Profile}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconView: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
  icon2: {
    marginRight: 15,
  },
  chatRoomWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationFriend: {
    flexDirection: 'row',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  textUser: {
    color: 'white',
    fontSize: 18,
  },
  textLastseen: {
    color: '#9b9b9b',
    marginBottom: 5,
    fontSize: 12,
  },
  headerFriendInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  firendInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
  },
});
