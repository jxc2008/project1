import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Spectator() {
  const navigation = useNavigation();
  const { roomId, started } = useLocalSearchParams(); // Expect roomId and a "started" flag in the URL
  const [players, setPlayers] = useState<Array<{ name: string }>>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // For demonstration: if the query parameter "started" equals "true", simulate a started game with dummy players.
  useEffect(() => {
    if (started === "true") {
      setPlayers([
        { name: "Alice" },
        { name: "Bob" },
        { name: "Charlie" },
        { name: "Diana" },
      ]);
    } else {
      setPlayers([]);
    }
  }, [started]);

  const gameStarted = players.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Return Home and View Leaderboard buttons */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('index')}>
          <Ionicons name="home-outline" size={24} color="#3b82f6" />
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.leaderboardButton} onPress={() => setShowLeaderboard(true)}>
          <Ionicons name="trophy-outline" size={24} color="#3b82f6" />
          <Text style={styles.leaderboardButtonText}>Leaderboard</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        { !gameStarted ? (
          <Text style={styles.messageText}>Game has not started yet.</Text>
        ) : (
          <View style={styles.playersContainer}>
            <Text style={styles.sectionTitle}>Players</Text>
            {players.map((player, index) => (
              <Text key={index} style={styles.playerName}>{player.name}</Text>
            ))}
          </View>
        )}
      </View>

      {/* Leaderboard Modal */}
      <Modal
        visible={showLeaderboard}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLeaderboard(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Leaderboard</Text>
            <Text style={styles.modalText}>
              Leaderboard details will be implemented soon.
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowLeaderboard(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeButtonText: {
    marginLeft: 5,
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  leaderboardButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderboardButtonText: {
    marginLeft: 5,
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  messageText: {
    fontSize: 20,
    color: '#333',
  },
  playersContainer: {
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  playerName: {
    fontSize: 18,
    color: '#333',
    marginVertical: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
