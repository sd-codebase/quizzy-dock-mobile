import { StyleSheet, Pressable, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ResultActionsProps {
  onReview: () => void;
  onRetake: () => void;
  onGoToTopics: () => void;
}

/**
 * ResultActions Component
 * Displays action buttons for review, retake, and navigation
 */
export function ResultActions({
  onReview,
  onRetake,
  onGoToTopics,
}: ResultActionsProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onReview}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <LinearGradient
          colors={['#6366f1', '#9333ea']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.buttonText}>Review Answers</Text>
        </LinearGradient>
      </Pressable>

      <Pressable
        onPress={onRetake}
        style={({ pressed }) => [
          styles.button,
          styles.secondaryButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.secondaryButtonText}>Retake Test</Text>
      </Pressable>

      <Pressable
        onPress={onGoToTopics}
        style={({ pressed }) => [
          styles.button,
          styles.tertiaryButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.tertiaryButtonText}>Go to Topics</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradient: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  secondaryButtonText: {
    color: '#6366f1',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    paddingHorizontal: 24,
    paddingVertical: 14,
    textAlign: 'center',
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
  },
  tertiaryButtonText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    paddingHorizontal: 24,
    paddingVertical: 14,
    textAlign: 'center',
  },
});
