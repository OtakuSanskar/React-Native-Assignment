import React, { useRef, useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, Dimensions, StatusBar } from 'react-native';
import ReelItem from '../components/ReelItem';

const { height } = Dimensions.get('window');

const reels = [
  { id: '1', source: require('../assets/reel1.mp4'), username: 'alex' },
  { id: '2', source: require('../assets/reel2.mp4'), username: 'jess' },
  { id: '3', source: require('../assets/reel3.mp4'), username: 'sam' },
];

export default function ReelsScreen({ route }) {
  const initialIndex = route.params?.initialIndex || 0;
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Refs to keep video refs if we later need to control them directly
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80, // an item is "visible" when >=80% on screen
  };

  const onViewableItemsChanged = useRef(({ viewableItems, changed }) => {
    if (viewableItems && viewableItems.length > 0) {
      const index = viewableItems[0].index;
      if (typeof index === 'number') setActiveIndex(index);
    }
  }).current;

  const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]).current;

  const renderItem = useCallback(
    ({ item, index }) => (
      <ReelItem
        source={item.source}
        isActive={index === activeIndex}
        index={index}
        username={item.username}
      />
    ),
    [activeIndex]
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <FlatList
        data={reels}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        pagingEnabled
        horizontal={false}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        initialScrollIndex={initialIndex}
        getItemLayout={(data, index) => ({ length: height, offset: height * index, index })}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
