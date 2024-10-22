import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

export default function PaymentScreen() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');

  const resetForm = () => {
    setSelectedCard(null);
    setEmail('');
    setCardNumber('');
    setExpiry('');
    setCVC('');
  };

  const handlePayPress = () => {
    if (!selectedCard || !email || !cardNumber || !expiry || !cvc) {
      Alert.alert("Please fill all data");
    } else {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to pay now?",
        [
          {
            text: "No",
            onPress: () => console.log("Payment Cancelled"),
            style: "cancel"
          },
          { 
            text: "Yes", 
            onPress: () => {
              console.log("Payment Confirmed");
              Alert.alert("Booking created successfully!");
              resetForm();
            } 
          }
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
       <Image source={require('./../../../assets/images/pay1.jpg')} 
        style={styles.productImage}
      />
      <Text style={styles.productName}>Card Details</Text>
      <Text style={styles.productPrice}>Rs.1100</Text>

      {/* Card Selection */}
      <View style={styles.cardSelection}>
        <TouchableOpacity 
          style={[styles.cardOption, selectedCard === 'Visa' && styles.selectedCard]}
          onPress={() => setSelectedCard('Visa')}
        >
          <Image source={require('./../../../assets/images/Visa.png')} 
            style={styles.cardImage}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.cardOption, selectedCard === 'MasterCard' && styles.selectedCard]}
          onPress={() => setSelectedCard('MasterCard')}
        >
          <Image source={require('./../../../assets/images/MasterCard_Logo.svg.png')} 
            style={styles.cardImage}
          />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#888"
      />

      <Text style={styles.inputLabel}>Card Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
        placeholderTextColor="#888"
      />
      <View style={styles.cardRow}>
        <TextInput
          style={[styles.input, {flex: 1, marginRight: 8}]}
          placeholder="MM / YY"
          keyboardType="numeric"
          value={expiry}
          onChangeText={setExpiry}
          placeholderTextColor="#888"
        />
        <TextInput
          style={[styles.input, {flex: 1}]}
          placeholder="CVC"
          keyboardType="numeric"
          value={cvc}
          onChangeText={setCVC}
          placeholderTextColor="#888"
        />
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayPress}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  productImage: {
    width: 400,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
   
   
  },
  productName: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  productPrice: {
    fontSize: 18,
    color: '#4caf50',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  cardSelection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  cardOption: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#f7f7f7',
  },
  selectedCard: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e9',
  },
  cardImage: {
    width: 60,
    height: 40,
  },
  input: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  payButton: {
    backgroundColor: '#9f5bff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#F1DEFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
