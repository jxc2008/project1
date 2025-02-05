import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Modal, Animated, ScrollView } from 'react-native';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Spectator() {
  const navigation = useNavigation();
  const { roomId, gameData } = useLocalSearchParams(); // Expects roomId and (optionally) gameData from GameList
  const [players, setPlayers] = useState([]);
  const [gameLog, setGameLog] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (gameData) {
      try {
        const parsedGameData = JSON.parse(Array.isArray(gameData) ? gameData[0] : gameData);
        const finalData = typeof parsedGameData === 'string' ? JSON.parse(parsedGameData) : parsedGameData;
        // Set players from finalData.players if available
        if (finalData.players && finalData.players.length > 0) {
          setPlayers(finalData.players.map((p) => ({ name: p.username })));
        } else {
          setPlayers([]);
        }
        // Determine if game has started based on round_active flag (as in game.tsx)
        setGameStarted(finalData.round_active);
        // Set game log if available (assumes finalData.game_log is an array)
        if (finalData.game_log && Array.isArray(finalData.game_log)) {
          setGameLog(finalData.game_log);
        } else {
          setGameLog([]);
        }
      } catch (err) {
        console.error("Error parsing gameData:", err);
        setGameStarted(false);
      }
    } else {
      setGameStarted(false);
    }
  }, [gameData]);

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
        {!gameStarted ? (
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
              {gameLog.length > 0 ? (
                gameLog.map((log, index) => (
                  <Text key={index} style={styles.logText}>{log}</Text>
                ))
              ) : (
                <Text style={styles.logText}>No game events yet.</Text>
              )}
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
