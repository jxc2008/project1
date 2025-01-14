import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SocialLinkProps {
    icon: keyof typeof Ionicons.glyphMap;
    url: string;
    onPress: (url: string) => void;
    size?: number;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ icon, url, onPress, size = 24 }) => {
    return (
        <TouchableOpacity onPress={() => onPress(url)} style={styles.iconContainer}>
            <Ionicons name={icon} size={size} color="#3b82f6" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        marginHorizontal: 10,
    },
});

