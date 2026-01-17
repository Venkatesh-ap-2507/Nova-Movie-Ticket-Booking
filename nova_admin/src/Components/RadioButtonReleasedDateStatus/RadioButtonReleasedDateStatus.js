import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
} from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function App({ checked, setChecked }) {

    return (
        <>
            <TouchableOpacity
                onPress={() => setChecked('commingSoon')}
                style={{ flexDirection: 'row', alignItems: 'center' }}
            >
                <RadioButton
                    value="Comming Soon"
                    status={checked === 'commingSoon' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('commingSoon')}
                />
                <Text style={{ color: 'black', fontSize: 16 }}>Coming Soon</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setChecked('selectDate')}
                style={{ flexDirection: 'row', alignItems: 'center' }}
            >
                <RadioButton
                    value="Select Date"
                    status={checked === 'selectDate' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('selectDate')}
                />
                <Text style={{ color: 'black', fontSize: 16 }}>Select Date</Text>
            </TouchableOpacity>
        </>
    );
}

