import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ImageSlider({ images }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const startAutoSlide = () => {
    stopAutoSlide(); // clear previous first
    timerRef.current = setInterval(() => {
      let nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (images.length > 1) startAutoSlide();
    return stopAutoSlide;
  }, [currentIndex, images.length]);

  const onScrollEnd = (e) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  image: {
    width: width,
    height: 200,
    
  },
});
