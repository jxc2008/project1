import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  Easing,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Link } from 'expo-router';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// FadeInOnScroll component remains exactly the same
const FadeInOnScroll: React.FC<{
  children: React.ReactNode;
  scrollY: Animated.Value;
}> = ({ children, scrollY }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const viewRef = useRef<View>(null);
  const [viewTop, setViewTop] = useState<number | null>(null);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      if (viewTop !== null) {
        const fadeStartThreshold = SCREEN_HEIGHT - 100;
        if (value + fadeStartThreshold >= viewTop) {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 700,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }).start();
        }
      }
    });

    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY, fadeAnim, viewTop]);

  return (
    <Animated.View
      ref={viewRef}
      style={{ opacity: fadeAnim }}
      onLayout={e => {
        const layout = e.nativeEvent.layout;
        setViewTop(layout.y);
      }}
    >
      {children}
    </Animated.View>
  );
};

// ScrollDownIndicator component remains exactly the same
const ScrollDownIndicator: React.FC = () => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      <Text style={styles.scrollArrow}>▼</Text>
    </Animated.View>
  );
};

export default function DramaticRules() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.setValue(e.nativeEvent.contentOffset.y);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContentContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>
          HI-LO Stock Market Game
        </Text>
        <Text style={styles.heroSubtitle}>
          NOTE TO SELF format this introduction as an offer letter. Congratulations! After a rigorous recruiting process, we are excited to extend you a fulltime offer as a Trader at Hi-Lo, LLC. You will start IMMEDIATELY.
        </Text>
        <Text style={styles.heroSubtitle}>
          As part of our company culture, we believe in competition. As such, you will be competing against your fellow coworkers to make the most profit.
        </Text>

        <Text style={styles.heroSubtitle}>
          We are Hi-Lo. We aim to be innovative and mysterious.
        </Text>
        <Text style={styles.heroSubtitle}>
          However, since you are our employee, we have revealed our trading strategies to you below.
        </Text>
        <ScrollDownIndicator />
      </View>

      <View style={styles.contentContainer}>
        {/* Overview */}
        <FadeInOnScroll scrollY={scrollY}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionIcon}>
              <Text style={styles.iconText}>📌</Text>
            </View>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.description}>
              We are Hi-Lo. We aim to be innovative and mysterious.
            </Text>
            <Text style={styles.description}>
              Every 5 minutes, we will pay or deduct your earnings based on how well you traded our stock.
            </Text>
            <Text style={styles.description}>
              With seemingly impossible, proprietary algorithms, we generate possible stock prices through dice rolls. A coin flip will determine if the stock price is the highest or lowest roll.
            </Text>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Players</Text>
                <Text style={styles.statValue}>4–10</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Duration</Text>
                <Text style={styles.statValue}>5 min</Text>
              </View>
            </View>
          </View>
        </FadeInOnScroll>

        {/* How the Game Works */}
        <FadeInOnScroll scrollY={scrollY}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionIcon}>
              <Text style={styles.iconText}>🎲</Text>
            </View>
            <Text style={styles.sectionTitle}>How the Game Works</Text>
            <Text style={styles.description}>
              Trade an asset with an unknown fair value determined by dice rolls and a coin flip.
            </Text>
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleText}>🎯 <Text style={styles.exampleHighlight}>Two 20-sided dice</Text> are rolled (three if 8+ players).</Text>
              <Text style={styles.exampleText}>🪙 The coin flip then decides if the share price equals the <Text style={styles.exampleHighlight}>highest roll (Heads)</Text> or <Text style={styles.exampleHighlight}>lowest roll (Tails)</Text>.</Text>
            </View>
          </View>
        </FadeInOnScroll>

        {/* Player Information */}
        <FadeInOnScroll scrollY={scrollY}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionIcon}>
              <Text style={styles.iconText}>🧠</Text>
            </View>
            <Text style={styles.sectionTitle}>Insider Information</Text>
            <Text style={styles.description}>
              Three players receive vital information:
            </Text>
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleText}>🎲 <Text style={styles.exampleHighlight}>One player</Text> learns the first die roll.</Text>
              <Text style={styles.exampleText}>🎲 <Text style={styles.exampleHighlight}>Another player</Text> learns the second roll.</Text>
              <Text style={styles.exampleText}>🪙 <Text style={styles.exampleHighlight}>The third player</Text> learns the coin flip result (HI/LO).</Text>
              <Text style={styles.exampleText}>📜 Other players receive <Text style={styles.exampleHighlight}>Trading Contracts</Text> (e.g., [Long, 4] means buy 4+ units).</Text>
              <Text style={styles.exampleText}>⚠️ Missing contract requirements costs a <Text style={styles.exampleHighlight}>$100 penalty!</Text></Text>
            </View>
          </View>
        </FadeInOnScroll>

        {/* Trading Mechanics */}
        <FadeInOnScroll scrollY={scrollY}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionIcon}>
              <Text style={styles.iconText}>💼</Text>
            </View>
            <Text style={styles.sectionTitle}>Trading Mechanics</Text>
            <Text style={styles.description}>
              The market operates on Bids (highest buy price) and Asks (lowest sell price).
            </Text>
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleText}>⬆️ New bids must exceed the <Text style={styles.exampleHighlight}>current bid</Text>.</Text>
              <Text style={styles.exampleText}>⬇️ New asks must be below the <Text style={styles.exampleHighlight}>current ask</Text>.</Text>
              <Text style={styles.exampleText}>🤝 Trades happen instantly when someone <Text style={styles.exampleHighlight}>"lifts" an ask</Text> or <Text style={styles.exampleHighlight}>"hits" a bid</Text>.</Text>
              <Text style={styles.exampleText}>🔢 Multiple units can be traded at once using <Text style={styles.exampleHighlight}>"Lift 3"</Text> or <Text style={styles.exampleHighlight}>"Hit 2"</Text> commands.</Text>
            </View>
          </View>
        </FadeInOnScroll>

        {/* End of Round */}
        <FadeInOnScroll scrollY={scrollY}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionIcon}>
              <Text style={styles.iconText}>📊</Text>
            </View>
            <Text style={styles.sectionTitle}>End of Round</Text>
            <Text style={styles.description}>
              After 5 minutes, trading stops and the fair value is revealed. Your profit/loss is calculated from all your trades.
            </Text>
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleText}>📈 Example: If the fair value is 15, buying 2 units at $13 (+$4) and selling 1 at $17 (+$2) gives you <Text style={styles.exampleHighlight}>$6 total profit</Text>.</Text>
              <Text style={styles.exampleText}>⚠️ Contract penalties are applied if required.</Text>
            </View>
          </View>
        </FadeInOnScroll>

        {/* Winning the Game */}
        <FadeInOnScroll scrollY={scrollY}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionIcon}>
              <Text style={styles.iconText}>🏆</Text>
            </View>
            <Text style={styles.sectionTitle}>Winning the Game</Text>
            <Text style={styles.description}>
              Profits and losses accumulate across multiple rounds. The player with the highest total profit wins!
            </Text>
            <View style={styles.exampleContainer}>
              <Text style={styles.exampleText}>💡 Success requires <Text style={styles.exampleHighlight}>smart trading</Text>, <Text style={styles.exampleHighlight}>effective use of information</Text>, and <Text style={styles.exampleHighlight}>careful management of mandatory orders</Text>.</Text>
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
  );
}

// Updated Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Tailwind slate-900
  },
  scrollContentContainer: {
    paddingBottom: 80,
  },
  contentContainer: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 800,
    paddingHorizontal: 20,
  },
  heroSection: {
    minHeight: SCREEN_HEIGHT * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 16,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 20,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 30,
    maxWidth: 600,
  },
  scrollArrow: {
    fontSize: 32,
    color: '#3b82f6',
    textAlign: 'center',
    marginTop: 40,
  },
  sectionContainer: {
    marginBottom: 40,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionIcon: {
    backgroundColor: '#334155',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconText: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#cbd5e1',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e2e8f0',
  },
  exampleContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#334155',
    borderRadius: 12,
  },
  exampleText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#cbd5e1',
    marginBottom: 8,
  },
  exampleHighlight: {
    fontWeight: 'bold',
    color: '#3b82f6',
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