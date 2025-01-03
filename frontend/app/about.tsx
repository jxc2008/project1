import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

import { aboutStyles } from '../styles/global';

export default function About() {
    return (
        <View style={aboutStyles.container}>
            <Text style={aboutStyles.title}>About Quant Trading Card Game</Text>
            <Text style={aboutStyles.description}>
                Quant Trading Card Game is a minimalist game that combines quantitative analysis with the excitement of trading cards. Players use their knowledge of markets and statistics to outmaneuver their opponents.
            </Text>
        
            {/* Navigate Back to Home */}
            <Link href="/" style={aboutStyles.linkButton}>
                <Text style={aboutStyles.linkText}>Back to Home</Text>
            </Link>
        </View>
    );
}