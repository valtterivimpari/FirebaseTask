import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore'; // Import Firestore utilities
import { firestore } from './firebase/Config'; // Import your Firebase config
import { formatFirestoreTimestamp } from './helper/Functions';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesQuery = query(collection(firestore, 'messages'), orderBy('createdAt', 'desc')); // Order by createdAt in descending order
  
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const messagesArray = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const formattedData = {
          id: doc.id,
          text: data.text,
          createdAt: formatFirestoreTimestamp(data.createdAt), // Format Firestore timestamp
          // Include other fields as needed
          // For example:
          // sender: data.sender,
          // recipient: data.recipient,
        };
        messagesArray.push(formattedData);
      });
      setMessages(messagesArray);
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {messages.map((message) => (
          <View key={message.id} style={styles.messageContainer}>
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.timestampText}>
              Created: {message.createdAt}
            </Text>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50, // Added to ensure ScrollView is not covered by the status bar
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#e0e0e0', // Background color for message container
    marginVertical: 5, // Adjust vertical margin between messages
    borderRadius: 8, // Add some border radius for a rounded look
  },
  messageText: {
    fontSize: 16, // Adjust the font size of the message text
  },
  timestampText: {
    fontSize: 12, // Smaller font size for the timestamp
    color: '#666', // Dim color for the timestamp
  },
  newMessageContainer: {
    flexDirection: 'row', // Align textInput and button horizontally
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc', // Add a border on top of the new message container
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5', // Background color for the textInput
    borderRadius: 20, // Round the corners of the textInput
    marginRight: 10, // Add some space between textInput and button
  },
  button: {
    backgroundColor: '#007bff', // Button background color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20, // Round the corners of the button
  },
  buttonText: {
    color: '#fff', // Button text color
    fontSize: 16, // Adjust the font size of the button text
  },
});
