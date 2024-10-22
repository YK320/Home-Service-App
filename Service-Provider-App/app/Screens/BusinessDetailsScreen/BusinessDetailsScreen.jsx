import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import BusinessListItem from './../BusinesListByCategoryScreen/BusinessListItem'
import GlobalApi from './../../Utils/GlobalApi'

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.primaryEmailAddress) {
      console.log(user.primaryEmailAddress.emailAddress);
      getBookings();
    }
  }, [user]);

  /**
   * Get User Bookings
   */
  const getBookings = () => {
    setLoading(true);
    GlobalApi.getBookings(user.primaryEmailAddress.emailAddress)
      .then(resp => {
        setBookingList(resp.bookings);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching bookings: ", error);
        setLoading(false);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 26 }}>My Booking</Text>

      <View>
        {bookingList?.length > 0 ? (
          <FlatList
            data={bookingList}
            onRefresh={() => getBookings()}
            refreshing={loading}
            renderItem={({ item, index }) => (
              <BusinessListItem
                business={item?.businessList}
                booking={item}
              />
            )}
          />
        ) : (
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 25, textAlign: 'center', marginTop: 100 }}>
            No Booking Found
          </Text>
        )}
      </View>
    </View>
  );
}
