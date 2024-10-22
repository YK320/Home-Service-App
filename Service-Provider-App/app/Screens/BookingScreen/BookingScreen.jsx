import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from './../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import BusinessListItem from './../BusinesListByCategoryScreen/BusinessListItem';

export default function BookingScreen() {
  const { user } = useUser();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getServiceProviderBookings();
    }
  }, [user]);

  /**
   * Get Service Provider Bookings
   */
  const getServiceProviderBookings = () => {
    setLoading(true);
    GlobalApi.getServiceProviderBookings(user.primaryEmailAddress.emailAddress)
      .then(resp => {
        setBookingList(resp.bookings);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching service provider bookings: ", error);
        setLoading(false);
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 26,
        }}
      >
        Service Provider Bookings
      </Text>

      <View>
        {bookingList?.length > 0 ? (
          <FlatList
            data={bookingList}
            onRefresh={() => getServiceProviderBookings()}
            refreshing={loading}
            renderItem={({ item, index }) => (
              <BusinessListItem
                business={item?.businessList}
                booking={item}
              />
            )}
          />
        ) : (
          <Text
            style={{
              fontFamily: 'outfit-medium',
              fontSize: 25,
              textAlign: 'center',
              marginTop: 100,
            }}
          >
            No Booking Found
          </Text>
        )}
      </View>
    </View>
  );
}
