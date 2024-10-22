import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar, Text, View, StyleSheet } from 'react-native'; // Make sure to import Text from react-native
import Login from './Screens/LoginScreen/Login.jsx';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Navigations/TabNavigation.jsx';
import { useFonts } from 'expo-font';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  });

  return (
    <ClerkProvider 
    tokenCache={tokenCache}
    publishableKey='pk_test_dGVuZGVyLWJsdWVqYXktMTMuY2xlcmsuYWNjb3VudHMuZGV2JA'>
      
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      

      {/*Sign In Component*/}
      <SignedIn>
        <NavigationContainer independent={true}> 
          <TabNavigation />
        </NavigationContainer>
      </SignedIn>
       {/*Sign Out Component*/}
      <SignedOut>
        <Login />
      </SignedOut>
    </GestureHandlerRootView>
    </ClerkProvider>
  );
}
const styles=StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'#fff',
    paddingTop:20
  }
})