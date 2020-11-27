import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// Chat screens
import Chats from './Chats';

export const ChatsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Chats"
        component={Chats}
      />
    </Stack.Navigator>
  );
};

