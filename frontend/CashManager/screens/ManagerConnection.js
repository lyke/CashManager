import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Style from '../styles/style';

export default function ManagerConnection() {

  const styles = Style;
  const route = useRoute();
  const { products } = route.params;
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleConnection = async () => {
    // try {
    //   const response = await fetch('https://cash-manager-back.vercel.app/api/auth');
    //   const data = await response.json();
    // } catch (error) {
      //   console.error('Error fetching products', error);
      // }
      if (username == "yvanyvan" && password == "yvanyvan") {
        navigation.navigate('ManagerInterface', { produit: products });
      } else {
        setMessage("The Username or the password is wrong !")
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Espace Administrateur</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Connexion</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
        <Text style={{color:'red'}}>{message}</Text>
        <TouchableOpacity onPress={handleConnection} style={styles.button}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
