import { StyleSheet, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface NextButtonProps {
  onPress: () => void;
  disabled?: boolean;
  isLastQuestion?: boolean;
}

/**
 * NextButton Component
 * Gradient styled button for moving to next question or submitting test
 */
export function NextButton({
  onPress,
  disabled = false,
  isLastQuestion = false,
}: NextButtonProps) {
  const buttonText = isLastQuestion ? 'Submit' : 'Next';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <LinearGradient
        colors={['#6366f1', '#9333ea']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{buttonText}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
    flex: 1,
  },
  gradient: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});
