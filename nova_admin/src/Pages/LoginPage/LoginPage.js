import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { postApi } from '../../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please fill in both email and password');
      return;
    }

    setLoading(true);

    try {
      const response = await postApi('login', {
        email,
        password,
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        // Alert.alert('Login Successful', `Welcome ${data.name || 'Admin'}`);
        await AsyncStorage.setItem('userToken', data.token);
        navigation.replace('MainApp');
        // You can navigate or store token here
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to server');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Sign In'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'white',
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
