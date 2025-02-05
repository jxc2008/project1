import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated, ScrollView, Platform } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import GameList from './components/GameList';
import JoinGameModal from './components/JoinGameModal';
import CreateRoomModal from './components/CreateRoomModal';

export default function Index() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    'Orbitron': require('../assets/fonts/Orbitron-Bold.ttf'),
    'AlexBrush': require('../assets/fonts/AlexBrush-Regular.ttf'),
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if ((e as any).preventDefault) {
        (e as any).preventDefault();
      }
    });

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return unsubscribe;
  }, [navigation, fadeAnim]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleHiLo}>Hi-Lo</Text>
          <Text style={styles.titleRest}>Stock Market Game</Text>
        </View>

        <Text style={styles.introduction}>
          Welcome to the Hi-Lo Stock Market Game! Before you start, make sure to read the{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('rules' as never)}>rules</Text>.
          To learn about the creators, check out the{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('about' as never)}>about</Text> page.
        </Text>

        <View style={styles.gameList}>
          <GameList />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowJoinModal(true)}
          >
            <Ionicons name="enter-outline" size={24} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Join with Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowCreateModal(true)}
          >
            <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Create Room</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('spectator' as never)}
          >
            <Ionicons name="eye-outline" size={24} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Spectate</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.nav}>
          <Link href="/about" style={styles.navLink}>
            <Text style={styles.navLinkText}>About</Text>
          </Link>
          <Link href="/rules" style={styles.navLink}>
            <Text style={styles.navLinkText}>Rules</Text>
          </Link>
        </View>

        {showJoinModal && (
          <JoinGameModal onClose={() => setShowJoinModal(false)} />
        )}

        {showCreateModal && (
          <CreateRoomModal onClose={() => setShowCreateModal(false)} />
        )}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  contentContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  titleHiLo: {
    fontFamily: 'AlexBrush',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#f0f0f0',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  titleRest: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f0f0f0',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 5,
  },
  introduction: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  linkText: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  gameList: {
    width: '90%',
    backgroundColor: '#0f0f0f',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.9,
    shadowRadius: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
    flexWrap: 'wrap'
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: Platform.OS === 'web' ? 12 : 10,
    paddingHorizontal: Platform.OS === 'web' ? 20 : 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  navLink: {
    marginHorizontal: 10,
  },
  navLinkText: {
    color: '#bbb',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
