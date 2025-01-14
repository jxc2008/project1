import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getSocket } from '../utils/socket';

interface Player {
  username: string;
}

interface WaitingRoomProps {
  currentPlayers?: Player[];
  minPlayers?: number;
}

export default function WaitingRoom({ currentPlayers = [], minPlayers = 4 }: WaitingRoomProps) {
  const { roomName, roomId, username, num_players, player_list, host_username, room_code } = useLocalSearchParams();
  const [dots, setDots] = useState('.');
  const [players, setPlayers] = useState<string[]>(
    Array.isArray(player_list) ? player_list : player_list.split(",")
  );
  const [isHost, setIsHost] = useState(username === host_username);
  const router = useRouter(); // Router for navigation

  useEffect(() => {
    const socket = getSocket();

    console.log('Attempting to connect to Socket.IO server...');
    
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      socket.emit('join_room', { roomId, username });
    });
  
    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    socket.on('player_joined', (data) => {
      console.log('player_joined', data);
      setPlayers((prevPlayers) => [...prevPlayers, data.username]);
    });

    socket.on('player_left', (data) => {
      setPlayers((prevPlayers) => prevPlayers.filter((player) => player !== data.username));
    });

    socket.on('start_game', (data) => {
      console.log('Game started, navigating to game screen...');
      const { roomId, gameData } = data;
      try { 
        router.push({
          pathname: '/game',
          params: { roomId, username, gameData: JSON.stringify(gameData) },
        });
      } catch (error) {
        console.error('Failed to parse gameData:', error);
      }
    });

    return () => {
      console.log('Cleaning up Socket.IO connection...');
      socket.off('player_joined');
      socket.off('player_left');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('start_game');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const disconnect = () => {
      navigator.sendBeacon(
        'http://localhost:5000/disconnect',
        JSON.stringify({ roomId, username })
      );
    };
    
    window.addEventListener('beforeunload', disconnect);
    
    return () => {
      disconnect();
      window.removeEventListener('beforeunload', disconnect);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 3 ? prev + '.' : '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const playersNeeded = Math.max(0, minPlayers - Number(players.length));

  const handleStartGame = () => {
    const socket = getSocket();
    console.log('Starting game...');
    socket.emit('start_game', { roomId });
    socket.emit('start_round', { roomId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Trading Game</Text>
        <Text style={styles.joinCode}>Room Code: {room_code}</Text>
        <View style={styles.content}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={styles.loadingText}>
              {playersNeeded > 0
                ? `Waiting for ${playersNeeded} more player${playersNeeded !== 1 ? 's' : ''} to start the game${dots}`
                : `Game is ready to start${dots}`
              }
            </Text>
          </View>
          <View style={styles.playersContainer}>
            <Text style={styles.playersTitle}>Current Players:</Text>
            {players.length > 0 ? (
              players.map((item, index) => (
                <View key={index} style={styles.badge}>
                  <Text style={styles.badgeText}>{item}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noPlayersText}>No players have joined yet.</Text>
            )}
          </View>
          {players.length >= minPlayers && isHost && (
            <Button title="Start Game" onPress={handleStartGame} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f9ff', // Light blue background
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#1e3a8a', // Dark blue text
  },
  joinCode: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    color: '#3b82f6', // Blue text
  },
  content: {
    padding: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#374151', // Gray text
  },
  playersContainer: {
    marginTop: 16,
  },
  playersTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#374151', // Gray text
  },
  playersList: {
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: '#e2e8f0', // Light gray background
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  badgeText: {
    fontSize: 14,
    color: '#1e293b', // Dark gray text
  },
  noPlayersText: {
    fontSize: 14,
    color: '#64748b', // Light gray text
    textAlign: 'center',
  },
});

