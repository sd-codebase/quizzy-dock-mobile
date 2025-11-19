import { StyleSheet, Text, View } from 'react-native';

interface ProgressCounterProps {
  current: number;
  total: number;
}

/**
 * ProgressCounter Component
 * Displays current question number and total questions (e.g., "3 / 20")
 */
export function ProgressCounter({ current, total }: ProgressCounterProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>
        {current} / {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  counter: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
    letterSpacing: 0.3,
  },
});
