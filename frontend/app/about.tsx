import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, Animated, StyleSheet, Dimensions, Linking } from 'react-native';
import { Link } from 'expo-router';
import { SocialLink } from './components/SocialLink';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const FadeInOnScroll: React.FC<{ scrollY: Animated.Value; children: React.ReactNode }> = ({ scrollY, children }) => {
    const animatedOpacity = Animated.add(
        new Animated.Value(0),
        Animated.multiply(scrollY.interpolate({
            inputRange: [0, SCREEN_HEIGHT / 4],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        }), new Animated.Value(1))
    );

    return (
        <Animated.View style={{ opacity: animatedOpacity }}>
            {children}
        </Animated.View>
    );
};

export default function About() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    const handleScroll = (e: any) => {
        scrollY.setValue(e.nativeEvent.contentOffset.y);
    };

    const handleSocialLinkPress = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                <ScrollView
                    contentContainerStyle={styles.scrollContentContainer}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {/* Hero Section */}
                    <View style={styles.heroSection}>
                        <View style={styles.letterContainer}>
                            <Text style={styles.letterHeader}>About Us</Text>
                            <Text style={styles.letterSubHeader}>The Developers of Hi Lo Stock Market Game</Text>
                            <View style={styles.letterDecoration} />
                            <Text style={styles.description}>
                                We were inspired to design this game based on the trading games we played in our quant clubs at our respective schools. This game is a full-stack real-time multiplayer project built on React Native, Flask, MongoDB, and SocketIO.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.contentContainer}>
                        {/* Team Members Section */}
                        <FadeInOnScroll scrollY={scrollY}>
                            <View style={styles.teamContainer}>
                                {/* Joseph Cheng Section */}
                                <View style={styles.memberContainer}>
                                    <Text style={styles.sectionTitle}>Joseph Cheng</Text>
                                    <Text style={styles.description}>
                                    Computer Science and Mathematics student at 
                                    <Text style={{ fontWeight: 'bold', color: '#fff' }}> New York University</Text>
                                </Text>
                                    <Text style={styles.bio}>
                                        Hi! I'm Joe, and I love problem-solving and exploring the fun side of game theory. The Hi-Lo Trading Game was born out of my fascination with quantitative finance, blending the excitement of trading with a game anyone can enjoy. I'm always curious about how math and technology can create real-world solutions, and I'm especially passionate about bringing creative ideas to life. When I'm not working on projects like this, you'll probably find me exploring NYC with friends, playing basketball, or contemplating my life's hidden purpose.
                                    </Text>
                                    <View style={styles.socialLinks}>
                                        <SocialLink icon="logo-instagram" url="https://www.instagram.com/koioseph_/" onPress={handleSocialLinkPress} size={28}/>
                                        <SocialLink icon="logo-linkedin" url="https://www.linkedin.com/in/joseph-cheng-b03886296" onPress={handleSocialLinkPress} size={28}/>
                                        <SocialLink icon="logo-github" url="https://github.com/jxc2008" onPress={handleSocialLinkPress} size={28}/>
                                        <SocialLink icon="mail" url="mailto:joseph.x.cheng@gmail.com" onPress={handleSocialLinkPress} size={28}/>
                                    </View>
                                </View>

                                {/* Brian Li Section */}
                                <View style={styles.memberContainer}>
                                    <Text style={styles.sectionTitle}>Brian Li</Text>
                                    <Text style={styles.description}>
                                        Computer Science student at the
                                    <Text style={{ fontWeight: 'bold', color: '#fff' }}> University of Illinois</Text>
                                    </Text>
                                    <Text style={styles.bio}>
                                        I started out with competitive programming but I found my joy in creating applications everyone can use, especially if they solve real world problems on a large scale. Outside of coding, I love trying different kinds of ice cream, playing sports like volleyball or basketball, and traveling wherever I can. I'm always looking for new opportunities to learn and grow, and I'm excited to see where my journey takes me next.
                                    </Text>
                                    <View style={styles.socialLinks}>
                                        <SocialLink icon="logo-instagram" url="https://www.instagram.com/librianli/" onPress={handleSocialLinkPress} size={28}/>
                                        <SocialLink icon="logo-linkedin" url="https://www.linkedin.com/in/librianli/" onPress={handleSocialLinkPress} size={28}/>
                                        <SocialLink icon="logo-github" url="https://github.com/ExtraMediumDev" onPress={handleSocialLinkPress} size={28}/>
                                        <SocialLink icon="mail" url="mailto:brian3092li@gmail.com" onPress={handleSocialLinkPress} size={28}/>
                                    </View>
                                </View>
                            </View>
                        </FadeInOnScroll>

                        {/* Back to Home Link */}
                        <FadeInOnScroll scrollY={scrollY}>
                            <Link href="/" style={styles.linkButton}>
                                <Text style={styles.linkText}>Back to Home</Text>
                            </Link>
                        </FadeInOnScroll>
                    </View>
                </ScrollView>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    content: {
        flex: 1,
    },
    scrollContentContainer: {
        paddingBottom: 80,
    },
    contentContainer: {
        alignSelf: 'center',
        width: '100%',
        maxWidth: 1200,
        paddingHorizontal: 10,
    },
    heroSection: {
        padding: 40,
        backgroundColor: '#0f0f0f',
        alignItems: 'center',
    },
    letterContainer: {
        backgroundColor: '#1c1c1c',
        padding: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        width: '100%',
        maxWidth: 600,
        borderWidth: 1,
        borderColor: '#333',
    },
    letterHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
        color: '#f0f0f0',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    letterSubHeader: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#bbb',
        fontStyle: 'italic',
    },
    letterDecoration: {
        height: 2,
        width: '20%',
        backgroundColor: '#ffffff',
        marginVertical: 20,
        alignSelf: 'center',
    },
    description: {
        fontSize: 18, // Increased font size
        fontStyle: 'italic', // Added italics
        lineHeight: 26, // Adjusted line height for readability
        color: '#ddd',
        marginBottom: 16,
    },
    teamContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    memberContainer: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        borderRadius: 10,
        padding: 25,
        marginHorizontal: 10,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
    },
    sectionTitle: {
        fontSize: 28, // Increase for better emphasis
        fontWeight: 'bold',
        color: '#f0f0f0',
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },  
    bio: {
        fontSize: 18, // Increased font size
        lineHeight: 26, // Adjusted line height for readability
        color: '#bbb',
        marginBottom: 16,
    },
    socialLinks: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 20,
    },
    linkButton: {
        backgroundColor: '#3b82f6',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 20,
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    linkText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

