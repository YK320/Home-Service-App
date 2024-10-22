import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddNewScreen from '../Screens/AddNewScreen/AddNewScreen';


const Stack = createStackNavigator();

export default function AddNewNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddNew" component={AddNewScreen} />
      
    </Stack.Navigator>
  );
}