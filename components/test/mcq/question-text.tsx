import { StyleSheet, Text, View } from 'react-native';

interface QuestionTextProps {
  text: string;
}

/**
 * QuestionText Component
 * Displays the question text in a white card
 */
export function QuestionText({ text }: QuestionTextProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.question}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    lineHeight: 24,
    letterSpacing: 0.3,
  },
});
