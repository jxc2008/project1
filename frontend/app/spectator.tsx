import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Spectator() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Spectator Room</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.infoText}>
          This page will soon display live game data such as current bid/ask, leaderboards,
          and other game details.
        </Text>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={24} color="#fff" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0f0f0f' 
  },
  header: { 
    padding: 20, 
    alignItems: 'center', 
    backgroundColor: '#1a1a1a' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  content: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  infoText: { 
    fontSize: 18, 
    color: '#ddd', 
    textAlign: 'center' 
  },
  backButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10, 
    backgroundColor: '#3b82f6', 
    borderRadius: 8, 
    margin: 20 
  },
  backButtonText: { 
    marginLeft: 8, 
    color: '#fff', 
    fontSize: 16 
  },
});
