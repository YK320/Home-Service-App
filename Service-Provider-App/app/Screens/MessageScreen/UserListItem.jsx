import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const UserListItem = ({ user, booking }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phoneNumber}</Text>
      <Text>Booking Status: {booking.bookingStatus}</Text>
      {/* Add more user and booking details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserListItem;
