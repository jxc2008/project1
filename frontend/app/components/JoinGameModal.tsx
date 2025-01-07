import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { joinModalStyles } from '../../styles/global';
import axios from 'axios';

import { useRouter } from 'expo-router';

interface JoinGameModalProps {
  onClose: () => void;
}

export default function JoinGameModal({ onClose }: JoinGameModalProps) {
  const [code, setCode] = useState('');
  const [roomId, setRoomId] = useState('');
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async () => {
    if (!code || !handle) {
      Alert.alert('Error', 'Game code and username are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/join-room', {
        roomCode: code,
        username: handle,
        password: password || null,
      });

      Alert.alert('Success', 'Successfully joined the room!');
      onClose();

      router.push({
        pathname: '/game',
        params: {
          roomId: response.data.roomId,
          username: handle,
        }
      });

    } catch (error) {
      console.error('Failed to join room:', error);
      Alert.alert('Error', error.response?.data?.message || 'Failed to join room');
    }
  };

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <View style={joinModalStyles.overlay}>
        <View style={joinModalStyles.modalContainer}>
          {/* Title */}
          <Text style={joinModalStyles.title}>Join Game</Text>

          {/* Game Code Input */}
          <View style={joinModalStyles.inputContainer}>
            <Text style={joinModalStyles.label}>Game Code</Text>
            <TextInput
              style={joinModalStyles.input}
              value={code}
              onChangeText={setCode}
              placeholder="Enter game code"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* User Handle Input */}
          <View style={joinModalStyles.inputContainer}>
            <Text style={joinModalStyles.label}>User Handle</Text>
            <TextInput
              style={joinModalStyles.input}
              value={handle}
              onChangeText={setHandle}
              placeholder="Enter your handle"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Password Input */}
          <View style={joinModalStyles.inputContainer}>
            <Text style={joinModalStyles.label}>Password (if private)</Text>
            <TextInput
              style={joinModalStyles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
            />
          </View>

          {/* Buttons */}
          <View style={joinModalStyles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={joinModalStyles.cancelButton}>
              <Text style={joinModalStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={joinModalStyles.submitButton}>
              <Text style={joinModalStyles.buttonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
