import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    // SafeAreaView,
    StyleSheet,
    Image,
    Alert,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authorizedPostApi } from '../../../api';
import DatePickerComponent from './DatePickerComponent';
import MovieTimeLenghtPicker from '../../Components/MovieTimeLenghtPicker/MovieTimeLenghtPicker';
import RadioButtonReleasedDateStatus from '../../Components/RadioButtonReleasedDateStatus/RadioButtonReleasedDateStatus';
import MoviePoster from '../../Components/MoviePoster/MoviePoster';
import ImageSlider from '../../Components/ImageSlider/ImageSlider';
import MultiSelectInputForCast from '../../Components/MultiSelectInput/MultiSelectInputForCast';
import MultiSelectInputForGenre from '../../Components/MultiSelectInput/MultiSelectInputForGenre';
import RNPickerSelect from 'react-native-picker-select';

export default function App({ navigation }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [filmCertificate, setFilmCertificate] = useState(null);
    const [time, setTime] = useState('');
    const [genres, setGenres] = useState([]);
    const [casts, setCasts] = useState([]);
    const [photoUrls, setPhotoUrls] = useState(['']);
    const [selectedDate, setSelectedDate] = useState(null);
    const [checked, setChecked] = React.useState('commingSoon');


    const handleSubmit = () => {
        const data = {};

        if (photoUrls.length == 0) {
            Alert.alert('Add at least one image');
            return;
        } else if (photoUrls.length == 1 && photoUrls[0] == '') {
            Alert.alert('Add at least one image');
            return;
        } else {
            data.photoUrls = photoUrls;
        }
        if (casts.length == 0) {
            Alert.alert('Add at least one cast');
            return;
        } else {
            const castIds = casts.map((cast) => cast._id);
            data.casts = castIds;
        }
        if (genres.length == 0) {
            Alert.alert('Add at least one genre');
            return;
        } else {
            data.genres = genres;
        }

        if (checked == 'selectDate') {
            data.comming = false;
            if (selectedDate == null) {
                Alert.alert('Please select a date');
                return;
            } else {
                data.releasedDate = selectedDate;
                // data.selectedDate = selectedDate.toString().split('T')[0];
            }
            data.time = time;
            // if (time.hours == '0' && time.minutes == '0') {
            //     Alert.alert('Please select a time');
            //     return;
            // }else{
            //     data.time = time;
            // }
        } else {
            data.comming = true;
        }
        if (name == '') {
            Alert.alert('Please enter a name');
            return;
        } else {
            data.name = name;
        }
        
        if (filmCertificate == null) {
            Alert.alert('Please select film certificate');
            return;
        } else {
            data.filmCertificate = filmCertificate;
        }
        if (description == "") {
            Alert.alert('Please enter a description');
            return;
        } else {
            data.description = description;
        }
        console.log(data);

        authorizedPostApi('/add-movie', data).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    Alert.alert('Success', data.message);
                    navigation.goBack();
                }).catch(console.error);
            } else {
                Alert.alert('Error', 'Failed to add screen.');
            }
        });

    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, }}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.title}>Add Movie</Text>

                    <View style={styles.imageContainer}>
                        <ImageSlider images={photoUrls} />
                    </View>

                    <TextInput
                        style={{
                            height: 50,
                            borderColor: '#ccc',
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: 12,
                            fontSize: 16,
                        }}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />

                    <View
                        style={{
                            height: 50,
                            flexDirection: 'row',
                            marginTop: 10,
                        }}
                    >
                        <TextInput
                            style={{
                                borderColor: '#ccc',
                                borderWidth: 1,
                                borderRadius: 8,
                                paddingHorizontal: 12,
                                fontSize: 16,
                                width: '100%',
                            }}
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>


                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            padding: 7,
                            borderColor: '#ccc',
                            borderWidth: 1,
                            borderRadius: 10,
                            marginVertical: 10,
                            shadowOpacity: 0.2,
                        }}
                    >
                        <RadioButtonReleasedDateStatus checked={checked} setChecked={setChecked} />
                    </View>

                    {checked === 'selectDate' && (
                        <>
                            <View style={{ marginVertical: 0, marginBottom: 10 }}>
                                <DatePickerComponent setSelectedDate={setSelectedDate} />
                            </View>

                            <View style={styles.pickerContainer}>
                                <View >
                                    <Text style={{ color: 'red', width: 90, fontSize: 10, textAlign: 'left' }}>(Optional)</Text>
                                    <Text style={{ color: 'black', fontSize: 17, paddingTop: 3, paddingLeft: 5 }}>Lenght</Text>
                                </View>
                                <MovieTimeLenghtPicker setTime={setTime} />
                            </View>
                        </>
                    )}

                    <MoviePoster photoUrls={photoUrls} setPhotoUrls={setPhotoUrls} />

                    <Text style={{ fontSize: 16, }}>Select cast</Text>
                    <MultiSelectInputForCast tags={casts} setTags={setCasts} />

                    <Text style={{ fontSize: 16, marginTop: 10 }}>Select genres</Text>
                    <MultiSelectInputForGenre tags={genres} setTags={setGenres} />

                    {/* <Text style={{ fontSize: 16, marginTop: 10 }}>Select Languages</Text>
                    <MultiSelectInputForGenre tags={genres} setTags={setGenres} /> */}

                    <Text style={{ fontSize: 16, marginTop: 10,  }}>Film Certificates</Text>
                    <View style={{
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 8,
                        marginHorizontal: 1,
                        marginTop: 10,
                    }}>
                        <RNPickerSelect
                            onValueChange={(value) => setFilmCertificate(value)}
                            items={[
                                { label: 'U', value: 'U' },
                                { label: 'U/A 7+', value: 'U/A 7+' },
                                { label: 'U/A 13+', value: 'U/A 13+' },
                                { label: 'U/A 16+', value: 'U/A 16+' },
                                { label: 'A', value: 'A' },
                                { label: 'S', value: 'S' },
                            ]}
                        />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        // marginBottom: 16,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
    image: {
        width: '100%',
        aspectRatio: 1.5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
});
