import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, Modal, Alert } from 'react-native';
import { crmStyles } from '../../styles/global';
import axios from "axios";

import { useRouter } from 'expo-router';

interface CreateRoomModalProps {
  onClose: () => void;
}

export default function CreateRoomModal({ onClose }: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameLengthError, setUsernameLengthError] = useState('');
  const [roomNameError, setRoomNameError] = useState('');

  const router = useRouter();

  const handleSubmit = async () => {
    if (!roomName) {
      Alert.alert('Error', 'Room name is required');
      return;
    }

    try {
      const response = await axios.post("https://hi-lo-backend.onrender.com/create-room", {
        room_name: roomName,
        password: isPrivate ? password : null,
        isPrivate,
        username: username,
      });

      Alert.alert('Success', 'Room created successfully');
      onClose();
      router.push({
        pathname: '/waiting',
        params: {
          roomName,
          roomId: response.data.roomId,
          username: username,
          num_players: response.data.num_players,
          player_list: response.data.player_list,
          host_username: username,
          room_code: response.data.room_code,
        }
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to join room';
      if (errorMessage === "Username must be at least 3 characters long") {
        setUsernameLengthError('Username must be at least 3 characters long');
      } else if (errorMessage === "Room with this name already exists") {
        setRoomNameError('Room with this name already exists');
      }
    }

  };

  return (
    <Modal transparent animationType="fade">
      <View style={crmStyles.overlay}>
        <View style={crmStyles.modalContainer}>
          <Text style={crmStyles.title}>Create Room</Text>

          {/* Room Name */}
          <View style={crmStyles.inputContainer}>
            <Text style={crmStyles.label}>Room Name</Text>
            <TextInput
              style={crmStyles.input}
              value={roomName}
              onChangeText={setRoomName}
              placeholder="Enter room name"
              placeholderTextColor="#9CA3AF"
            />
            {roomNameError && (
              <Text style={crmStyles.errorText}>{roomNameError}</Text>
            )}
          </View>

          {/* Username */}
          <View style={crmStyles.inputContainer}>
            <Text style={crmStyles.label}>Username</Text>
            <TextInput
              style={crmStyles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              placeholderTextColor="#9CA3AF"
            />
            {usernameLengthError && (
              <Text style={crmStyles.errorText}>{usernameLengthError}</Text>
            )}
          </View>

          {/* Private Room Toggle */}
          <View style={crmStyles.switchContainer}>
            <Text style={crmStyles.label}>Private Room</Text>
            <Switch
              value={isPrivate}
              onValueChange={setIsPrivate}
              thumbColor={isPrivate ? '#4B5563' : '#9CA3AF'}
              trackColor={{ false: '#6B7280', true: '#1F2937' }}
            />
          </View>

          {/* Password (only if private room is selected) */}
          {isPrivate && (
            <View style={crmStyles.inputContainer}>
              <Text style={crmStyles.label}>Password</Text>
              <TextInput
                style={crmStyles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
              />
            </View>
          )}

          {/* Buttons */}
          <View style={crmStyles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={crmStyles.cancelButton}>
              <Text style={crmStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={crmStyles.submitButton}>
              <Text style={crmStyles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
