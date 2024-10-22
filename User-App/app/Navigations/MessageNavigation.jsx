import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MessageScreen from '../Screens/MessageScreen/MessageScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen';

const Stack = createStackNavigator();

export default function MessageNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Message" component={MessageScreen} />
      <Stack.Screen name="business-detail" component={BusinessDetailsScreen} />
    </Stack.Navigator>
  );
}