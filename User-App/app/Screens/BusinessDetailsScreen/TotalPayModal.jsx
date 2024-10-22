import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function TotalPay() {
  const param = useRoute().params;
  const navigation = useNavigation();

  useEffect(() => {
    console.log("BookingModal", param.bookingmodal);
  }, []);

  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
      <TouchableOpacity
        style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={{ fontSize: 25, fontFamily: 'outfit-medium' }}>Booking Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
