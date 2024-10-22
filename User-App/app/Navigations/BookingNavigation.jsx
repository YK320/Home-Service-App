import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen';
import BookingModal from '../Screens/BusinessDetailsScreen/BookingModal';
import BookingConfirm from '../Screens/BusinessDetailsScreen/BookingConfirm';
import CancelBookingScreen from '../Screens/BookingScreen/CancelBookingScreen';
import CompleteBookingScreen from '../Screens/BookingScreen/CompleteBookingScreen';

const Stack = createStackNavigator();

const BookingNavigation = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BookingScreen" component={BookingScreen} />
        <Stack.Screen name="BusinessDetails" component={BusinessDetailsScreen} />
        <Stack.Screen name="BookingModal" component={BookingModal} />
        <Stack.Screen name="BookingConfirm" component={BookingConfirm} />
        <Stack.Screen name="CancelBookingScreen" component={CancelBookingScreen} />
        <Stack.Screen name="CompleteBookingScreen" component={CompleteBookingScreen} />
      </Stack.Navigator>
  );
}

export default BookingNavigation;
