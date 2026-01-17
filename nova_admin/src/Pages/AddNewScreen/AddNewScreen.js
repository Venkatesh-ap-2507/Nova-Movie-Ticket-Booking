// import React, { useRef, useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     TextInput,
//     ScrollView,
//     TouchableOpacity,
//     Alert,
// } from 'react-native';
// import TheaterSeating from '../../Components/TheaterSeating/TheaterSeating';
// import { authorizedPostApi } from '../../../api';

// export default function NewPage() {
//     const [numberOfRows, setNumberOfRows] = useState(1);
//     const [screenName, setScreenName] = useState('');
//     const pricingRef = useRef({});

//     const validate = (pricingData) => {
//         if (Object.entries(pricingData).length !== numberOfRows) {
//             return false;
//         };

//         for (const [key, value] of Object.entries(pricingData)) {
//             if (isNaN(parseInt(value))) {
//                 console.log('Invalid price for row:', key);
//                 return false;
//             }
//         }
//         return true;
//     }
//     const handleSave = () => {
//         const pricingData = pricingRef.current;

//         if (!validate(pricingData)) {
//             Alert.alert('Validation', 'Please enter price for every seat row.');
//             return;
//         }
//         if (!screenName) {
//             Alert.alert('Validation', 'Please enter screen name.');
//             return;
//         }

//         authorizedPostApi('/add-screen', { screenName, pricingData }).then((response) => {
//             if (response.ok) {
//                 response.json().then((data)=>{
//                     // console.log(data);
//                     Alert.alert('Success', data.message);
//                 });
//                 // navigation.navigate('ScreensPage');
//             } else {
//                 Alert.alert('Error', 'Failed to add screen. Please try again.');
//             }
//         });
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//             <View style={styles.card}>
//                 <Text style={styles.label}>Screen Name</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Enter screen name"
//                     placeholderTextColor="#999"
//                     value={screenName}
//                     onChangeText={setScreenName}
//                 />
//             </View>

//             <View style={styles.center}>
//                 <Text style={styles.screenTitle}>Screen</Text>
//             </View>

//             <View style={styles.divider} />

//             <TheaterSeating NUM_ROWS={numberOfRows} pricingRef={pricingRef} />

//             <View style={styles.rowButtons}>
//                 <TouchableOpacity
//                     style={styles.controlButton}
//                     onPress={() => setNumberOfRows(numberOfRows + 1)}
//                 >
//                     <Text style={styles.controlButtonText}>+ Add Row</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[styles.controlButton, { backgroundColor: '#FF5C5C' }]}
//                     onPress={() => numberOfRows > 1 && setNumberOfRows(numberOfRows - 1)}
//                 >
//                     <Text style={styles.controlButtonText}>– Remove Row</Text>
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.saveWrapper}>
//                 <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//                     <Text style={styles.saveButtonText}>Save</Text>
//                 </TouchableOpacity>
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     scrollContainer: {
//         padding: 16,
//         paddingBottom: 80,

//     },
//     card: {
//         backgroundColor: '#fff',
//         padding: 14,
//         borderRadius: 12,
//         elevation: 3,
//         marginBottom: 16,
//     },
//     label: {
//         fontWeight: 'bold',
//         fontSize: 14,
//         marginBottom: 8,
//     },
//     input: {
//         height: 44,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         paddingHorizontal: 12,
//         borderRadius: 8,
//         fontSize: 16,
//         color: '#333',
//     },
//     center: {
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     screenTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         marginBottom: 0,
//     },
//     divider: {
//         borderBottomColor: '#aaa',
//         borderBottomWidth: 1.5,
//         marginVertical: 12,
//         width: '80%',
//         alignSelf: 'center',
//     },
//     rowButtons: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         gap: 12,
//         marginTop: 24,
//         marginBottom: 32,
//     },
//     controlButton: {
//         backgroundColor: '#007AFF',
//         paddingHorizontal: 18,
//         paddingVertical: 10,
//         borderRadius: 8,
//     },
//     controlButtonText: {
//         color: '#fff',
//         fontWeight: '600',
//         fontSize: 14,
//     },
//     saveWrapper: {
//         alignItems: 'center',
//         marginBottom: 40,
//     },
//     saveButton: {
//         backgroundColor: '#34C759',
//         paddingVertical: 12,
//         paddingHorizontal: 50,
//         borderRadius: 12,
//         elevation: 3,
//     },
//     saveButtonText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
// });







import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import TheaterSeating from '../../Components/TheaterSeating/TheaterSeating';
import { authorizedPostApi } from '../../../api';

export default function NewPage({ navigation }) {
    const [numberOfRows, setNumberOfRows] = useState(1);
    const [screenName, setScreenName] = useState('');
    const NUM_COLS = 9;

    const rowLabels = Array.from({ length: numberOfRows }, (_, i) =>
        String.fromCharCode(65 + i)
    );

    const handleSave = () => {

        if (!screenName) {
            Alert.alert('Validation', 'Please enter screen name.');
            return;
        }

        authorizedPostApi('add-screen', { screenName, rowLabels, NUM_COLS }).then((response) => {
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
                    navigation.navigate('MainApp', {
                        screen: 'ScreensDrawer',
                        params: { screen: 'Screens' }, // tab inside drawer
                    });

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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.card}>
                <Text style={styles.label}>Screen Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter screen name"
                    placeholderTextColor="#999"
                    value={screenName}
                    onChangeText={setScreenName}
                />
            </View>

            <View style={styles.center}>
                <Text style={styles.screenTitle}>Screen</Text>
            </View>

            <View style={styles.divider} />

            <TheaterSeating rowLabels={rowLabels} NUM_COLS={NUM_COLS} />

            <View style={styles.rowButtons}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => setNumberOfRows(numberOfRows + 1)}
                >
                    <Text style={styles.controlButtonText}>+ Add Row</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.controlButton, { backgroundColor: '#FF5C5C' }]}
                    onPress={() => numberOfRows > 1 && setNumberOfRows(numberOfRows - 1)}
                >
                    <Text style={styles.controlButtonText}>– Remove Row</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.saveWrapper}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16,
        paddingBottom: 80,
    },
    card: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 12,
        elevation: 3,
        marginBottom: 16,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 8,
    },
    input: {
        height: 44,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 12,
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 0,
    },
    divider: {
        borderBottomColor: '#aaa',
        borderBottomWidth: 1.5,
        marginVertical: 12,
        width: '80%',
        alignSelf: 'center',
    },
    rowButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginTop: 24,
        marginBottom: 32,
    },
    controlButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 8,
    },
    controlButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    saveWrapper: {
        alignItems: 'center',
        marginBottom: 40,
    },
    saveButton: {
        backgroundColor: '#34C759',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 12,
        elevation: 3,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});