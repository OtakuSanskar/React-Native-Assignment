import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, StatusBar } from 'react-native';
import ReelPreview from '../components/ReelPreview';

// import local videos
const reels = [
  { id: '1', source: require('../assets/reel1.mp4'), username: 'alex' },
  { id: '2', source: require('../assets/reel2.mp4'), username: 'jess' },
  { id: '3', source: require('../assets/reel3.mp4'), username: 'sam' },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Reels — Preview</Text>
      </View>

      <View style={styles.slider}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
          {reels.map((item, idx) => (
            <ReelPreview
              key={item.id}
              source={item.source}
              username={item.username}
              onPress={() => navigation.navigate('Reels', { initialIndex: idx })}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.hint}>
        <Text style={styles.hintText}>Tap a preview to open full‑screen Reels</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { padding: 16 },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  slider: { height: 220, marginTop: 8 },
  hint: { padding: 12 },
  hintText: { color: '#ddd' },
});
