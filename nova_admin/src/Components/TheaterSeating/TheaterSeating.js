// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

// const NUM_COLS = 9;

// export default function TheaterSeating({ NUM_ROWS, pricingRef }) {
//   const [prices, setPrices] = useState({});

//   const rowLabels = Array.from({ length: NUM_ROWS }, (_, i) =>
//     String.fromCharCode(65 + i)
//   );

//   // Trim removed rows
//   useEffect(() => {
//     setPrices((prev) => {
//       const trimmed = {};
//       rowLabels.forEach((label) => {
//         if (prev[label]) trimmed[label] = prev[label];
//       });
//       return trimmed;
//     });
//   }, [NUM_ROWS]);

//   // Keep syncing to ref
//   useEffect(() => {
//     pricingRef.current = prices;
//   }, [prices]);

//   const handlePriceChange = (rowLabel, value) => {
//     setPrices((prev) => ({
//       ...prev,
//       [rowLabel]: value,
//     }));
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.row}>
//         <Text style={styles.nonLabel}>A</Text>
//         {Array.from({ length: NUM_COLS }, (_, colIndex) => (
//           <TouchableOpacity key={`${colIndex + 1}`} style={styles.seat_column}>
//             <Text>{colIndex + 1}</Text>
//           </TouchableOpacity>
//         ))}
//         <TextInput style={styles.nonpriceInput} value='₹' />
//       </View>

//       {rowLabels.map((rowLabel, rowIndex) => (
//         <View key={rowIndex} style={styles.row}>
//           <Text style={styles.rowLabel}>{rowLabel}</Text>

//           {Array.from({ length: NUM_COLS }, (_, colIndex) => (
//             <TouchableOpacity
//               key={`${rowLabel}${colIndex + 1}`}
//               style={styles.seat}
//               onPress={() => {
//                 console.log(`Selected seat: ${rowLabel}${colIndex + 1}`);
//               }}
//             >
//               <Text>{rowLabel}{colIndex + 1}</Text>
//             </TouchableOpacity>
//           ))}

//           <TextInput
//             style={styles.priceInput}
//             placeholder="price"
//             keyboardType="numeric"
//             value={prices[rowLabel] || ''}
//             onChangeText={(val) => handlePriceChange(rowLabel, val)}
//           />
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//         padding: 10,
//         alignItems: 'center',
//         maxHeight: '70%',
//     },
//     row: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 6,
//     },
//     rowLabel: {
//         width: 24,
//         marginRight: 0,
//         fontWeight: 'bold',
//         fontSize: 16,
//         color: 'black',
//     },
//     nonLabel: {
//         width: 24,
//         marginRight: 0,
//         fontWeight: 'bold',
//         fontSize: 16,
//         color: 'transparent',
//     },
//     seat: {
//         width: 20,
//         height: 32,
//         marginHorizontal: 3,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#e3e8e5',
//         borderRadius: 6,
//     },
//     seat_column: {
//         width: 20,
//         height: 32,
//         marginHorizontal: 3,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#eee',
//         borderRadius: 6,
//     },
//     nonpriceInput: {
//         marginLeft: 10,
//         borderColor: 'transparent',
//         borderWidth: 1,
//         width: 60,
//         padding: 5,
//         borderRadius: 6,
//         textAlign: 'center',
//     },
//     priceInput: {
//         marginLeft: 10,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         width: 60,
//         padding: 5,
//         borderRadius: 6,
//         textAlign: 'center',
//     },
// });











import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function TheaterSeating({ rowLabels, NUM_COLS }) {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <Text style={styles.nonLabel}>A</Text>
        {Array.from({ length: NUM_COLS }, (_, colIndex) => (
          <TouchableOpacity key={`${colIndex + 1}`} style={styles.seat_column}>
            <Text>{colIndex + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {rowLabels.map((rowLabel, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          <Text style={styles.rowLabel}>{rowLabel}</Text>

          {Array.from({ length: NUM_COLS }, (_, colIndex) => (
            <TouchableOpacity
              key={`${rowLabel}${colIndex + 1}`}
              style={styles.seat}
              onPress={() => {
                console.log(`Selected seat: ${rowLabel}${colIndex + 1}`);
              }}
            >
              <Text>{rowLabel}{colIndex + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'center',
        maxHeight: '70%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    rowLabel: {
        width: 24,
        marginRight: 0,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
    },
    nonLabel: {
        width: 24,
        marginRight: 0,
        fontWeight: 'bold',
        fontSize: 16,
        color: 'transparent',
    },
    seat: {
        width: 20,
        height: 32,
        marginHorizontal: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3e8e5',
        borderRadius: 6,
    },
    seat_column: {
        width: 20,
        height: 32,
        marginHorizontal: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 6,
    },
});
