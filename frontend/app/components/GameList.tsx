import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { gameListStyles } from '../../styles/global';

interface Game {
  id: string;
  name: string;
  players: number;
}

export default function GameList() {
  const [games, setGames] = useState<Game[]>([
    { id: '1', name: 'Supercalifragilisticexpialidocious', players: 3 },
    { id: '2', name: 'UIUC Team A', players: 5 },
    { id: '3', name: 'Cal Quant', players: 2 },
    { id: '4', name: 'group2', players: 4 },
    { id: '5', name: 'gamers', players: 6 },
    { id: '6', name: 'Quant @ NYU', players: 3 },
    { id: '7', name: 'aaaaaa', players: 5 },
    { id: '8', name: '', players: 4 },
    { id: '9', name: 'pranav rizz', players: 2 },
    { id: '10', name: 'locked in alien', players: 7 },
    { id: '11', name: 'PLS JOIN', players: 3 },
    { id: '12', name: 'gay', players: 5},
  ]);

  const joinGame = (gameId: string) => {
    // Implement join game logic here
    console.log(`Joining game ${gameId}`);
  };

  const renderGameItem = ({ item }: { item: Game }) => (
    <View style={gameListStyles.gameItem}>
      <View style={gameListStyles.gameDetails}>
        <Text style={gameListStyles.gameName}>{item.name}</Text>
        <Text style={gameListStyles.gameInfo}>{item.players}/10 players</Text>
      </View>
      <TouchableOpacity onPress={() => joinGame(item.id)} style={gameListStyles.joinButton}>
        <Text style={gameListStyles.joinButtonText}>Join</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={gameListStyles.container}>
      <Text style={gameListStyles.title}>Ongoing Games</Text>
      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        renderItem={renderGameItem}
        style={gameListStyles.list}
        contentContainerStyle={gameListStyles.listContent}
      />
    </View>
  );
}
