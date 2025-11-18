import { StyleSheet, Pressable, Text, ViewStyle } from 'react-native';
import { GradientColors } from '@/constants/theme';

interface CTAButtonProps {
  onPress: () => void;
  title?: string;
}

export function CTAButton({ onPress, title = 'Explore Subjects & Start Quiz' }: CTAButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? GradientColors.buttonHover : GradientColors.button }
      ]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
