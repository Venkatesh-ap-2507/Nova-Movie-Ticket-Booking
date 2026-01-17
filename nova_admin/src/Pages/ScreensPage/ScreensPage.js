import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { authorizedGetApi } from '../../../api';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

export default function App({ navigation }) {
    const [screens, setScreens] = useState([]);

    const handlePress = () => {
        navigation.navigate('addNewScreen');
    };

    useFocusEffect(
        useCallback(() => {
            console.log("called");
            authorizedGetApi('get-screens').then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        console.log(data);
                        setScreens(data);
                    });
                }
            });
        }, [])
    );

    // const renderItem = ({ item }) => (
    //     <View style={styles.screenCard}>
    //         <Text style={styles.screenTitle}>{item.name}</Text>
    //         <Text style={styles.seatCount}>Seats: {item.seatCount || 0}</Text>
    //     </View>
    // );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.screenCard}
            onPress={() => navigation.navigate('ScreenDetail', { screen: item })}
        >
            <Text style={styles.screenTitle}>{item.name}</Text>
            <Text style={styles.seatCount}>Seats: {item.seatCount || 0}</Text>
        </TouchableOpacity>
    );
    

    return (
        <SafeAreaView style={styles.container}>
            {screens.length === 0 ? (
                <View style={styles.text}>
                    <Text>No screens added</Text>
                </View>
            ) : (
                <FlatList
                    data={screens}
                    keyExtractor={(item) => item._id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                />
            )}

            <TouchableOpacity style={styles.fab} onPress={handlePress}>
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});
