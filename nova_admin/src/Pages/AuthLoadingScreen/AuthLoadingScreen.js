import React, { useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Temporary screen to handle token check and redirect
export default function AuthLoadingScreen({ navigation }) {

  useEffect(() => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const checkToken = async () => {
      // await sleep(5000);

      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        navigation.replace('MainApp');
        // navigation.navigate('DashBoard');

      } else {
        navigation.replace('LoginPage');
      }
    };

    checkToken();
  }, []);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <ActivityIndicator size="large" /> */}
      <Text>htdgfgjhstasgfdhfjhjkydgdvthsfbgnhrtcsrgdbfnhrctgfxvchrvfbdvcbhybrvegbdvft Loading...</Text>
    </View>
  );
}
