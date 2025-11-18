import { StyleSheet, View } from 'react-native';
import { TestFormatBadge } from './test-format-badge';

interface TestFormatBadgesRowProps {
  size?: 'small' | 'medium';
}

/**
 * TestFormatBadgesRow Component
 * Displays all three test format badges in a row
 */
export function TestFormatBadgesRow({ size = 'medium' }: TestFormatBadgesRowProps) {
  return (
    <View style={styles.container}>
      <TestFormatBadge type="mcq" size={size} />
      <TestFormatBadge type="output" size={size} />
      <TestFormatBadge type="interview" size={size} />
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
