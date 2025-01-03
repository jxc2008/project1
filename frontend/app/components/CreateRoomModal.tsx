import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, Modal } from 'react-native';
import { crmStyles } from '../../styles/global';

interface CreateRoomModalProps {
  onClose: () => void;
}

export default function CreateRoomModal({ onClose }: CreateRoomModalProps) {
  const [roomName, setRoomName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Implement create room logic here
    console.log(`Creating room: ${roomName}, Private: ${isPrivate}, Password: ${password}`);
    onClose();
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
