import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { joinModalStyles } from '../../styles/global';

interface JoinGameModalProps {
  onClose: () => void;
}

export default function JoinGameModal({ onClose }: JoinGameModalProps) {
  const [code, setCode] = useState('');
  const [handle, setHandle] = useState('');

  const handleSubmit = () => {
    console.log(`Joining game with code ${code} and handle ${handle}`);
    onClose();
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
