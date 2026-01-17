import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { authorizedGetApi } from '../../../api';
import { useCallback } from 'react';

// const suggestionsList = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];

export default function MultiSelectInput({ tags, setTags }) {
  const [suggestionsList, setSuggestionList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  // const [tags, setTags] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);


  // useEffect(() => {
  // }, []);

  useFocusEffect(
    useCallback(() => {
      console.log("called");
      authorizedGetApi('get-casts').then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data);
            // setCast(data.data);
            setSuggestionList(data.data);
          });
        }
      });
    }, [])
  );

  const handleSelectSuggestion = (suggestion) => {
    if (!tags.includes(suggestion)) {
      setTags([...tags, suggestion]);
    }
    setInputValue('');
    setFilteredSuggestions([]);
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
    const filtered = suggestionsList.filter(
      (s) =>
        s.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image
                source={{
                  uri: tag.photo || 'https://cdn-icons-png.flaticon.com/512/2815/2815428.png',
                }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: '#ccc',
                }}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={{
                  fontSize: 18,
                  color: '#333',
                }}>{tag.name}</Text>
                <Text style={{
                  fontSize: 12,
                  color: '#333',
                }}>{tag.job}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleRemoveTag(index)}>
              <Text style={{
                color: '#900',
                fontSize: 18,
                paddingLeft: 10,
                fontWeight: 'bold',
              }}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Start typing to select..."
        value={inputValue}
        onChangeText={handleInputChange}
      />

      {filteredSuggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          {filteredSuggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => handleSelectSuggestion(suggestion)}
            >
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Image
                  source={{
                    uri: suggestion.photo || 'https://cdn-icons-png.flaticon.com/512/2815/2815428.png',
                  }}
                  style={styles.avatar}
                />
                <View style={{ marginLeft: 12 }}>
                  <Text style={{
                    fontSize: 18,
                    color: '#333',
                  }}>{suggestion.name}</Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#333',
                  }}>{suggestion.job}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 1,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
  tag: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
    alignItems: 'center',
  },
  tagText: {
    marginRight: 5,
    color: '#333',
  },
  removeTag: {
    color: '#900',
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  suggestionBox: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30, // Circular
    borderWidth: 1,
    borderColor: '#ccc',
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
});
