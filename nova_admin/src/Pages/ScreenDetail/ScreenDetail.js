import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { authorizedGetApi } from '../../../api';
import TheaterSeating from '../../Components/TheaterSeating/TheaterSeating';

export default function ScreenDetail({ route }) {
    const { screen } = route.params;
    const [numberCol, setNumberCol] = useState(0);
    const [numberRow, setNumberRow] = useState(0);
    const [rowLabels, setRowLabels] = useState([]);

    React.useEffect(() => {
        authorizedGetApi(`/get-screen/${screen._id}`).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    const seatCounts = data.seatCountsByRow;

                    const rowLabels = Object.keys(seatCounts); // ["A", "B", "C", ...]
                    const numberOfCols = seatCounts[rowLabels[0]] || 0;

                    setRowLabels(rowLabels);
                    setNumberRow(rowLabels.length);
                    setNumberCol(numberOfCols);

                    console.log('Row Labels:', rowLabels);
                    console.log('Columns per row:', numberOfCols);
                });
            }
        });
    }, [screen._id]);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* <Text style={styles.title}>Screen Name: {screen._id}</Text> */}
                <Text style={styles.title}>Screen Name: {screen.name}</Text>
                <Text style={styles.subTitle}>Seat Count: {screen.seatCount}</Text>
                <View style={styles.center}>
                                <Text style={styles.screenTitle}>Screen</Text>
                            </View>
                
                            <View style={styles.divider} />
                <TheaterSeating rowLabels={rowLabels} NUM_COLS={numberCol} />
            </ScrollView>
        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subTitle: {
        fontSize: 16,
        color: '#333',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
        paddingBottom: 80,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenTitle: {
        marginTop:10,
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
});
