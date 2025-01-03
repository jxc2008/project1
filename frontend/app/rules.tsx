import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';

import { rulesStyles } from '../styles/global';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <View style={rulesStyles.sectionContainer}>
        <Text style={rulesStyles.sectionTitle}>{title}</Text>
        <View style={rulesStyles.sectionContent}>{children}</View>
    </View>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <View style={rulesStyles.listItemContainer}>
        <Text style={rulesStyles.listItemBullet}>•</Text>
        <Text style={rulesStyles.listItemText}>{children}</Text>
    </View>
);

export default function Rules() {
    return (
        <ScrollView style={rulesStyles.container} contentContainerStyle={rulesStyles.contentContainer}>
            <Text style={rulesStyles.title}>🎲 HI-LO Game Rules 🎲</Text>

            <Section title="📌 Overview">
                <ListItem>Players: 4–10</ListItem>
                <ListItem>Round Duration: 5 minutes per round</ListItem>
                <ListItem>Objective: End each round with the highest monetary profit.</ListItem>
            </Section>

            <Section title="🛠️ How the Game Works">
                <Text style={rulesStyles.description}>
                    You will trade an imaginary object with an unknown fair value.
                </Text>
                <Text style={rulesStyles.subTitle}>Fair Value is determined by:</Text>
                <ListItem>Two rolls of a 20-sided die (or three rolls with 8+ players)</ListItem>
                <ListItem>
                    One coin flip:{'\n'}
                    - Heads (HI): Fair value = Highest roll{'\n'}
                    - Tails (LO): Fair value = Lowest roll
                </ListItem>
                <Text style={rulesStyles.subTitle}>8+ Players Special Rule:</Text>
                <ListItem>Roll three dice instead of two.</ListItem>
                <ListItem>Coin flip determines if fair value is the highest or lowest of the three rolls.</ListItem>
            </Section>

            <Section title="🧠 Player Information">
                <Text style={rulesStyles.description}>At the start of the round:</Text>
                <ListItem>Three players receive hidden information:</ListItem>
                <ListItem>1. Value of the 1st die roll</ListItem>
                <ListItem>2. Value of the 2nd die roll</ListItem>
                <ListItem>3. Coin flip result (HI/LO)</ListItem>
                <ListItem>
                    Remaining players receive a Trading Contract:{'\n'}
                    - Example: [Long, 4] → Player must buy the object at least 4 times.
                </ListItem>
                <ListItem>Failure to fulfill the contract: Automatic $100 net loss!</ListItem>
            </Section>

            <Section title="💼 Trading Mechanics">
                <Text style={rulesStyles.subTitle}>Key Terms:</Text>
                <ListItem>Bid: Highest price a player is willing to buy.</ListItem>
                <ListItem>Ask: Lowest price a player is willing to sell.</ListItem>
                <Text style={rulesStyles.subTitle}>Posting Bids/Asks:</Text>
                <ListItem>Bid: Must be higher than the current bid.</ListItem>
                <ListItem>Ask: Must be lower than the current ask.</ListItem>
                <ListItem>Trades are simultaneous, so be quick!</ListItem>
                <Text style={rulesStyles.subTitle}>Example Trading Interaction:</Text>
                <ListItem>Current Bid-Ask Values:</ListItem>
                <ListItem>- Bid: 7</ListItem>
                <ListItem>- Ask: 14</ListItem>
                <ListItem>Player 1: "Bid 8" → Raises the bid.</ListItem>
                <ListItem>Player 4: "Ask 19" → Sets an asking price.</ListItem>
                <ListItem>Player 1: "Lift the Ask!" → Buys the object from Player 4 at $19.</ListItem>
            </Section>

            <Section title="📊 End of Round">
                <ListItem>The fair value of the object is revealed.</ListItem>
                <ListItem>Each player's net profit/loss is calculated.</ListItem>
                <Text style={rulesStyles.subTitle}>Profit Example:</Text>
                <ListItem>Fair Value: 15</ListItem>
                <ListItem>Player 1:</ListItem>
                <ListItem>- Long 2 units at $16</ListItem>
                <ListItem>- Short 1 unit at $18</ListItem>
                <ListItem>Net Profit: +$1</ListItem>
            </Section>

            <Section title="🏆 Winning the Game">
                <ListItem>Multiple Rounds: Total net profit/loss is tracked cumulatively.</ListItem>
                <ListItem>Final Winner: The player with the highest cumulative profit after all rounds is declared the overall winner.</ListItem>
                <Text style={rulesStyles.description}>🎯 Good luck, happy trading, and may your profits soar! 🚀</Text>
            </Section>

            <Link href="/" style={rulesStyles.linkButton}>
                <Text style={rulesStyles.linkText}>Back to Home</Text>
            </Link>
        </ScrollView>
    );
}
