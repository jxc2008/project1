import React from 'react';
import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { BackHandler, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useFocusEffect, CommonActions } from '@react-navigation/native';
import { styles } from '../styles/gameInterfaceStyles';

import axios from 'axios';

const players = Array(10).fill(null);

export default function GameInterface() {
  const { roomName, roomId, username } = useLocalSearchParams();
  const navigation = useNavigation();

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


  useFocusEffect(
    React.useCallback(() => {
        const onBackPress = () => {
            return true; // Block going back
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

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
        {/* Circular Player Display */}
        <View style={styles.circleContainer}>
          {players.map((_, index) => {
            const angle = (index / players.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + 40 * Math.cos(angle);
            const y = 50 + 40 * Math.sin(angle);
            return (
              <View
                key={index}
                style={[
                  styles.playerDot,
                  { left: `${x}%`, top: `${y}%` },
                ]}
              />
            );
          })}

          {/* Central Game Info */}
          <View style={styles.gameInfo}>
            <Text style={styles.roundTitle}>Current Round</Text>
            <View style={styles.infoRow}>
              <FontAwesome5 name="clock" size={16} color="#4a5568" />
              <Text style={styles.infoText}>4:32</Text>
            </View>
            <View style={styles.bidAskContainer}>
              <Text style={styles.bidAskText}>Bid: 12</Text>
              <Text style={styles.bidAskText}>Ask: 15</Text>
            </View>
          </View>
        </View>

        {/* Player Info */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <FontAwesome name="dollar" size={24} color="green" />
            <Text style={styles.statText}>$1,250</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialIcons name="people" size={24} color="blue" />
            <Text style={styles.statText}>7 / 10</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Bet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Hit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>Take</Text>
          </TouchableOpacity>
        </View>

        {/* Player's Contract Info */}
        <View style={styles.contractCard}>
          <Text style={styles.contractTitle}>Your Contract:</Text>
          <Text style={styles.contractText}>[Long, 4] - Buy the object at least 4 times</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
