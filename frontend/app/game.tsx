import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { getSocket } from './socket';

import PlayerInfoPopup, { PlayerRole } from './components/PlayerInfoPopup';

export default function GamePage() {

  const [loading, setLoading] = useState(true);
  const [gameLog, setGameLog] = useState<string[]>([
    'Round has started! Place your bids and asks now.',
  ]); 
  const scrollRef = useRef<ScrollView>(null); // Unified ref for the log scroll view - update!
  const [currentBid, setCurrentBid] = useState(0);
  const [currentAsk, setCurrentAsk] = useState(21);
  const [playerBalance, setPlayerBalance] = useState(0);
  const [playerRole, setPlayerRole] = useState<PlayerRole>(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [tradeContract, setTradeContract] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [askAmount, setAskAmount] = useState('');
  
  const [playerInfo, setPlayerInfo] = useState<{ contract: any; diceRoll?: number; coinFlip?: string }>({ contract: null });

  const [host, setHost] = useState('');
  const [playerCount, setPlayerCount] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [dices, setDices] = useState<number[]>([]);
  const [coin, setCoin] = useState('');
  const [marketActive, setMarketActive] = useState(false);
  const [roundActive, setRoundActive] = useState(false);
  const [fairValue, setFairValue] = useState(0);
  const [players, setPlayers] = useState([]);
  const [marketData, setMarketData] = useState({
    bidPlayer: null,
    askPlayer: null,
    hitPlayer: null,
    liftPlayer: null,
  });

  const { roomId, username, gameData } = useLocalSearchParams();

  useEffect(() => {
    if (!gameData) {
      console.error('gameData is undefined or null');
      setLoading(true);
      return;
    }

    console.log("CODE IS RUNNING");

    try {
      const parsedGameData = JSON.parse(Array.isArray(gameData) ? gameData[0] : gameData);
      const finalData = typeof parsedGameData === 'string' ? JSON.parse(parsedGameData) : parsedGameData;
    
      setHost(finalData.host);
      setPlayerCount(finalData.player_count);
      setCurrentRound(finalData.current_round);
      setDices(finalData.dices);
      setCoin(finalData.coin);
      setMarketActive(finalData.market_active);
      setRoundActive(finalData.round_active);
      setFairValue(finalData.fair_value);

      const playersData = finalData.players.map(player => ({
        username: player.username,
        status: player.status,
        lastActive: player.last_active,
        highLow: player.high_low,
        contract: player.contract,
        buyCount: player.buy_count,
        sellCount: player.sell_count,
        record: player.record,
        cumulativePnl: player.cumulative_pnl
      }));
      
      setPlayers(playersData);
      console.log('Players Data:', playersData);
      console.log('Current username:', username);

      const currentPlayer = playersData.find(p => p.username === username);
      console.log('Current player found:', currentPlayer);

      if (currentPlayer) {
        if (currentPlayer.contract && currentPlayer.contract.type_of_action) {
          setPlayerInfo({
            contract: currentPlayer.contract
          });
          setPlayerRole('contractor');
          console.log('Set as contractor with contract:', currentPlayer.contract);
        } else {
          const hasDiceRoll = currentPlayer.record.some(record => record[0] === 'dice_roll');
          const diceRoll = hasDiceRoll ? 
            currentPlayer.record.find(record => record[0] === 'dice_roll')[1] : 
            undefined;

          setPlayerInfo({
            contract: null,
            diceRoll: diceRoll,
            coinFlip: currentPlayer.highLow || finalData.coin
          });
          setPlayerRole('insider');
          console.log('Set as insider with dice roll:', diceRoll, 'and coin flip:', currentPlayer.highLow || finalData.coin);
        }
      } else {
        console.error('Current player not found in players list');
      }

      setLoading(false);
    } catch (error) {
      console.error('Failed to parse gameData:', error);
    }
  }, [gameData, username]);  

  const navigation = useNavigation();

  useEffect(() => {
    const socket = getSocket();

    socket.on('player_left', (data) => {
      console.log(`${data.username} has left the game.`);
      setGameLog((prevLog) => [
        ...prevLog,
        `${data.username} has left the game.`,
      ]);
    });

    return () => {
      socket.off('player_left');
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [gameLog]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBid = () => {
    const socket = getSocket();
    const number = parseInt(bidAmount, 10);
  
    if (isNaN(number)) {
      console.error("Invalid bid amount");
      return;
    }
  
    socket.emit("make_market", { roomId, playerName: username, action: "bid", number }); // update!
    setBidAmount(""); // update!
  };
  
  const handleAsk = () => {
    const socket = getSocket();
    const value = parseInt(askAmount, 10);

    if (isNaN(value) || value >= currentAsk || value < 1 || value > 20) {
      alert('Invalid ask. It must be less than the current ask and between 1 and 20.');
      return;
    }

    socket.emit("make_market", { roomId, playerName: username, action: "ask", number: value }); // update!
    setAskAmount(""); // update!
  };

  useEffect(() => {
    const socket = getSocket();
  
    socket.on('market_update', (data) => { // update!
      if (data.action === 'ask') {
        setCurrentAsk(data.currentAsk);
        setGameLog((prevLog) => [...prevLog, data.logMessage]);
      } else if (data.action === 'bid') {
        setCurrentBid(data.currentBid);
        setGameLog((prevLog) => [...prevLog, data.logMessage]);
      }
    });
  
    return () => {
      socket.off('market_update');
    };
  }, []);

  const handleLeaveGame = () => {
    if (window.confirm('Are you sure you want to leave the game?')) {
      console.log('Redirecting to the homepage...');
      const HOMEPAGE_URL = process.env.HOMEPAGE_URL || "http://localhost:8081"; // update!
      window.location.href = HOMEPAGE_URL; // update!
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading game data...</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <PlayerInfoPopup role={playerRole} info={playerInfo} />
          <Text style={styles.title}>Gem Trading Game</Text>
  
          <View style={styles.gridContainer}>
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
                  <Text style={styles.infoValue}>{currentRound}</Text>
                </View>
                <View style={styles.infoRow}>
                  <FontAwesome5 name="clock" size={20} color="black" />
                  <Text style={styles.infoText}>Time Left:</Text>
                  <Text style={styles.infoValue}>{timeLeft}s</Text>
                </View>
              </View>
            </View>
          </View>
  
          <View style={styles.card}>
              <Text style={styles.cardTitle}>Game Log</Text>
              <View style={styles.cardContent}>
                <ScrollView style={styles.logContainer} ref={scrollRef}>
                  {gameLog.map((log, index) => (
                    <Text key={index}>{log}</Text>
                  ))}
                </ScrollView>
              </View>
          </View>
  
          <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveGame}>
            <Text style={styles.leaveButtonText}>Leave Game</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  } 
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
