import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../Utils/Colors';
import PaymentScreen from './PaymentScreen';

export default function BookingConfirm({
    userName,
    userEmail,
    time,
    date,
    price,
    businessId,
    phoneNumber,
    location,
    hideModal,
    business
}) {
    const [showPaymentScreen, setShowPaymentScreen] = useState(false);

    const proceedToPayment = () => {
        setShowPaymentScreen(true);
    };

    const goBack = () => {
        // Logic to go back
    };

    if (showPaymentScreen) {
        return <PaymentScreen />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Booking Confirmation</Text>
            
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.info}>{userName}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.info}>{userEmail}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Time:</Text>
                <Text style={styles.info}>{time}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.info}>{date}</Text>
            </View>
            {/* <View style={styles.infoContainer}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.info}>{business?.price}</Text>
            </View> */}
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.info}>{phoneNumber}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Location:</Text>
                <Text style={styles.info}>{location}</Text>
            </View>

            <TouchableOpacity style={styles.proceedButton} onPress={proceedToPayment}>
                <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={goBack}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.LIGHT_BACKGROUND,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        marginBottom: 30,
        textAlign: 'center',
        fontFamily: 'outfit-bold',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.BORDER_GRAY,
    },
    label: {
        fontSize: 18,
        fontFamily: 'outfit-medium',
        color: Colors.SECONDARY_TEXT,
    },
    info: {
        fontSize: 18,
        fontFamily: 'outfit',
        color: Colors.PRIMARY_TEXT,
    },
    proceedButton: {
        marginTop: 30,
        paddingVertical: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 25,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    proceedButtonText: {
        textAlign: 'center',
        color: Colors.WHITE,
        fontSize: 18,
        fontFamily: 'outfit-bold',
    },
    backButton: {
        marginTop: 20,
        paddingVertical: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 25,
        elevation: 2,
        
    },
    backButtonText: {
        textAlign: 'center',
        color: Colors.WHITE,
        fontSize: 18,
        fontFamily: 'outfit-bold',
    },
});
