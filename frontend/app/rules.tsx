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

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// FadeInOnScroll component remains the same
const FadeInOnScroll: React.FC<{
  children: React.ReactNode;
  scrollY: Animated.Value;
}> = ({ children, scrollY }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const viewRef = useRef<View>(null);
  const [viewTop, setViewTop] = React.useState<number | null>(null);

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

// ScrollDownIndicator component remains the same
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
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.setValue(e.nativeEvent.contentOffset.y);
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
              <Text style={styles.letterHeader}>Hi-Lo, LLC</Text>
              <Text style={styles.letterSubHeader}>Quantitative Trading Division</Text>
              <View style={styles.letterDecoration} />
              <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
              <Text style={styles.greeting}>Dear Candidate,</Text>
              <Text style={styles.letterBody}>
                Congratulations! After successfully navigating an especially rigorous recruiting process, we are delighted to extend you a formal offer to join Hi-Lo, LLC as a Quantitative Trader. As one of the most innovative and enigmatic quantitative trading firms of the modern era, we invite you to step into our world and begin an extraordinary journey.
              </Text>
              <Text style={styles.letterBody}>
                At Hi-Lo, our company culture thrives on competition. As such, your role will involve competing against your fellow coworkers to generate the highest profits within our proprietary stock market simulation. Your journey begins immediately, and your first task is to master the rules of our dynamic trading game.
              </Text>
              <Text style={styles.letterBody}>
                Remember, discretion is paramount—guard your trading strategies closely, as the path to success lies in secrecy and strategy.
              </Text>
              <Text style={styles.letterBody}>
                Please find the game rules outlined below. Should you have any questions, our team is here to support you. Until then, may the markets ever move in your favor.
              </Text>
              <View style={styles.letterDecoration} />
              <Text style={styles.closing}>Sincerely,</Text>
              <Text style={styles.signature}>The Hi-Lo Recruitment Team</Text>
            </View>
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
                  Every 5 minutes, we will increase or deduct your earnings based on how well you traded our stock on the market.
                </Text>
                <Text style={styles.description}>
                  We can manipulate the market such that we can control our own share price with seemingly impossible, proprietary algorithms. Regardless, this is a general overview of how it works:
                </Text>
                <Text style={styles.description}>
                  First, we generate possible stock prices via dice rolls. A coin flip will determine if the actual share price becomes the highest or lowest roll.
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
                  You will trade our company's stock with an unkown share price determined by dice rolls and a coin flip.
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
                  Three employees receive vital information:
                </Text>
                <View style={styles.exampleContainer}>
                  <Text style={styles.exampleText}>🎲 <Text style={styles.exampleHighlight}>One employee</Text> learns the first die roll.</Text>
                  <Text style={styles.exampleText}>🎲 <Text style={styles.exampleHighlight}>Another employee</Text> learns the second roll.</Text>
                  <Text style={styles.exampleText}>🪙 <Text style={styles.exampleHighlight}>The third employee</Text> learns the coin flip result (HI/LO).</Text>
                  <Text style={styles.exampleText}>📜 Other employees receive <Text style={styles.exampleHighlight}>Trading Contracts</Text> (e.g., [Long, 4] means to buy 4+ shares).</Text>
                  <Text style={styles.exampleText}>⚠️ Failing to meet contract requirements costs a <Text style={styles.exampleHighlight}>$100 penalty in your salary!</Text></Text>
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
                  Please be advised that learning our company's trading vocabulary is essential to your success as an employee.
                </Text>
                <Text style={styles.description}>
                  The market operates on Bids (highest offered buy price) and Asks (lowest offered sell price).
                </Text>
                <View style={styles.exampleContainer}>
                  <Text style={styles.exampleText}>⬆️ New bids must exceed the <Text style={styles.exampleHighlight}>current bid</Text>.</Text>
                  <Text style={styles.exampleText}>⬇️ New asks must be below the <Text style={styles.exampleHighlight}>current ask</Text>.</Text>
                  <Text style={styles.exampleText}>🤝 Trades happen instantly when someone <Text style={styles.exampleHighlight}>"lifts" an ask (buys the offered ask) </Text> or <Text style={styles.exampleHighlight}>"hits" a bid (sells the offered bid)</Text>.</Text>
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
                  After 5 minutes, trading stops and the real share price is revealed. Your profit/loss is calculated from all your trades.
                </Text>
                <View style={styles.exampleContainer}>
                  <Text style={styles.exampleText}>📈 Example: If the share price is 15, buying 2 shares at $13 (+$4) and selling 1 share at $17 (+$2) gives you <Text style={styles.exampleHighlight}>$6 total profit.</Text>.</Text>
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
                <Text style={styles.description}>
                  Please note that good performance doesn't necessarily mean a promotion in our company, but remember that we value you as an employee.
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
    maxWidth: 800,
    paddingHorizontal: 20,
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
    width: '90%',
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
  date: {
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 20,
    color: '#888',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#f0f0f0',
  },
  letterBody: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: '#ddd',
  },
  closing: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 5,
    color: '#f0f0f0',
  },
  signature: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#bbb',
  },
  scrollArrow: {
    fontSize: 32,
    color: '#3b82f6',
    textAlign: 'center',
    marginTop: 40,
  },
  sectionContainer: {
    margin: 40,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
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
    color: '#f0f0f0',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#ddd',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    padding: 16,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f0f0f0',
  },
  exampleContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
  },
  exampleText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#bbb',
    marginBottom: 8,
  },
  exampleHighlight: {
    fontWeight: 'bold',
    color: '#f0f0f0',
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
  letterDecoration: {
    height: 2,
    width: '20%',
    backgroundColor: '#ffffff',
    marginVertical: 20,
    alignSelf: 'center',
  },
});

