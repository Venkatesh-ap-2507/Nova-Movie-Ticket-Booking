import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';

const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Superhero",
    "Thriller",
    "War",
    "Western"
];


export default function MultiSelectInputForGenre({tags, setTags}) {
    const [inputValue, setInputValue] = useState('');
    // const [tags, setTags] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

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
        const filtered = genres.filter(
            (s) =>
                s.toLowerCase().includes(text.toLowerCase()) &&
                !tags.includes(s)
        );
        setFilteredSuggestions(filtered);
    };

    return (
        <View style={styles.container}>
            <View style={styles.tagContainer}>
                {tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                        <TouchableOpacity onPress={() => handleRemoveTag(index)}>
                            <Text style={styles.removeTag}>×</Text>
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
                            <Text style={styles.suggestionText}>{suggestion}</Text>
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
