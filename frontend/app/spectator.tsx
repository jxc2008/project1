import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
} from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Spectator() {
  const navigation = useNavigation();
  const { roomId, started } = useLocalSearchParams(); // Expect roomId and "started" flag in the URL
  const [players, setPlayers] = useState<Array<{ name: string }>>([]);
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // For demonstration, we simulate game data based on the "started" query parameter.
  useEffect(() => {
    if (started === "true") {
      setPlayers([
        { name: "Alice" },
        { name: "Bob" },
        { name: "Charlie" },
        { name: "Diana" },
      ]);
      setGameLog([
        "Game started.",
        "Alice placed a bid of $5.",
        "Bob placed an ask of $10.",
        "Charlie hit the bid.",
        "Diana lifted the ask.",
      ]);
    } else {
      setPlayers([]);
      setGameLog([]);
    }
  }, [started]);

  const gameStarted = players.length > 0;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Return Home and View Leaderboard buttons */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.returnButton} onPress={() => navigation.navigate('index')}>
          <Ionicons name="arrow-back-outline" size={24} color="#3b82f6" />
          <Text style={styles.returnText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.leaderboardButton} onPress={() => setShowLeaderboard(true)}>
          <Ionicons name="trophy-outline" size={24} color="#3b82f6" />
          <Text style={styles.leaderboardText}>Leaderboard</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Main Content with Fade Animation */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        { !gameStarted ? (
          <View style={styles.centeredMessage}>
            <Text style={styles.messageText}>Game has not started yet.</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.gameContainer}>
            <View style={styles.playersSection}>
              <Text style={styles.sectionTitle}>Players</Text>
              {players.map((player, index) => (
                <Text key={index} style={styles.playerName}>{player.name}</Text>
              ))}
            </View>
            <View style={styles.logSection}>
              <Text style={styles.sectionTitle}>Game Log</Text>
              {gameLog.map((log, index) => (
                <Text key={index} style={styles.logText}>{log}</Text>
              ))}
            </View>
          </ScrollView>
        )}
      </Animated.View>

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
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  returnButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  returnText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  leaderboardButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaderboardText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 20,
    color: '#333',
  },
  gameContainer: {
    paddingBottom: 20,
  },
  playersSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  playerName: {
    fontSize: 18,
    color: '#333',
    marginVertical: 4,
  },
  logSection: {
    marginBottom: 20,
  },
  logText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 2,
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
