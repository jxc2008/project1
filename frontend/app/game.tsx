import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useFocusEffect, CommonActions } from '@react-navigation/native';
import { getSocket } from './socket';

export default function GamePage() {
  const [currentBid, setCurrentBid] = useState(10);
  const [currentAsk, setCurrentAsk] = useState(20);
  const [playerBalance, setPlayerBalance] = useState(1000);
  const [roundNumber, setRoundNumber] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [playerRole, setPlayerRole] = useState('Trader');
  const [tradeContract, setTradeContract] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [askAmount, setAskAmount] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBid = () => {
    const socket = getSocket();

    
    // Implement bid logic
    console.log('Bid placed:', bidAmount);
  };

  const handleAsk = () => {
    // Implement ask logic
    console.log('Ask placed:', askAmount);
  };

  const handleLeaveGame = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Gem Trading Game</Text>

        <View style={styles.gridContainer}>
          {/* Market Information */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Market Info</Text>
            <View style={styles.cardContent}>
              <View style={styles.infoRow}>
                <MaterialIcons name="arrow-upward" size={20} color="green" />
                <Text style={styles.infoText}>Highest Bid:</Text>
                <Text style={styles.infoValue}>${currentBid}</Text>
              </View>
              <View style={styles.infoRow}>
                <MaterialIcons name="arrow-downward" size={20} color="red" />
                <Text style={styles.infoText}>Lowest Ask:</Text>
                <Text style={styles.infoValue}>${currentAsk}</Text>
              </View>
              <View style={styles.infoRow}>
                <FontAwesome name="money" size={20} color="black" />
                <Text style={styles.infoText}>Your Balance:</Text>
                <Text style={styles.infoValue}>${playerBalance}</Text>
              </View>
            </View>
          </View>

          {/* Trading Actions */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Trade Gems</Text>
            <View style={styles.cardContent}>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Bid Amount"
                  keyboardType="numeric"
                  value={bidAmount}
                  onChangeText={setBidAmount}
                />
                <TouchableOpacity style={styles.button} onPress={handleBid}>
                  <Text style={styles.buttonText}>Place Bid</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Ask Amount"
                  keyboardType="numeric"
                  value={askAmount}
                  onChangeText={setAskAmount}
                />
                <TouchableOpacity style={styles.button} onPress={handleAsk}>
                  <Text style={styles.buttonText}>Place Ask</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Player Information */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Player Info</Text>
            <View style={styles.cardContent}>
              <View style={styles.infoRow}>
                <FontAwesome5 name="user" size={20} color="black" />
                <Text style={styles.infoText}>Your Role:</Text>
                <Text style={styles.infoValue}>{playerRole}</Text>
              </View>
              <View style={styles.infoRow}>
                <FontAwesome name="file-contract" size={20} color="black" />
                <Text style={styles.infoText}>Trade Contract:</Text>
                <Text style={styles.infoValue}>{tradeContract}</Text>
              </View>
              <View style={styles.infoRow}>
                <FontAwesome5 name="gem" size={20} color="black" />
                <Text style={styles.infoText}>Round:</Text>
                <Text style={styles.infoValue}>{roundNumber}</Text>
              </View>
              <View style={styles.infoRow}>
                <FontAwesome5 name="clock" size={20} color="black" />
                <Text style={styles.infoText}>Time Left:</Text>
                <Text style={styles.infoValue}>{timeLeft}s</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Game Log */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Game Log</Text>
          <View style={styles.cardContent}>
            <ScrollView style={styles.logContainer}>
              <Text>Round 1 started. You are a Trader.</Text>
              <Text>Player 2 placed a bid of $15.</Text>
              <Text>Player 3 placed an ask of $18.</Text>
            </ScrollView>
          </View>
        </View>

        {/* Leave Game Button */}
        <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveGame}>
          <Text style={styles.leaveButtonText}>Leave Game</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEDCC',
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '100%',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardContent: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
  },
  infoValue: {
    marginLeft: 'auto',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 4,
    padding: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logContainer: {
    maxHeight: 100,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  leaveButton: {
    backgroundColor: '#DC3545',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  leaveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});