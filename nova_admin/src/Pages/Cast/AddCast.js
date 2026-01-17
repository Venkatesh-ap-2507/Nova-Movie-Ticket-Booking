import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import { authorizedPostApi } from '../../../api';

export default function App({ navigation }) {
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    const handleSubmit = () => {
        if (!name || !job || !photoUrl) {
            Alert.alert('Please fill all fields');
            return;
        }

        console.log({ name, job, photoUrl });
        // Alert.alert('Submitted successfully!');
        authorizedPostApi('/add-cast', { name, job, photoUrl }).then((response) => {
            console.log(response.status);
            if (response.status === 400) {
                Alert.alert('Error', "Screen name already exists. Please choose a different name.");
                return
            } else if (response.status === 401) {

            } else if (response.ok) {
                response.json().then((data) => {
                    Alert.alert('Success', data.message);

                    // Navigate to the Screens tab via its drawer wrapper
                    //   navigation.navigate('ScreensDrawer');
                    navigation.goBack();
                }).catch((error) => {
                    console.error(error);
                });
            }
            else {
                Alert.alert('Error', 'Failed to add screen. Please try again.');
            }
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: '70%' }}>
                <Text style={styles.title}>Add Cast Member</Text>

                <View style={styles.imageContainer}>
                    {/* <Image source={{ uri: photoUrl }} style={styles.image} /> */}
                    <Image
                        source={{
                            uri: photoUrl || 'https://cdn-icons-png.flaticon.com/512/2815/2815428.png',
                        }}
                        style={styles.image}
                    />
                    
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Position / Job (e.g. Actor)"
                    value={job}
                    onChangeText={setJob}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Photo URL"
                    value={photoUrl}
                    onChangeText={setPhotoUrl}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 16,
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
        marginBottom: 16,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        padding: 10,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    removeLink: {
        color: '#FF3B30',
        fontWeight: '600',
        fontSize: 14,
    },
});
