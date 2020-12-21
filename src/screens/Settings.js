import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {API_URL} from '@env';

export default function Settings({navigation}) {
  const user = useSelector((state) => state.getuser.user);
  return (
    <ScrollView style={styles.parent}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <View style={styles.profileWrapper}>
          <View>
            <Thumbnail
              large
              source={
                user.avatar !== null
                  ? {uri: `${API_URL}${user.avatar}`}
                  : require('../assets/img/default_user.png')
              }
            />
          </View>
          <View style={styles.userView}>
            <Text style={styles.userText}>{user.username}</Text>
            <Text style={styles.statusText}>Ada</Text>
          </View>
          <View>
            <Icon name="qr-code-sharp" size={30} color="#9b9b9b" />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.optionWrapper}>
        <View style={styles.optionContent}>
          <View>
            <Icon name="key" color="#9b9b9b" size={30} />
          </View>
          <View style={styles.optionTextView}>
            <Text style={styles.textOption}>Account</Text>
            <Text style={styles.statusText}>
              Privacy,security,change number
            </Text>
          </View>
        </View>
        <View style={styles.optionContent}>
          <View>
            <Icon name="md-chatbox-ellipses" color="#9b9b9b" size={30} />
          </View>
          <View style={styles.optionTextView}>
            <Text style={styles.textOption}>Chats</Text>
            <Text style={styles.statusText}>
              Theme, walppaers, chat history
            </Text>
          </View>
        </View>
        <View style={styles.optionContent}>
          <View>
            <Icon name="notifications" color="#9b9b9b" size={30} />
          </View>
          <View style={styles.optionTextView}>
            <Text style={styles.textOption}>Notifications</Text>
            <Text style={styles.statusText}>Message, group & call tones</Text>
          </View>
        </View>
        <View style={styles.optionContent}>
          <View>
            <Icon2 name="data-usage" color="#9b9b9b" size={30} />
          </View>
          <View style={styles.optionTextView}>
            <Text style={styles.textOption}>Data and storage usage</Text>
            <Text style={styles.statusText}>Network usage, auto-downoad</Text>
          </View>
        </View>
        <View style={styles.optionContent}>
          <View>
            <Icon name="notifications" color="#9b9b9b" size={30} />
          </View>
          <View style={styles.optionTextView}>
            <Text style={styles.textOption}>Notifications</Text>
            <Text style={styles.statusText}>Message, group & call tones</Text>
          </View>
        </View>
        <View style={styles.optionContent}>
          <View>
            <Icon name="md-help-circle-outline" color="#9b9b9b" size={30} />
          </View>
          <View style={styles.optionTextViewBottom}>
            <Text style={styles.textOption}>Help</Text>
            <Text style={styles.statusText}>
              FAQ, contact us, provacy policy
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#101d25',
    flex: 1,
  },
  profileWrapper: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 20,
    paddingRight: 16,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomColor: 'rgba(155,155,155,0.4)',
    borderBottomWidth: 0.5,
  },
  userView: {
    marginLeft: 15,
    flex: 1,
  },
  userText: {
    color: '#d2d2d8',
    fontSize: 20,
  },
  statusText: {
    color: '#9b9b9b',
    fontSize: 16,
  },
  optionWrapper: {
    paddingLeft: 30,
    marginTop: 30,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  optionTextView: {
    marginLeft: 30,
  },
  textOption: {
    color: '#d2d2d8',
    fontSize: 18,
  },
  optionTextViewBottom: {
    marginLeft: 30,
    borderBottomWidth: 0.5,
  },
});
