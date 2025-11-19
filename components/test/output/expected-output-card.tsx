import { StyleSheet, Text, View } from 'react-native';
import { MarkdownRenderer } from '../mcq/markdown-renderer';

interface ExpectedOutputCardProps {
  output: string;
}

/**
 * ExpectedOutputCard Component
 * Displays the expected output with monospace font
 */
export function ExpectedOutputCard({ output }: ExpectedOutputCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Expected Output:</Text>
      <View style={styles.outputContainer}>
        <MarkdownRenderer content={output} />
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
  outputContainer: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});
