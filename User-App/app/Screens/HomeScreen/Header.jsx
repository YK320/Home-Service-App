import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import { FontAwesome } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const { user } = useUser();
  const navigation = useNavigation();

  const handleLogout = () => {
    // Perform logout logic here, e.g., clearing tokens
    navigation.navigate('Login'); // Navigate to the login screen
  };

  return user && (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileMainContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
          <View>
            <Text style={{ color: Colors.WHITE, fontFamily: 'outfit' }}>Welcome,</Text>
            <Text style={{ color: Colors.WHITE, fontSize: 20, fontFamily: 'outfit-medium' }}>{user?.fullName}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <AntDesign name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* Search Bar Section */}
      <View style={styles.searchBarContainer}>
        <TextInput placeholder='Search' style={styles.textInput} />
        <FontAwesome name="search" style={styles.searchbtn} size={24} color={Colors.PRIMARY} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    width: '85%',
    fontSize: 16,
    fontFamily: 'outfit',
  },
  searchBarContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  searchbtn: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 8,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
});
