import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen';
import BookingModal from '../Screens/BusinessDetailsScreen/BookingModal';
import TotalPayModal from '../Screens/BusinessDetailsScreen/TotalPayModal';
import BookingConfirm from '../Screens/BusinessDetailsScreen/BookingConfirm';

const Stack = createStackNavigator();

const BookingNavigation = () => {
  return (
      <Stack.Navigator initialRouteName="BookingConfirm" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BusinessDetails" component={BusinessDetailsScreen} />
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="BookingModal" component={BookingModal} />
        <Stack.Screen name="TotalPayModal" component={TotalPayModal} />
        <Stack.Screen name="BookingConfirm" component={BookingConfirm} />
      </Stack.Navigator>
  );
}

export default BookingNavigation;
