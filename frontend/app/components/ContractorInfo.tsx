import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ContractorInfoProps {
  info: {
    contract: [string, number];
  };
}

export default function ContractorInfo({ info }: ContractorInfoProps) {
  const [position, amount] = info.contract;

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.text}>
          Position: <Text style={styles.boldText}>{position}</Text>
        </Text>
        <Text style={styles.text}>
          Amount: <Text style={styles.boldText}>{amount}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 8,
    padding: 8,
  },
  cardContent: {
    paddingTop: 16, // Corresponds to `pt-6` in Tailwind
  },
  text: {
    fontSize: 18, // Corresponds to `text-lg` in Tailwind
    marginBottom: 8, // Corresponds to `mb-2` in Tailwind
    color: "#000000",
  },
  boldText: {
    fontWeight: "bold", // Corresponds to `font-bold` in Tailwind
  },
});
