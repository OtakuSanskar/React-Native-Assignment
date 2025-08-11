import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const { height, width } = Dimensions.get('window');

export default function ReelItem({ source, isActive, index, onLikeChange, username = 'user_name' }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const likeAnim = useRef(new Animated.Value(0)).current; // for small pop

  // Expose play/pause via isActive
  useEffect(() => {
    let mounted = true;
    async function toggle() {
      try {
        if (videoRef.current == null) return;
        if (isActive) {
          await videoRef.current.playAsync();
          if (mounted) setIsPlaying(true);
        } else {
          await videoRef.current.pauseAsync();
          if (mounted) setIsPlaying(false);
        }
      } catch (e) {
        // ignore playback errors
      }
    }
    toggle();
    return () => { mounted = false; };
  }, [isActive]);

  const onTogglePlay = async () => {
    try {
      if (!videoRef.current) return;
      if (isPlaying) {
        await videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await videoRef.current.playAsync();
        setIsPlaying(true);
      }
      // small tap animation
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.96, duration: 80, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 80, useNativeDriver: true }),
      ]).start();
    } catch (e) {}
  };

  const onLikePress = () => {
    // pop animation
    Animated.sequence([
      Animated.timing(likeAnim, { toValue: 1.2, duration: 120, useNativeDriver: true }),
      Animated.timing(likeAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
    if (onLikeChange) onLikeChange(index);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onTogglePlay}>
        <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
          <Video
            ref={videoRef}
            source={source}
            style={styles.video}
            resizeMode="cover"
            shouldPlay={false} // controlled externally
            isLooping
            useNativeControls={false}
            isMuted={false}
          />
        </Animated.View>
      </TouchableWithoutFeedback>

      {/* UI overlay */}
      <View style={styles.overlay}>
        <View style={styles.topInfo}>
          <Text style={styles.username}>@{username}</Text>
        </View>

        <View style={styles.rightColumn}>
          <TouchableOpacity onPress={onLikePress} style={styles.iconBtn}>
            <Animated.View style={{ transform: [{ scale: likeAnim.interpolate({ inputRange: [0,1,1.2], outputRange: [1,1,1.2] }) }] }}>
              <Ionicons name="heart" size={36} color="#fff" />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="chatbubble-outline" size={34} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="share-social-outline" size={34} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Play indicator */}
        {!isPlaying && (
          <View style={styles.centerPlay}>
            <Ionicons name="play-circle" size={64} color="rgba(255,255,255,0.9)" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: '#000',
  },
  video: {
    height,
    width,
  },
  overlay: {
    position: 'absolute',
    height,
    width,
    justifyContent: 'space-between',
  },
  topInfo: {
    marginTop: 48,
    marginLeft: 12,
  },
  username: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  rightColumn: {
    position: 'absolute',
    right: 12,
    bottom: 140,
    alignItems: 'center',
  },
  iconBtn: {
    marginVertical: 10,
  },
  centerPlay: {
    position: 'absolute',
    alignSelf: 'center',
    top: height / 2 - 40,
  },
});
