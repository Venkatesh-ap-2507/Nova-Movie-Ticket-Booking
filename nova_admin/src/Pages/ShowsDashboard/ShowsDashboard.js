
import { View, Text, SafeAreaView, Button, TouchableOpacity, ScrollView, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { convertToVisibleDateAndGetYear, convertToVisibleDate } from '../../Components/Utils/Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { authorizedGetApi } from '../../../api';

export default function App({ navigation }) {
    const [movies, setMovies] = useState([]);

    const goToMovieBoard = () => {
        navigation.navigate('MovieBoard');
    };

    // useFocusEffect(
    //     useCallback(() => {
    //         console.log("called");
    //         authorizedGetApi('get-movies').then((response) => {
    //             if (response.ok) {
    //                 response.json().then((data) => {
    //                     // console.log(data.data);
    //                     setMovies(data.data);
    //                     // setMovies(Array(10).fill(data.data).flat());
    //                 });
    //             }
    //         });
    //     }, [])
    // );

    return (
        <SafeAreaView>
            <View style={{
                paddingHorizontal: 10,
                paddingTop: 0,
                marginBottom: 10,
                borderColor: '#000',
            }}>
                <View style={{
                    marginTop: 10,
                    marginBottom: 10,
                    justifyContent: 'center',
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 10,
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                        }}>
                            Shows
                        </Text>
                        <TouchableOpacity
                            // onPress={goToMovieBoard}
                        >
                            <Ionicons name="arrow-forward" size={24} color="black" />
                        </TouchableOpacity>

                    </View>

                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10, gap: 10, marginTop: 10 }}
                    >
                        {movies?.map((movie, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    alignItems: 'center',
                                    padding: 5,
                                }}
                                onPress={() => navigation.navigate('MovieOverview', { title: movie.name, id: movie._id })}
                            >
                                <Image
                                    source={{
                                        uri: movie.photoUrls[0] || 'https://cdn-icons-png.flaticon.com/512/2815/2815428.png',
                                    }}
                                    style={{
                                        width: 55,
                                        height: 55,
                                        borderRadius: 30,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                    }}
                                />
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 18, color: '#333' }}>{movie.name}</Text>
                                    <Text style={styles.seatCount}>{movie.comming ? 'Comming soon' : convertToVisibleDate(movie.releasedDate)}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}

                    </ScrollView>
                </View>
            </View>

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
