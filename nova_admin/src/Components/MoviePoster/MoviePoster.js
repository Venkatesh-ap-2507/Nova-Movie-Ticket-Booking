import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function App({photoUrls, setPhotoUrls}) {
//   const [photoUrls, setPhotoUrls] = useState(['']);

  const handleChange = (text, index) => {
    const updated = [...photoUrls];
    updated[index] = text;
    setPhotoUrls(updated);
  };

  const addField = () => {
    setPhotoUrls([...photoUrls, '']);
  };

  const removeField = (index) => {
    const updated = photoUrls.filter((_, i) => i !== index);
    setPhotoUrls(updated);
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.label}>Posters</Text>
        <TouchableOpacity onPress={addField}>
          <Text style={styles.addIcon}>＋</Text>
        </TouchableOpacity>
      </View>

      {photoUrls.map((url, index) => (
        <View key={index} style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder={`Photo URL ${index + 1}`}
            value={url}
            onChangeText={(text) => handleChange(text, index)}
          />
          {photoUrls.length > 1 && (
            <TouchableOpacity onPress={() => removeField(index)} style={styles.removeButton}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  addIcon: {
    fontSize: 24,
    color: '#007AFF',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 10,
    paddingHorizontal: 8,
  },
  removeText: {
    fontSize: 20,
    color: 'red',
  },
});
