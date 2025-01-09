import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import InsiderInfo from "./InsiderInfo";
import ContractorInfo from "./ContractorInfo";

type PlayerRole = "insider" | "contractor";

interface PlayerInfoPopupProps {
  role: PlayerRole;
  info: InsiderInfo | ContractorInfo;
}

interface InsiderInfo {
  diceRoll?: number;
  coinFlip?: "HI" | "LO";
}

interface ContractorInfo {
  contract: [string, number];
}

export default function PlayerInfoPopup({ role, info }: PlayerInfoPopupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  if (isOpen) {
    // Start the animations
    scale.value = withSpring(1, { damping: 15 });
    opacity.value = withSpring(1);
  } else {
    scale.value = withSpring(0.8);
    opacity.value = withSpring(0);
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Modal transparent={true} visible={isOpen} animationType="none">
      <View style={styles.overlay}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              Your Role: {role.charAt(0).toUpperCase() + role.slice(1)}
            </Text>
          </View>
          <View style={styles.cardContent}>
            {role === "insider" ? (
              <InsiderInfo info={info as InsiderInfo} />
            ) : (
              <ContractorInfo info={info as ContractorInfo} />
            )}
          </View>
          <Pressable style={styles.button} onPress={() => setIsOpen(false)}>
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Corresponds to `bg-black bg-opacity-50`
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24, // Corresponds to `text-2xl`
    fontWeight: "bold", // Corresponds to `font-bold`
    color: "#000000",
    textAlign: "center",
  },
  cardContent: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
