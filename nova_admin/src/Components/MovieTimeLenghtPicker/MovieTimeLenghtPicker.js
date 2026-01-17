import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App({ setTime }) {
    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState('0');

    useEffect(() => {
        setTime({ hours, minutes });
    }, [hours, minutes]);

    return (
        <>
            <Picker
                selectedValue={hours}
                onValueChange={(itemValue) => setHours(itemValue)}
                style={styles.picker}
            >
                {[...Array(24)].map((_, i) => (
                    <Picker.Item key={i} label={`${i} h`} value={`${i}`} />
                ))}
            </Picker>

            <Picker
                selectedValue={minutes}
                onValueChange={(itemValue) => setMinutes(itemValue)}
                style={styles.picker}
            >
                {[...Array(60)].map((_, i) => (
                    <Picker.Item key={i} label={`${i} m`} value={`${i}`} />
                ))}
            </Picker>
        </>
    );
}

const styles = StyleSheet.create({
    picker: {
        flex: 1,
        height: 50,
    }
});
