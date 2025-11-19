import { StyleSheet, View } from 'react-native';
import { MarkdownRenderer } from './markdown-renderer';

interface QuestionTextProps {
  text: string;
}

/**
 * QuestionText Component
 * Displays the question text with markdown support in a white card
 */
export function QuestionText({ text }: QuestionTextProps) {
  return (
    <View style={styles.card}>
      <MarkdownRenderer content={text} />
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
});
