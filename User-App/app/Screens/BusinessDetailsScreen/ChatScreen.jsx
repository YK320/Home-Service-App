import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../Utils/Colors'; 
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ChatScreen({ business, setShowChat }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const navigation = useNavigation(); // Access navigation

  const sendMessage = () => {
    if (inputMessage.trim() === '') {
      return;
    }
    const newMessage = { id: messages.length, text: inputMessage, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Navigate to MessageScreen with message data
    navigation.navigate('MessageScreen', { message: newMessage });
  }

  const renderMessageItem = ({ item }) => (
    <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtnContainer}
        onPress={() => setShowChat(false)}>
        <Ionicons name="arrow-back-outline" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Message</Text>
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.WHITE,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.PRIMARY,
    marginLeft: 55
  },
  messageList: {
    flex: 1,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.PRIMARY,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.GRAY_LIGHT,
  },
  messageText: {
    color: Colors.WHITE,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: Colors.GRAY_LIGHT,
    paddingTop: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
  },
  backBtnContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 20
  },
});
