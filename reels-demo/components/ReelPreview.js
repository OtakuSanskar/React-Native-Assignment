import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const { width } = Dimensions.get('window');
const CARD_W = Math.round(width * 0.72);
const CARD_H = Math.round((CARD_W * 16) / 9 / 2 + 40);

export default function ReelPreview({ source, username = 'username', onPress }) {
  const ref = React.useRef();

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={onPress}>
      <Video
        ref={ref}
        source={source}
        style={styles.video}
        shouldPlay
        isLooping
        isMuted
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.user}>{username}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#111',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  info: {
    position: 'absolute',
    bottom: 6,
    left: 8,
  },
  user: {
    color: '#fff',
    fontWeight: '600',
  },
});
