import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import BusinessListByCategoryScreen from '../Screens/BusinesListByCategoryScreen/BusinessListByCategoryScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen';
import MessageScreen from '../Screens/MessageScreen/MessageScreen';
import Login from '../Screens/LoginScreen/Login'

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="business-list" component={BusinessListByCategoryScreen} />
      <Stack.Screen name="business-detail" component={BusinessDetailsScreen} />
      <Stack.Screen name="Message" component={MessageScreen} />
      <Stack.Screen name="Login" component={Login} />

    </Stack.Navigator>
  );
}
