import { StyleSheet, Text, View } from 'react-native';

interface ResultSummaryProps {
  correct: number;
  incorrect: number;
  total: number;
}

/**
 * ResultSummary Component
 * Displays statistics of correct, incorrect, and total answers
 */
export function ResultSummary({ correct, incorrect, total }: ResultSummaryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statBox}>
        <Text style={styles.statLabel}>Correct</Text>
        <Text style={[styles.statValue, styles.correctValue]}>{correct}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statBox}>
        <Text style={styles.statLabel}>Incorrect</Text>
        <Text style={[styles.statValue, styles.incorrectValue]}>{incorrect}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.statBox}>
        <Text style={styles.statLabel}>Total</Text>
        <Text style={[styles.statValue, styles.totalValue]}>{total}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  correctValue: {
    color: '#10b981',
  },
  incorrectValue: {
    color: '#ef4444',
  },
  totalValue: {
    color: '#6366f1',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#e5e7eb',
  },
});
