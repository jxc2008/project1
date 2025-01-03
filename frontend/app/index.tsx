import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import GameList from './components/GameList'
import JoinGameModal from './components/JoinGameModal'
import CreateRoomModal from './components/CreateRoomModal'

import { Link } from 'expo-router';

import { globalStyles } from '../styles/global';

export default function Index() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Quant Trading Card Game</Text>

      {/* Game List Component Placeholder */}
      <View style = {globalStyles.gameList}>
        <GameList />
      </View>

      {/* Buttons */}
      <View style = {globalStyles.buttonContainer}>

        <TouchableOpacity style = {globalStyles.button} onPress = {() => setShowJoinModal(true)}>
          <Text style={globalStyles.buttonText}>Join with Code</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => setShowCreateModal(true)} style = {globalStyles.button}>
          <Text style={globalStyles.buttonText}>Create Room</Text>
        </TouchableOpacity>
      
      </View>

      {/* Navigation */}
      <View style = {globalStyles.nav}>
        <Link href="/about" style = {globalStyles.navLink}> About </Link>
        <Link href="/rules" style = {globalStyles.navLink}> Rules </Link>
      </View>

      {/* Modals */} 
      {showJoinModal && (
        <JoinGameModal onClose = {() => setShowJoinModal(false)} />
      )}

      {showCreateModal && (
        <CreateRoomModal onClose={() => setShowCreateModal(false)} />
      )}
    </View>

  );
}