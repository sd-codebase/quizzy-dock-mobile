import { StyleSheet, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GoBackButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

/**
 * GoBackButton Component
 * Gradient styled button for going back to topics page
 */
export function GoBackButton({
  onPress,
  disabled = false,
}: GoBackButtonProps) {
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
        colors={['#6b7280', '#4b5563']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>Back To Topics</Text>
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
