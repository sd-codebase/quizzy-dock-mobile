import { StyleSheet, Text, View } from 'react-native';

interface ScoreDisplayProps {
  score: number;
  total: number;
}

/**
 * ScoreDisplay Component
 * Displays final score and percentage
 */
export function ScoreDisplay({ score, total }: ScoreDisplayProps) {
  const percentage = Math.round((score / total) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your Score</Text>
      <View style={styles.scoreSection}>
        <Text style={styles.score}>
          {score}/{total}
        </Text>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  score: {
    fontSize: 32,
    fontWeight: '700',
    color: '#6366f1',
  },
  percentage: {
    fontSize: 24,
    fontWeight: '700',
    color: '#10b981',
  },
});
