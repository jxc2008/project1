import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Link } from 'expo-router';

import { rulesStyles } from '../styles/global';

const Section = ({ title, children }) => (
    <View style={rulesStyles.sectionContainer}>
        <Text style={rulesStyles.sectionTitle}>{title}</Text>
        <Text style={rulesStyles.description}>{children}</Text>
    </View>
);

const ListItem = ({ children }) => (
    <Text style={rulesStyles.listItem}>• {children}</Text>
);

export default function Rules() {
    return (
        <ScrollView contentContainerStyle={rulesStyles.container}>
            {/* Title */}
            <Text style={rulesStyles.title}>🎲 HI-LO Game Rules 🎲</Text>

            {/* Overview */}
            <Section title="📌 Overview">
                <ListItem>**Players:** 4–10</ListItem>
                <ListItem>**Round Duration:** 5 minutes per round</ListItem>
                <ListItem>**Objective:** End each round with the **highest monetary profit**.</ListItem>
            </Section>

            {/* How the Game Works */}
            <Section title="🛠️ How the Game Works">
                You will trade an **imaginary object** with an **unknown fair value**.{'\n'}
                **Fair Value is determined by:**{'\n'}
                <ListItem>**Two rolls of a 20-sided die** (or three rolls with 8+ players)</ListItem>
                <ListItem>
                    **One coin flip:**{'\n'}
                    - **Heads (HI):** Fair value = **Highest roll**{'\n'}
                    - **Tails (LO):** Fair value = **Lowest roll**
                </ListItem>
                {'\n'}**8+ Players Special Rule:**{'\n'}
                <ListItem>Roll **three dice** instead of two.</ListItem>
                <ListItem>**Coin flip** determines if fair value is the **highest** or **lowest** of the three rolls.</ListItem>
            </Section>

            {/* Player Information */}
            <Section title="🧠 Player Information">
                At the start of the round:{'\n'}
                <ListItem>**Three players** receive **hidden information:**</ListItem>
                <ListItem>1. **Value of the 1st die roll**</ListItem>
                <ListItem>2. **Value of the 2nd die roll**</ListItem>
                <ListItem>3. **Coin flip result (HI/LO)**</ListItem>
                <ListItem>
                    **Remaining players** receive a **Trading Contract:**{'\n'}
                    - Example: **[Long, 4]** → Player must **buy** the object **at least 4 times**.
                </ListItem>
                <ListItem>**Failure to fulfill the contract:** Automatic **$100 net loss!**</ListItem>
            </Section>

            {/* Trading Mechanics */}
            <Section title="💼 Trading Mechanics">
                **Key Terms:**{'\n'}
                <ListItem>**Bid:** Highest price a player is willing to **buy**.</ListItem>
                <ListItem>**Ask:** Lowest price a player is willing to **sell**.</ListItem>
                {'\n'}**Posting Bids/Asks:**{'\n'}
                <ListItem>**Bid:** Must be **higher** than the current bid.</ListItem>
                <ListItem>**Ask:** Must be **lower** than the current ask.</ListItem>
                <ListItem>**Trades are simultaneous, so be quick!**</ListItem>
                {'\n'}**Example Trading Interaction:**{'\n'}
                <ListItem>**Current Bid-Ask Values:**</ListItem>
                <ListItem>- **Bid:** 7</ListItem>
                <ListItem>- **Ask:** 14</ListItem>
                <ListItem>**Player 1:** "Bid 8" → Raises the bid.</ListItem>
                <ListItem>**Player 4:** "Ask 19" → Sets an asking price.</ListItem>
                <ListItem>**Player 1:** "Lift the Ask!" → Buys the object from Player 4 at **$19**.</ListItem>
            </Section>

            {/* End of Round */}
            <Section title="📊 End of Round">
                <ListItem>The **fair value** of the object is revealed.</ListItem>
                <ListItem>Each player's **net profit/loss** is calculated.</ListItem>
                {'\n'}**Profit Example:**{'\n'}
                <ListItem>**Fair Value:** 15</ListItem>
                <ListItem>**Player 1:**</ListItem>
                <ListItem>- Long 2 units at $16</ListItem>
                <ListItem>- Short 1 unit at $18</ListItem>
                <ListItem>**Net Profit:** +$1</ListItem>
            </Section>

            {/* Winning the Game */}
            <Section title="🏆 Winning the Game">
                <ListItem>**Multiple Rounds:** Total net profit/loss is tracked cumulatively.</ListItem>
                <ListItem>**Final Winner:** The player with the **highest cumulative profit** after all rounds is declared the **overall winner**.</ListItem>
                {'\n'}🎯 **Good luck, happy trading, and may your profits soar! 🚀**
            </Section>

            {/* Back to Home */}
            <Link href="/" style={rulesStyles.linkButton}>
                <Text style={rulesStyles.linkText}>Back to Home</Text>
            </Link>
        </ScrollView>
    );
}
