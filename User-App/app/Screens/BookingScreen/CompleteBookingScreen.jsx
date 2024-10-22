import React from 'react';
import { View, Text, Button } from 'react-native';

const CancelBookingScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Cancel Booking Screen</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default CancelBookingScreen;