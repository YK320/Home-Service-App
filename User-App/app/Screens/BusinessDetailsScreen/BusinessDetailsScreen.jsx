import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import BusinessPhotos from './BusinessPhotos';
import BusinessAboutMe from './BusinessAboutMe';
import BookingModal from './BookingModal';
import ChatScreen from './ChatScreen'; // Import ChatScreen
import { AirbnbRating } from 'react-native-ratings'; // Import Rating component
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function BusinessDetailsScreen() {
  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business);
  const [showModal, setShowModal] = useState(false);
  const [showChat, setShowChat] = useState(false); // State to control ChatScreen visibility
  const [showReviewModal, setShowReviewModal] = useState(false); // State to control review modal visibility
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]); // State to hold reviews

  useEffect(() => {
    // Fetch and set business details and reviews if needed
  }, []);

  const onMessageBtnClick = () => {
    setShowChat(true); // Show the ChatScreen
  };

  const submitReview = () => {
    // Handle review submission here
    const newReview = {
      id: Math.random().toString(), // Unique ID for the review
      name: 'User Name', // Replace with actual user name
      rating,
      comment
    };
    setReviews([...reviews, newReview]); // Add new review to the list
    setRating(0);
    setComment('');
    setShowReviewModal(false);
  };

  if (showChat) {
    return <ChatScreen business={business} setShowChat={setShowChat} />; // Render ChatScreen if showChat is true
  }

  return business && (
    <View>
      <ScrollView style={{ height: '91%' }}>
        <TouchableOpacity style={styles.backBtnContainer}
          onPress={() => setShowChat(false)}>
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Image source={{ uri: business?.images[0]?.url }} 
          style={{ width: '100%', height: 300 }}
        />
        <View style={styles.infoContainer}>
          <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>{business?.name}</Text>
          <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>{business?.price}</Text>
          <View style={styles.subContainer}> 
            <Text style={{ fontFamily: 'outfit-medium', color: Colors.PRIMARY, fontSize: 20 }}>
              {business?.contactPerson} 🌟 
            </Text>
            <Text style={{ color: Colors.PRIMARY, backgroundColor: Colors.PRIMARY_LIGHT,
              padding: 5, borderRadius: 5, fontSize: 14 }}>{business?.category?.name}
            </Text>
          </View>
          <Text style={{ fontSize: 17, fontFamily: 'outfit', color: Colors.GRAY }}>
            <Ionicons name="location-sharp" size={25} color={Colors.PRIMARY}  />
            {business?.address}
          </Text>
          
          {/* Message and Review Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.messagebtn}
              onPress={onMessageBtnClick}>
              <MaterialCommunityIcons name="message-text-outline" size={30} color={Colors.PRIMARY} />
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reviewBtn}
              onPress={() => setShowReviewModal(true)}>
              <FontAwesome name="star" size={30} color="gold" />
              <Text style={styles.buttonText}>Review</Text>
            </TouchableOpacity>
          </View>
          
          {/* Horizontal Line  */}
          <View style={styles.horizontalLine}></View>

          {/* About Me Section  */}
          <BusinessAboutMe business={business} />

          {/* Horizontal Line  */}
          <View style={styles.horizontalLine}></View>

          <BusinessPhotos business={business} />
          
          {/* Reviews Section */}
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsTitle}>Reviews</Text>
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <Text style={styles.reviewName}>{review.name}</Text>
                <AirbnbRating
                  count={5}
                  defaultRating={review.rating}
                  size={20}
                  showRating={false}
                  isDisabled
                />
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Booking Button */}
      <View style={styles.bookingBtnContainer}>
        <TouchableOpacity style={styles.bookingBtn}
          onPress={() => setShowModal(true)}>
          <Text style={styles.bookingBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* Booking Screen Modal  */}
      <Modal
        animationType='slide'
        visible={showModal}
      >
        <BookingModal 
          businessId={business.id}
          hideModal={() => setShowModal(false)} />
      </Modal>

      {/* Review Modal */}
      <Modal
        animationType='slide'
        visible={showReviewModal}
        onRequestClose={() => setShowReviewModal(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Leave a Review</Text>
          <AirbnbRating
            count={5}
            defaultRating={rating}
            size={30}
            onFinishRating={setRating}
            showRating
          />
          <TextInput
            style={styles.textInput}
            placeholder="Write your comment here"
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.submitBtn} onPress={submitReview}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowReviewModal(false)}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 20
  },
  infoContainer: {
    padding: 20,
    display: 'flex',
    gap: 7
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row', 
    gap: 5,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15
  },
  messagebtn: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    flex: 1,
    marginHorizontal: 5
  },
  reviewBtn: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    flex: 1,
    marginHorizontal: 5
  },
  buttonText: {
    fontSize: 12,
    color: Colors.PRIMARY,
    fontFamily: 'outfit-medium',
    marginTop: 5
  },
  horizontalLine: {
    borderWidth: 0.4,
    borderColor: Colors.GRAY,
    marginVertical: 20
  },
  bookingBtnContainer: {
    padding: 10
  },
  bookingBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    alignItems: 'center'
  },
  bookingBtnText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-medium',
    fontSize: 18
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    marginBottom: 20
  },
  textInput: {
    width: '100%',
    borderColor: Colors.GRAY,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  submitBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  submitBtnText: {
    color: Colors.WHITE,
    fontFamily: 'outfit-medium'
  },
  cancelBtn: {
    padding: 15,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center'
  },
  cancelBtnText: {
    color: Colors.PRIMARY,
    fontFamily: 'outfit-medium'
  },
  reviewsContainer: {
    padding: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    marginBottom: 10
  },
  reviewItem: {
    marginBottom: 15,
  },
  reviewName: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    marginBottom: 5
  },
  reviewComment: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: Colors.GRAY
  }
});
