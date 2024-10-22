import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MessageScreen from '../Screens/MessageScreen/MessageScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';

const Stack = createStackNavigator();

export default function MessageNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Message" component={MessageScreen} />
      <Stack.Screen name="business-detail" component={BusinessDetailsScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="BookingScreen" component={BookingScreen} />
    </Stack.Navigator>
  );
}