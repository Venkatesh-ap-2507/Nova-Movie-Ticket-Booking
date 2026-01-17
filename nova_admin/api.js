
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const link = API_URL + '/api/adminCall/';

export async function postApi(linkTo, bodyData) {
  try {
    const response = await fetch(link + linkTo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });
    return response;
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
}

export async function authorizedPostApi(linkTo, bodyData) {
  try {
    const response = await fetch(link + linkTo, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + await AsyncStorage.getItem('userToken'),
      },
      body: JSON.stringify(bodyData),
    });
    return response;
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
}

export async function authorizedGetApi(endpoint) {
  try {
    console.log(link + endpoint)
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${link}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
}


export async function getApi(linkTo) {
  try {
    const response = await fetch(link + linkTo);
    return response;
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
}