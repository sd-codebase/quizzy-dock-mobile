import { StyleSheet, View } from 'react-native';
import { TestFormatBadge } from './test-format-badge';

interface TestFormatBadgesRowProps {
  size?: 'small' | 'medium';
  onMCQPress?: () => void;
  onOutputPress?: () => void;
  onInterviewPress?: () => void;
}

/**
 * TestFormatBadgesRow Component
 * Displays all three test format badges in a row
 * Each badge is pressable for navigation
 */
export function TestFormatBadgesRow({
  size = 'medium',
  onMCQPress,
  onOutputPress,
  onInterviewPress,
}: TestFormatBadgesRowProps) {
  return (
    <View style={styles.container}>
      <TestFormatBadge type="mcq" size={size} onPress={onMCQPress} />
      <TestFormatBadge type="output" size={size} onPress={onOutputPress} />
      <TestFormatBadge type="interview" size={size} onPress={onInterviewPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
});
