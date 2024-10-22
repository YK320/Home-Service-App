import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from './Header';
import Categories from './Categories';

export default function HomeScreen() {
  return (
    <ScrollView>
      {/* Header */}
      <Header />
      <View style={{ padding: 20 }}>
        {/* Categories */}
        <Categories />
      </View>
    </ScrollView>
  );
}
