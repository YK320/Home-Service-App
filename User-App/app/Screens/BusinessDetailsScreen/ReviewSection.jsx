import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../Utils/Colors'; // Import your colors utility if needed

export default function ReviewSection({ business }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);

  const submitReview = () => {
    if (newReview.trim() === '' || rating === 0) {
      return;
    }
    setReviews([...reviews, { id: reviews.length, text: newReview, rating }]);
    setNewReview('');
    setRating(0);
  }

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.reviewText}>{item.text}</Text>
      <Text style={styles.reviewRating}>Rating: {item.rating}/5</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reviews</Text>
      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.reviewList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a review..."
          value={newReview}
          onChangeText={setNewReview}
        />
        <TextInput
          style={styles.ratingInput}
          placeholder="Rating (1-5)"
          keyboardType="numeric"
          value={rating.toString()}
          onChangeText={(text) => setRating(parseFloat(text))}
        />
        <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.PRIMARY,
  },
  reviewList: {
    marginBottom: 10,
  },
  reviewContainer: {
    backgroundColor: Colors.GRAY_LIGHT,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
    color: Colors.BLACK,
  },
  reviewRating: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 2,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    marginRight: 5,
  },
  ratingInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    marginRight: 5,
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
});
