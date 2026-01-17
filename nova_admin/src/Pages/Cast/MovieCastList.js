import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import { StyleSheet } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { authorizedGetApi } from '../../../api';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';


export default function App({ navigation, route }) {
    const casts = route.params?.casts;
    // const [cast, setCast] = useState([]);

    const handlePress = () => {
        navigation.navigate('addNewScreen');
    };

    // useFocusEffect(
    //     useCallback(() => {
    //         console.log("called");
    //         authorizedGetApi('get-casts').then((response) => {
    //             if (response.ok) {
    //                 response.json().then((data) => {
    //                     // console.log(data);
    //                     setCast(data.data);
    //                 });
    //             }
    //         });
    //     }, [])
    // );
    

    const renderItem = ({ item }) => (
        <TouchableOpacity
          style={styles.screenCard}
        //   onPress={() => navigation.navigate('ScreenDetail', { screen: item })}
        >
          <View style={styles.cardContent}>
            <Image
              source={{
                uri: item.photo || 'https://cdn-icons-png.flaticon.com/512/2815/2815428.png',
              }}
              style={styles.avatar}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.screenTitle}>{item.name}</Text>
              <Text style={styles.seatCount}>{item.job}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );


    return (
        <SafeAreaView style={styles.container}>
            
            {casts.length === 0 ? (
                <View style={styles.text}>
                    <Text>No cast added</Text>
                </View>
            ) : (
                <FlatList
                    data={casts}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                />
            )}

            <TouchableOpacity style={styles.fab} onPress={handlePress}>
                <Ionicons name="add" size={28} color="#fff" />
                <Ionicons name="add-outline" size={28} color="#fff" />

            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ccc',
      },
      
      cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },      
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        height: '100%',
    },
    text: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        padding: 16,
        paddingBottom: 100,
    },
    screenCard: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        elevation: 2,
        marginBottom: 12,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    seatCount: {
        fontSize: 14,
        color: '#555',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#007AFF',
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        zIndex: 10, // 👈 ensure it's on top
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

});
