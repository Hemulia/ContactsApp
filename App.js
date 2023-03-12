import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
      });
      if (data.length > 0) {
        setContacts(data);
      }
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.name} - {item.phoneNumbers[0]?.number}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:30, marginBottom:80}}>Contacts</Text>
      <TouchableOpacity style={styles.button} onPress={getContacts}>
        <Text style={styles.buttonText}>Get Contacts</Text>
      </TouchableOpacity>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 200
  },
  button: {
    backgroundColor: '#1e88e5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    width: '100%',
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
