import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { getSocket } from '../utils/socket';
import PlayerInfoPopup, { PlayerRole } from './components/PlayerInfoPopup';

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
  secondaryButton: {
    backgroundColor: '#28a745',
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
    alignSelf: 'center',
    minWidth: '45%',
    alignItems: 'center',
    marginHorizontal: 4,
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  endModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  endModalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    maxWidth: '80%',
  },
  endModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  endModalMessage: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  endModalButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 20,
  },
  endModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

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
  const [tradeContract, setTradeContract] = useState('');
  const [bidAmount, setBidAmount] = useState('');
  const [askAmount, setAskAmount] = useState('');
  const roundDuration = 10; // 300 seconds for the round
  const [endTime, setEndTime] = useState(Date.now() + roundDuration * 1000);
  const [timeLeft, setTimeLeft] = useState(roundDuration);
  const [endRoundPopup, setEndRoundPopup] = useState(false);

  
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
  const [newRoundPopup, setNewRoundPopup] = useState(false);

  const [renderRound, setRenderRound] = useState(0); 

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
        cumulativePnl: player.cumulative_pnl,
        roundPnl: player.round_pnl,
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
  
      // Update the players list by removing the player who left
      const updatedPlayers = players.filter(player => player.username !== data.username);
      setPlayers(updatedPlayers);
  
      // Check if the leaving player is the host
      if (data.username === host) {
        // Update the host to the new host (if provided in the event)
        if (data.newHost) {
          setHost(data.newHost);
          setGameLog((prevLog) => [
            ...prevLog,
            `${data.newHost} is now the new host.`,
          ]);
        } else if (updatedPlayers.length < 4) {
          // If no new host is provided, end the game
          setGameLog((prevLog) => [
            ...prevLog,
            `No new host assigned. Ending the game.`,
          ]);
          handleEndGame();
        }
      }
  
      // Check if the number of players is less than 4
      if (updatedPlayers.length < 4 && data.username == host) {
        setGameLog((prevLog) => [
          ...prevLog,
          `Not enough players to continue the game. Ending the game.`,
        ]);
        handleEndGame(); // End the game if there are fewer than 4 players
      }
    });
  
    return () => {
      socket.off('player_left');
    };
  }, [host, players]);
  
  useEffect(() => {
    const socket = getSocket();
  
    socket.on('update_host', (data) => {
      setHost(data.newHost);
    });
  
    return () => {
      socket.off('update_host');
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [gameLog]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = Math.max(Math.floor((endTime - Date.now()) / 1000), 0);
      setTimeLeft(newTimeLeft);
    }, 1000);
  
    return () => clearInterval(timer);
  }, [endTime]);
  

  const handleBid = () => {
    const socket = getSocket();
    const number = parseInt(bidAmount, 10);
  
    if (isNaN(number) || number < 1 || number > 20) {
      alert('Invalid bid. It must be between 1 and 20.');
      return;
    }
  
    // Check if the bid crosses the current ask
    if (currentAsk < 21 && number >= currentAsk) {
      alert("Your bid is higher than or equal to the current ask. Consider hitting the bid or lifting the ask instead.");
      // After alert is dismissed, the timer will update based on the recalculated timeLeft.
      return;
    }
  
    // Ensure the bid is higher than the current bid
    if (number <= currentBid) {
      alert('Invalid bid. It must be greater than the current bid.');
      return;
    }
  
    socket.emit("make_market", { roomId, playerName: username, action: "bid", number });
    setBidAmount("");
  };
  
  
  const handleAsk = () => {
    const socket = getSocket();
    const value = parseInt(askAmount, 10);
  
    if (isNaN(value) || value < 1 || value > 20) {
      alert('Invalid ask. It must be between 1 and 20.');
      return;
    }
  
    // Check if the ask crosses the current bid
    if (currentBid > 0 && value <= currentBid) {
      alert("Your ask is lower than or equal to the current bid. Consider hitting the bid instead!");
      return;
    }
  
    // Ensure the ask is less than the current ask
    if (value >= currentAsk) {
      alert('Invalid ask. It must be less than the current ask.');
      return;
    }
  
    socket.emit("make_market", { roomId, playerName: username, action: "ask", number: value });
    setAskAmount("");
  };
  

  const handleHitBid = () => { // Update!
    const socket = getSocket();
  
    if (currentBid > 0) { // Allow hitting the bid if bid > 0
      socket.emit("take_market", {
        roomId,
        playerName: username,
        action: "hit",
      });
    } else {
      alert("No valid bid to hit.");
    }
  };

  const handleLiftAsk = () => { // Update!
    const socket = getSocket();
  
    if (currentAsk < 21) { // Allow lifting the ask if ask < 21
      socket.emit("take_market", {
        roomId,
        playerName: username,
        action: "lift",
      });
    } else {
      alert("No valid ask to lift.");
    }
  };
  

  useEffect(() => {
    const socket = getSocket();

    socket.on("market_update", (data) => {
      if (data.action === "hit") {
        setGameLog((prevLog) => [
          ...prevLog,
          `${data.playerName} has hit the bid! Sold to ${data.bidPlayer} for $${data.price}.`, // Update!
        ]);
        setCurrentBid(0); // Reset the bid
      } else if (data.action === "lift") {
        setGameLog((prevLog) => [
          ...prevLog,
          `${data.playerName} has lifted the ask! Bought from ${data.askPlayer} for $${data.price}.`, // Update!
        ]);
        setCurrentAsk(21); // Reset the ask
      } else if (data.action === "ask") {
        setCurrentAsk(data.currentAsk);
        setGameLog((prevLog) => [...prevLog, data.logMessage]);
      } else if (data.action === "bid") {
        setCurrentBid(data.currentBid);
        setGameLog((prevLog) => [...prevLog, data.logMessage]);
      }
    });

    return () => {
      socket.off("market_update");
    };
  }, []);

  useEffect(() => {
    const socket = getSocket();
  
    // Listen for the game_ended event
    socket.on('game_ended', (data) => {
      //alert(data.message); // Notify the player that the game has ended
      const HOMEPAGE_URL = "https://hilotrader.org";
      window.location.href = HOMEPAGE_URL; // Redirect to the homepage
    });
  
    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('game_ended');
    };
  }, []);

  const [startRoundPopup, setStartRoundPopup] = useState(false);
  useEffect(() => {
    const socket = getSocket();
  
    socket.on('start_round', (data) => {
      try {
        const parsedData = JSON.parse(data.gameData);
  
        // Update the state with the new round data
        setCurrentRound(parsedData.current_round);
        setHost(parsedData.host);
        setPlayerCount(parsedData.player_count);
        setDices(parsedData.dices);
        setCoin(parsedData.coin);
        setMarketActive(parsedData.market_active);
        setRoundActive(parsedData.round_active);
        setFairValue(parsedData.fair_value);
        setPlayers(parsedData.players || []);
  
        // Recalculate player's role and trading information
        const currentPlayer = (parsedData.players || []).find((p) => p.username === username);
        if (currentPlayer) {
          if (currentPlayer.contract && currentPlayer.contract.type_of_action) {
            setPlayerInfo({ contract: currentPlayer.contract, diceRoll: undefined, coinFlip: undefined });
            setPlayerRole('contractor');
          } else {
            const hasDiceRoll = currentPlayer.record.some(record => record[0] === 'dice_roll');
            const diceRoll = hasDiceRoll ? currentPlayer.record.find(record => record[0] === 'dice_roll')[1] : undefined;
  
            setPlayerInfo({
              contract: null,
              diceRoll: diceRoll,
              coinFlip: currentPlayer.highLow || parsedData.coin,
            });
            setPlayerRole('insider');
          }
        } else {
          console.error('Current player not found in updated players list');
        }
        
        setStartRoundPopup(true);
        // Reset timer for the new round
        const newRoundDuration = 10;  // Example duration for debugging
        setEndTime(Date.now() + newRoundDuration * 1000);
        setTimeLeft(newRoundDuration);
  
        // Show the new round popup
        setEndRoundPopup(false);
        setNewRoundPopup(true);
      } catch (error) {
        console.error('Failed to parse start_round data:', error);
      }
    });

    return () => {
      socket.off('start_round');
    };
  }, []);

  useEffect(() => {
      const socket = getSocket();
      //receive end round data
      socket.on('end_round', (data) => {
        try {
          const parsedData = JSON.parse(data.gameData);
          
          //for each player in players log their round pnl in the console
          parsedData.players.forEach((player) => {
            console.log(player.username, player.round_pnl);
          });


          setPlayers(parsedData.players);
          setEndRoundPopup(true); 

          
        } catch (error) {
          console.error('Failed to parse end_round data:', error);
        }
      });
  });

   // update!
  
  // update! Modified useEffect to call endRound when timer reaches 0
  useEffect(() => { // update!
    const socket = getSocket();
    if (timeLeft === 0 && username === host ) { // update!
      
      socket.emit('end_round', { roomId });              // update!
    } // update!
  }, [timeLeft]); // update!
  
  

  const handleLeaveGame = () => {
    if (window.confirm('Are you sure you want to leave the game?')) {
      console.log('Redirecting to the homepage...');
      const HOMEPAGE_URL = "https://hilotrader.org"; // update!
      window.location.href = HOMEPAGE_URL; // update!
    }
  };

  const handleStartNextRound = () => {
    if (username === host) {

      const socket = getSocket();
      socket.emit('start_round', { roomId });  // Emit event to start a new round
      setEndRoundPopup(false);
      const nextRoundDuration = 10; // duration for debugging; adjust as needed for production
      setEndTime(Date.now() + nextRoundDuration * 1000);
      setTimeLeft(nextRoundDuration);
      // Additional reset logic could go here (e.g., resetting bids/asks)
      setCurrentAsk(21);
      setCurrentBid(0);
    }
  };

  const handleEndGame = () => {
    const socket = getSocket();
    socket.emit('end_game', { roomId }); // Notify the server to end the game
    //alert('The game has ended because there are not enough players.');
    const HOMEPAGE_URL = "https://hilotrader.org";
    window.location.href = HOMEPAGE_URL; // Redirect to the homepage
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
                {/* Input Fields for Bid and Ask */}
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
  
                {/* Side-by-Side Buttons */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.secondaryButton} onPress={handleHitBid}>
                    <Text style={styles.buttonText}>Hit the Bid!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.secondaryButton} onPress={handleLiftAsk}>
                    <Text style={styles.buttonText}>Lift the Ask!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
  
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Player Info</Text>
              <View style={styles.cardContent}>
                <View style={styles.infoRow}>
                  <FontAwesome5 name="user" size={23} color="black" />
                  <Text style={styles.infoText}>Your Role:</Text>
                  <Text style={styles.infoValue}>{playerRole}</Text>
                </View>
                <View style={styles.infoRow}>
                  <FontAwesome name="file-contract" size={33} color="black" />
                  <Text style={styles.infoText}>Trading Information:</Text>
                  <Text style={styles.infoValue}>
                    {playerRole === 'contractor' && playerInfo.contract
                      ? `${playerInfo.contract.type_of_action.toLowerCase()}, ${playerInfo.contract.number}`
                      : playerRole === 'insider'
                      ? (playerInfo.diceRoll !== undefined
                          ? `Dice Roll: ${playerInfo.diceRoll}`
                          : `Coin Flip: ${playerInfo.coinFlip}`)
                      : 'N/A'}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <FontAwesome5 name="gem" size={25} color="black" />
                  <Text style={styles.infoText}>Round:</Text>
                  <Text style={styles.infoValue}>{currentRound}</Text>
                </View>
                <View style={styles.infoRow}>
                  <FontAwesome5 name="clock" size={27} color="black" />
                  <Text style={styles.infoText}>Time Left:</Text>
                  <Text style={styles.infoValue}>{timeLeft}s</Text>
                </View>
              </View>
            </View>
          </View>
          {(() => {
            const sortedPlayers = [...players].sort((a, b) => (b.cumulative_pnl || 0) - (a.cumulative_pnl || 0));
            return (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Leaderboard</Text>
                <View style={styles.cardContent}>
                  {sortedPlayers.map((player, index) => (
                    <View key={index} style={styles.infoRow}>
                      <FontAwesome5 name="user" size={20} color="black" />
                      <Text style={styles.infoText}>{player.username}:</Text>
                      <Text style={styles.infoValue}>${player.cumulative_pnl}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })()}

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
  
        {/* End-of-Round Modal */}
        {endRoundPopup && (
          <Modal
            transparent={true}
            visible={endRoundPopup}
            animationType="fade"
            onRequestClose={() => {}}
          >
            <View style={styles.endModalContainer}>
              <View style={styles.endModalContent}>
                <Text style={styles.endModalTitle}>End of Round {currentRound}!</Text>
                <Text style={styles.endModalMessage}>Fair Value: {fairValue}</Text>
                <Text style={styles.endModalMessage}>
                  Round PnL:
                </Text>
                {players.map((p, index) => (
          <Text key={index} style={styles.endModalMessage}>
            {p.username}: {p.round_pnl}
          </Text>
        ))}
        {username === host && (
          <>
            <TouchableOpacity style={styles.endModalButton} onPress={handleStartNextRound}>
              <Text style={styles.endModalButtonText}>Start next round</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.endModalButton} onPress={handleEndGame}>
              <Text style={styles.endModalButtonText}>End game</Text>
            </TouchableOpacity>
            </>
        )}
              </View>
            </View>
          </Modal>
        )}
        {/* New Round Popup */}
        {newRoundPopup && (
          <Modal
            transparent={true}
            visible={newRoundPopup}
            animationType="fade"
            onRequestClose={() => setNewRoundPopup(false)}
          >
            <View style={styles.endModalContainer}>
              <View style={styles.endModalContent}>
                <Text style={styles.endModalTitle}>Round {currentRound} Started!</Text>
                <Text style={styles.endModalMessage}>
                  Your Role: {playerRole === 'contractor' ? 
                    `${playerInfo.contract?.type_of_action}, ${playerInfo.contract?.number}` : 
                    playerRole === 'insider' ? 
                    (playerInfo.diceRoll !== undefined ? `Dice Roll: ${playerInfo.diceRoll}` : `Coin Flip: ${playerInfo.coinFlip}`) : 
                    'N/A'}
                </Text>
                <TouchableOpacity 
                  style={styles.endModalButton} 
                  onPress={() => setNewRoundPopup(false)}
                >
                  <Text style={styles.endModalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    );
  }
}
