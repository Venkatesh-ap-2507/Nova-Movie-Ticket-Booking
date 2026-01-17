
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import icon from './../../../assets/icon.png';
import ConfirmAlert from './../ConfirmAlert/ConfirmAlert';

export default function CustomDrawer(props) {

  const handleLogout = () => {
    ConfirmAlert({
      title: 'Logout Confirmation',
      message: 'Are you sure you want to logout?',
      cancel: () => {
        console.log('Logout Cancelled');
        // Optionally show a message
      },
      confirm: async () => {
        // await AsyncStorage.removeItem('userToken');
        await AsyncStorage.clear();
        console.log('Logged out successfully');
        props.navigation.replace('LoginPage');
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: 'center', padding: 20 }}>
          <Image
            source={icon}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
          <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 16 }}>Admin</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>admin@gmail.com</Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderColor: '#ccc',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'red' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
