import { StyleSheet, Pressable, View } from 'react-native';
import { MarkdownRenderer } from './markdown-renderer';

interface OptionButtonProps {
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  onPress: () => void;
  disabled?: boolean;
}

/**
 * OptionButton Component
 * Displays a single answer option with states: default, selected, correct, incorrect
 * Supports markdown formatting
 */
export function OptionButton({
  text,
  isSelected,
  isCorrect,
  isIncorrect,
  onPress,
  disabled = false,
}: OptionButtonProps) {
  const getBackgroundColor = () => {
    if (isCorrect) return '#d1fae5'; // Light green
    if (isIncorrect) return '#fee2e2'; // Light red
    if (isSelected) return '#e0e7ff'; // Light indigo
    return '#ffffff'; // White
  };

  const getBorderColor = () => {
    if (isCorrect) return '#10b981'; // Green
    if (isIncorrect) return '#ef4444'; // Red
    if (isSelected) return '#6366f1'; // Indigo
    return '#e5e7eb'; // Gray
  };

  const getTextColor = () => {
    if (isCorrect) return '#059669'; // Dark green
    if (isIncorrect) return '#dc2626'; // Dark red
    return '#1f2937'; // Dark gray
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
        pressed && !disabled && styles.buttonPressed,
      ]}
    >
      <View style={styles.content}>
        <MarkdownRenderer content={text} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    minHeight: 56,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  content: {
    width: '100%',
  },
});
