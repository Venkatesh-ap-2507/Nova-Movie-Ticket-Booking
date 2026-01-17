
import { View, Text, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';


export default function App({ navigation }) {


    return (
        <SafeAreaView>
            <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text>Black Screen</Text>
            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'black'
    }
});


