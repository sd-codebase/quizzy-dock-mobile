import { StyleSheet, Text, View } from 'react-native';
import { MarkdownRenderer } from '../mcq/markdown-renderer';

interface SampleAnswerCardProps {
  answer: string;
}

/**
 * SampleAnswerCard Component
 * Displays the sample answer with markdown support
 */
export function SampleAnswerCard({ answer }: SampleAnswerCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Sample Answer:</Text>
      <View style={styles.answerContainer}>
        <MarkdownRenderer content={answer} />
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
  answerContainer: {
    paddingHorizontal: 0,
  },
});
