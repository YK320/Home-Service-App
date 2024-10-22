import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import BusinessListItem from './../BusinesListByCategoryScreen/BusinessListItem';
import GlobalApi from './../../Utils/GlobalApi';
import BusinessDetailsScreen from '../BusinessDetailsScreen/BusinessDetailsScreen'; // Import BusinessDetailsScreen

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // New state to hold selected booking

  useEffect(() => {
    user && getUserBookings();
  }, [user]);

  const getUserBookings = () => {
    setLoading(true);
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then((resp) => {
      const validBookings = resp.bookings.filter(
        (booking) => booking.businessList && booking.businessList.name
      );

      const sortedBookings = validBookings.sort((a, b) => new Date(b.date) - new Date(a.date));
      const latestBookings = sortedBookings.slice(0, 10);

      setBookingList(latestBookings);
      setLoading(false);

      if (sortedBookings.length > 10) {
        const bookingsToDelete = sortedBookings.slice(10);
        deleteOldBookings(bookingsToDelete);
      }
    });
  };

  const deleteOldBookings = (bookings) => {
    bookings.forEach((booking) => {
      GlobalApi.deleteBooking(booking.id).then(() => {
        console.log('Deleted old booking:', booking.id);
      });
    });
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking); // Set the selected booking to display BusinessDetailsScreen
  };

  const handleCancelBooking = (booking) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            GlobalApi.deleteBooking(booking.id).then(() => {
              Alert.alert('Booking Canceled', 'Your booking has been canceled.');
              getUserBookings(); // Refresh the booking list
            }).catch((error) => {
              Alert.alert('Error', 'Failed to cancel booking.');
              console.error('Error canceling booking:', error);
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  // If a booking is selected, show the BusinessDetailsScreen
  if (selectedBooking) {
    return (
      <BusinessDetailsScreen 
        business={selectedBooking.businessList} 
        onClose={() => setSelectedBooking(null)} // Allow closing BusinessDetailsScreen
      />
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Top Buttons */}
      

      <Text style={{ fontFamily: 'outfit-medium', fontSize: 26, marginTop: 10 }}>My Bookings</Text>
     
      {/* <View style={styles.topButtonsContainer}>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.topButtonText}>Complete Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton}>
          <Text style={styles.topButtonText}>Cancel Bookings</Text>
        </TouchableOpacity>
      </View> */}
      
      <View style={{ flex: 1 }}>
        {bookingList?.length > 0 ? (
          <FlatList
            data={bookingList}
            onRefresh={() => getUserBookings()}
            refreshing={loading}
            renderItem={({ item }) => (
              <View style={styles.bookingItemContainer}>
                <BusinessListItem business={item?.businessList} booking={item} />
                <View style={styles.buttonContainer}>
                  {/* Uncomment the following code if you want to add the View button back */}
                  <TouchableOpacity
                    style={styles.viewButton}
                    onPress={() => handleViewBooking(item)} // Trigger view action
                  >
                    <Text style={styles.buttonText}>Complete</Text>
                  </TouchableOpacity> 
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleCancelBooking(item)}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 25, textAlign: 'center', marginTop: 100 }}>No Booking Found</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookingItemContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  viewButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F44336',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop:20
  },
  topButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#A020F0', // Change this color as needed
    borderRadius: 50,
  },
  topButtonText: {
    color: '#fff',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
});
