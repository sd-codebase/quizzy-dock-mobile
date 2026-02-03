import { View, ScrollView, StyleSheet, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Logo } from '@/components/home/logo';
import { BannerAd } from '@/components/ads/banner-ad';

interface InterviewResultsProps {
  total: number;
  onRestart: () => void;
  onChooseNewTopic: () => void;
}

/**
 * InterviewResults Component
 * Results screen showing completion message
 * NO scoring - purely educational
 */
export function InterviewResults({
  total,
  onRestart,
  onChooseNewTopic,
}: InterviewResultsProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.mainContainer}>
      {/* Sticky Logo */}
      <View style={[styles.logoContainer, { paddingTop: insets.top }]}>
        <Logo />
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.resultTitle}>Test Complete!</Text>

          {/* Completion Message */}
          <Text style={styles.completionMessage}>
            You completed all {total} interview questions
          </Text>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            {/* Restart Button */}
            <Pressable
              onPress={onRestart}
              style={({ pressed }) => [
                styles.restartButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <LinearGradient
                colors={['#4f46e5', '#7c3aed']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Restart Test</Text>
              </LinearGradient>
            </Pressable>

            {/* Choose New Topic Button */}
            <Pressable
              onPress={onChooseNewTopic}
              style={({ pressed }) => [
                styles.newTopicButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <LinearGradient
                colors={['#14b8a6', '#10b981']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Choose New Topic</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <BannerAd />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  logoContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2d45',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 80,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  completionMessage: {
    fontSize: 18,
    fontWeight: '500',
    color: '#9ca3af',
    marginBottom: 32,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  buttonsContainer: {
    gap: 12,
  },
  restartButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  newTopicButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  buttonPressed: {
    opacity: 0.9,
  },
});
