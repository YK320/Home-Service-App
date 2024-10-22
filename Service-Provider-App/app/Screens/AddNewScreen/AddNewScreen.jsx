import { View, Image, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../../Utils/Colors';
import { Picker } from '@react-native-picker/picker';
import { getCategories } from '../HomeScreen/Categories';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function AddNewScreen({ hideModal }) {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]); // State for multiple images
  const navigation = useNavigation(); // Get the navigation object

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  /**
   * Used to Pick Image from Gallery
   */
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickMultipleImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.map(asset => asset.uri)]);
    }
  };

  const onSubmitMethod = (value) => {
    value.image = image;
    value.images = images;
    console.log(value);
    navigation.navigate('Home'); // Navigate back to the homepage
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <TouchableOpacity style={styles.backBtnContainer} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color="black" />
          <Text style={styles.heading}>Add New Service</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontFamily: "outfit-medium", color: Colors.GRAY,marginLeft:40 }}>Create New Service and Start Working</Text>

        <Formik
          initialValues={{ name: '', email: '', category: '', price: '', address: '', about: '', images: [] }}
          onSubmit={values => onSubmitMethod(values)}
          validate={(values) =>{
            const errors = {}
            if(!values.name)
            {
                console.log("Enter your Name");
                ToastAndroid.show('Please enter Details',ToastAndroid.SHORT )
                errors.name="Name Must be there"
            }
            return errors
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors }) => (
            <View>
              <TouchableOpacity onPress={pickImage}>
                {image ?
                  <Image source={{ uri: image }} style={styles.image} /> :
                  <Image source={require('./../../../assets/images/user.png')} style={styles.image} />}
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder="Name"
                value={values.name}
                onChangeText={handleChange('name')}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={values.email}
                onChangeText={handleChange('email')}
              />
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={values.category}
                  onValueChange={value => setFieldValue('category', value)}
                >
                  {categories.map((item, index) => (
                    <Picker.Item key={index} label={item.name} value={item.name} />
                  ))}
                </Picker>
              </View>

              <TextInput
                style={styles.input}
                placeholder="Price"
                value={values.price}
                keyboardType="number-pad"
                onChangeText={handleChange('price')}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                numberOfLines={3}
                value={values.address}
                onChangeText={handleChange('address')}
              />
              <TextInput
                style={styles.input}
                placeholder="About"
                numberOfLines={5}
                value={values.about}
                onChangeText={handleChange('about')}
              />

              <Text style={styles.label}>Upload more images</Text>
              <TouchableOpacity onPress={pickMultipleImages} style={styles.uploadBtn}>
                <Text style={styles.uploadText}>Pick Images</Text>
              </TouchableOpacity>
              <View style={styles.imageContainer}>
                {images.map((uri, index) => (
                  <Image key={index} source={{ uri }} style={styles.additionalImage} />
                ))}
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.messagebtn} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Save & Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 17,
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    textAlignVertical: 'top'
  },
  messagebtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
    marginHorizontal: 10
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 8,
    gap: 8
  },
  backBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  heading: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    color: Colors.PRIMARY,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 15
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 10
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    color: Colors.WHITE,
    fontSize: 18
  },
  label: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    color: Colors.GRAY,
    marginTop: 15,
    marginHorizontal: 10
  },
  uploadBtn: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: Colors.LIGHTGRAY
  },
  uploadText: {
    fontSize: 16,
    color: Colors.PRIMARY
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginTop: 10
  },
  additionalImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 5
  }
});
