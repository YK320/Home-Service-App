import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Colors from './../Utils/Colors';
import HomeNavigation from './HomeNavigation';
import BookingNavigation from './BookingNavigation';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import MessageScreen from '../Screens/MessageScreen/MessageScreen';
import MessageNavigation from './MessageNavigation';
import BookingConfirm from '../Screens/BusinessDetailsScreen/BookingConfirm';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, marginTop: -7 }}>Home</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="booking"
        component={BookingNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, marginTop: -7 }}>Booking</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bookmark" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Message"
        component={MessageNavigation}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, marginTop: -7 }}>Notification</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications-on" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, marginTop: -7 }}>Profile</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
