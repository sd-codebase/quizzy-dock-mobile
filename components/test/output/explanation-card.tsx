import { StyleSheet, Text, View } from 'react-native';
import { MarkdownRenderer } from '../mcq/markdown-renderer';

interface ExplanationCardProps {
  explanation: string;
}

/**
 * ExplanationCard Component
 * Displays the explanation with markdown support
 */
export function ExplanationCard({ explanation }: ExplanationCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Explanation:</Text>
      <View style={styles.explanationContainer}>
        <MarkdownRenderer content={explanation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4f46e5',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  explanationContainer: {
    paddingHorizontal: 0,
  },
});
