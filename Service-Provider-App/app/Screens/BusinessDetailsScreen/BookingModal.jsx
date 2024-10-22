import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ToastAndroid, ScrollView, TextInput, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';
import TotalPay from './TotalPayModal';

export default function BookingModal({ businessId, hideModal }) {
    const [timeList, setTimeList] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { user } = useUser();
    const navigation = useNavigation();

    useEffect(() => {
        getTime();
    }, []);

    const getTime = () => {
        const times = [];
        for (let i = 8; i <= 12; i++) {
            times.push({ time: `${i}:00 AM` });
            times.push({ time: `${i}:30 AM` });
        }
        for (let i = 1; i <= 7; i++) {
            times.push({ time: `${i}:00 PM` });
            times.push({ time: `${i}:30 PM` });
        }
        setTimeList(times);
    };

    const createNewBooking = () => {
        if (!selectedTime || !selectedDate || !phoneNumber || !location) {
            ToastAndroid.show('Please fill all the fields', ToastAndroid.LONG);
            return;
        }

        const data = {
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress.emailAddress,
            time: selectedTime,
            date: moment(selectedDate).format('DD-MMM-yyyy'),
            businessId: businessId,
            phoneNumber: phoneNumber,
            location: location
        };

        GlobalApi.createBooking(data).then(resp => {
            console.log("Response", resp);
            ToastAndroid.show('Booking Created Successfully!', ToastAndroid.LONG);
           setShowModal(true);
        });
    };

    return (
        <ScrollView style={{ height: '91%' }}>
            <KeyboardAvoidingView style={{ padding: 20 }}>
                <TouchableOpacity style={styles.backButton} onPress={hideModal}>
                    <Ionicons name="arrow-back-outline" size={30} color="black" />
                    <Text style={styles.backButtonText}>Booking</Text>
                </TouchableOpacity>

                <Heading text={'Select Date'} />
                <View style={styles.calenderContainer}>
                    <CalendarPicker
                        onDateChange={setSelectedDate}
                        width={340}
                        minDate={Date.now()}
                        todayBackgroundColor={Colors.BLACK}
                        todayTextStyle={{ color: Colors.WHITE }}
                        selectedDayColor={Colors.PRIMARY}
                        selectedDayTextColor={Colors.WHITE}
                    />
                </View>

                <View style={{ marginTop: 20 }}>
                    <Heading text={'Select Time Slot'} />
                    <FlatList
                        data={timeList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => setSelectedTime(item.time)}>
                                <Text style={selectedTime === item.time ? styles.selectedTime : styles.unSelectedTime}>{item.time}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                <View style={{ paddingTop: 20 }}>
                    <Heading text={'Phone number'} />
                    <TextInput
                        placeholder='Enter your phone number'
                        keyboardType='phone-pad'
                        style={styles.noteTextArea}
                        onChangeText={setPhoneNumber}
                    />
                </View>

                <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <Heading text={'Location'} />
                    <TextInput
                        placeholder='Enter your location'
                        style={styles.noteTextArea}
                        onChangeText={setLocation}
                    />
                </View>

                <TouchableOpacity style={styles.totalpayBtn} onPress={createNewBooking}>
                    <Text style={styles.totalPayText}>Confirm Total Pay</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

            <Modal
                animationType='slide'
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <TotalPay hideModal={() => setShowModal(false)} />
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    backButton: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    backButtonText: {
        fontSize: 25,
        fontFamily: 'outfit-medium'
    },
    calenderContainer: {
        backgroundColor: Colors.PRIMARY_LIGHT,
        padding: 20,
        borderRadius: 15
    },
    selectedTime: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        paddingHorizontal: 18,
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE
    },
    unSelectedTime: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        paddingHorizontal: 18,
        color: Colors.PRIMARY
    },
    noteTextArea: {
        borderWidth: 1,
        borderRadius: 15,
        textAlignVertical: 'top',
        padding: 10,
        fontSize: 16,
        fontFamily: 'outfit',
        borderColor: Colors.PRIMARY
    },
    totalpayBtn: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99
    },
    totalPayText: {
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        color: Colors.WHITE,
        fontSize: 18
    }
});
