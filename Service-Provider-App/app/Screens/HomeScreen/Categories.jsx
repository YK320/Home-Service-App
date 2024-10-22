import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalApi from '../../Utils/GlobalApi';
import Heading from '../../Components/Heading';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export const getCategories = async () => {
    const resp = await GlobalApi.getCategories();
    return resp?.categories || [];
};

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    return (
        <View style={{ marginTop: 10 }}>
            {/* <Heading text={'Categories'} isViewAll={true} /> */}
            <FlatList
                data={categories}
                numRow={4}
                renderItem={({ item, index }) => index <= 3 && (
                    <TouchableOpacity style={styles.container}
                        onPress={() => navigation.push('business-list', {
                            category: item.name
                        })}>
                        <View style={styles.iconContainer}>
                            <Image source={{ uri: item?.icon?.url }}
                                style={{ width: 50, height: 50 }} />
                        </View>
                        <Text style={{ fontFamily: 'outfit-medium', fontSize:20,  marginTop: 5 }}>
                            {item?.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        display:'flex',
        flexDirection:'row',
        gap:15,
        backgroundColor:Colors.PRIMARY_LIGHT,
        borderRadius:20,
        marginVertical:10
    
    },
    iconContainer: {
       
        padding: 27,
        borderRadius: 20,
    }
});
