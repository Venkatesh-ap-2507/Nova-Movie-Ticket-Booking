import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { authorizedGetApi } from '../../../api';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import ImageSlider from '../../Components/ImageSlider/ImageSlider';
import { convertToVisibleDateAndGetYear } from '../../Components/Utils/Utils';

export default function App({ navigation, route }) {
    const movie_id = route.params?.id;
    const [movie, setMovie] = useState([]);

    useFocusEffect(
        useCallback(() => {
            console.log("called");
            authorizedGetApi(`get-movie/${movie_id}`).then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        console.log(data.data.genres);
                        setMovie(data.data);
                    });
                }
            });
        }, [])
    );

    const goToMovieCastList = () => {
        navigation.navigate('MovieCastList', { title: movie.name, casts: movie.casts });
    };

    return (
        <SafeAreaView>
            <ScrollView>
                {movie.photoUrls && movie.photoUrls.length > 0 &&
                    <View style={{
                        marginTop: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 30,
                        paddingTop: 30,
                        borderColor: '#000',
                    }}>
                        <ImageSlider images={movie.photoUrls} />
                    </View>
                }
                <View style={{
                    paddingHorizontal: 30,
                    // paddingVertical: 20,
                    paddingTop: 20,
                    borderColor: '#000',
                }}>
                    <View style={{
                        marginTop: 10,
                        marginBottom: 10,

                        padding: 20,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            // marginBottom: 16,
                        }}>
                            {movie.name}
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4, }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',

                            }}>
                                {/* {movie.comming ? 'Coming soon' : convertToVisibleDateAndGetYear(movie.releasedDate)} */}
                                {movie.comming ? convertToVisibleDateAndGetYear(movie.createdAt) : convertToVisibleDateAndGetYear(movie.releasedDate)}
                            </Text>

                            <View style={{
                                height: 4,
                                width: 4,
                                borderRadius: 2.5,
                                backgroundColor: '#8f8f8f',
                                marginHorizontal: 4,
                            }} />

                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                paddingVertical: 4,
                            }}>
                                {movie.filmCertificate}
                            </Text>

                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 0, }}>
                            <Text style={{
                                fontSize: 17,

                            }}>
                                {movie.description}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{
                    paddingHorizontal: 30,
                    // paddingVertical: 20,
                    paddingTop: 10,
                    borderColor: '#000',
                }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        // marginBottom: 16,
                    }}>
                        More Details
                    </Text>
                </View>

                <View style={{
                    paddingHorizontal: 30,
                    // paddingVertical: 20,
                    paddingTop: 10,
                    borderColor: '#000',
                }}>
                    <View style={{
                        marginTop: 10,
                        marginBottom: 10,

                        padding: 20,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            // marginBottom: 16,
                        }}>
                            Genres
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, flexWrap: 'wrap' }}>
                            {movie.genres?.map((gen_, index) => (
                                <Text key={index} style={{ fontSize: 17 }}>
                                    {gen_}{index < movie.genres.length - 1 ? ', ' : ''}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>


                <View style={{
                    paddingHorizontal: 30,
                    // paddingVertical: 20,
                    paddingTop: 0,
                    borderColor: '#000',
                }}>
                    <View style={{
                        marginTop: 10,
                        marginBottom: 10,

                        padding: 20,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            // marginBottom: 16,
                        }}>
                            Audio
                        </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, flexWrap: 'wrap' }}>
                            {movie.languages?.map((lan, index) => (
                                <Text key={index} style={{ fontSize: 17 }}>
                                    {lan.name}{index < movie.genres.length - 1 ? ', ' : ''}
                                </Text>
                            ))}
                        </View>
                    </View>
                </View>

                <View style={{
                    paddingHorizontal: 30,
                    // paddingVertical: 20,
                    paddingTop: 0,
                    marginBottom: 10,
                    borderColor: '#000',
                }}>
                    <View style={{
                        marginTop: 10,
                        marginBottom: 10,
                        justifyContent: 'center',
                        padding: 20,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 10,
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <Text style={{
                                fontSize: 22,
                                fontWeight: 'bold',
                            }}>
                                Cast
                            </Text>
                            <TouchableOpacity style={styles.fab} onPress={goToMovieCastList}>
                                <Ionicons name="arrow-forward" size={24} color="black" />
                            </TouchableOpacity>

                        </View>

                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 10, gap: 10, marginTop: 10 }}
                        >
                            {movie.casts?.map((cast, index) => (
                                <View
                                    key={index}
                                    style={{
                                        alignItems: 'center',
                                        padding: 5,
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: cast.photo || 'https://cdn-icons-png.flaticon.com/512/2815/2815428.png',
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
                                        <Text style={{ fontSize: 18, color: '#333' }}>{cast.name}</Text>
                                        <Text style={{ fontSize: 12, color: '#333' }}>{cast.job}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>

                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

});


