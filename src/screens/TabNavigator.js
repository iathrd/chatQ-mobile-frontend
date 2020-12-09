import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
import Chats from './Chats';
import Calls from './Calls';
import Status from './Status';

export const MainTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {backgroundColor: '#27343c'},
        activeTintColor: '#25D366',
        inactiveTintColor: '#9b9b9b',
        indicatorStyle: {backgroundColor: '#25D366'},
      }}>
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="Status" component={Status} />
      <Tab.Screen name="Calls" component={Calls} />
    </Tab.Navigator>
  );
};
