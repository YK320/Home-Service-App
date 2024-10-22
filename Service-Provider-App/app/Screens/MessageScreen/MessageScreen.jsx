import { View, Text, FlatList, Button, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import GlobalApi from './../../Utils/GlobalApi';
import Colors from '../../Utils/Colors';

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelingBookingId, setCancelingBookingId] = useState(null); // Track which booking is being canceled
  const [cancelReason, setCancelReason] = useState(''); // Track the reason for cancellation

  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      getBookings();
    }
  }, [user]);

  const getBookings = () => {
    setLoading(true);
    GlobalApi.getBookings(user.primaryEmailAddress.emailAddress)
      .then(resp => {
        setBookingList(resp.bookings);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bookings: ', error);
        setLoading(false);
      });
  };

  const handleAccept = (bookingId) => {
    // Handle booking acceptance logic here
    console.log(`Accepted booking with ID: ${bookingId}`);
  };

  const handleCancel = (bookingId) => {
    setCancelingBookingId(bookingId); // Set the booking being canceled
  };

  const handleSendCancelReason = () => {
    // Send the cancellation reason to the server (or perform other logic)
    console.log(`Cancelled booking with ID: ${cancelingBookingId}. Reason: ${cancelReason}`);
    
    // Clear the state after submitting
    setCancelingBookingId(null);
    setCancelReason('');
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Notification</Text>
      <View>
        {bookingList?.length > 0 ? (
          <FlatList
            data={bookingList}
            keyExtractor={(item, index) => item.id || index.toString()}
            onRefresh={() => getBookings()}
            refreshing={loading}
            renderItem={({ item }) => (
              <View style={styles.bookingItem}>
                <Text style={styles.bookingText}>
                  <Text style={styles.label}>Time: </Text>
                  {item.time}
                </Text>
                <Text style={styles.bookingText}>
                  <Text style={styles.label}>User Email: </Text>
                  {item.userEmail}
                </Text>
                <Text style={styles.bookingText}>
                  <Text style={styles.label}>User Name: </Text>
                  {item.userName}
                </Text>
                <Text style={styles.bookingText}>
                  <Text style={styles.label}>Booking Status: </Text>
                  {item.bookingStatus}
                </Text>
                <Text style={styles.bookingText}>
                  <Text style={styles.label}>Date: </Text>
                  {item.date}
                </Text>

                <View style={styles.buttonContainer}>
                  <Button title="Accept" color="#4CAF50" onPress={() => handleAccept(item.id)} />
                  <Button title="Cancel" color="#F44336" onPress={() => handleCancel(item.id)} />
                </View>

                {/* Show reason input box if this booking is being canceled */}
                {cancelingBookingId === item.id && (
                  <View style={styles.cancelContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter reason for cancellation"
                      value={cancelReason}
                      onChangeText={setCancelReason}
                    />
                    <Button
                      title="Send"
                      onPress={handleSendCancelReason}
                      color="#F44336"
                    />
                  </View>
                )}
              </View>
            )}
          />
        ) : (
          <Text style={styles.noBookingText}>No Booking Found</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0F0F0', // Light background for the screen
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.PRIMARY,
  },
  bookingItem: {
    backgroundColor: '#FFFFFF', // White background for each booking item
    padding: 15, // Padding around each booking
    marginBottom: 15, // Spacing between bookings
    borderRadius: 10, // Rounded corners for booking items
    shadowColor: '#000', // Shadow for the booking card
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, // Elevation for Android shadow
  },
  bookingText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'outfit-regular',
  },
  label: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  noBookingText: {
    fontFamily: 'outfit-medium',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 100,
  },
  cancelContainer: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#F44336',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
