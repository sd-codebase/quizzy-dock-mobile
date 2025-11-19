import { StyleSheet, Text, View } from 'react-native';
import { MarkdownRenderer } from '../mcq/markdown-renderer';

interface AdditionalNotesCardProps {
  notes: string;
}

/**
 * AdditionalNotesCard Component
 * Displays additional educational notes with markdown support
 */
export function AdditionalNotesCard({ notes }: AdditionalNotesCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Additional Notes:</Text>
      <View style={styles.notesContainer}>
        <MarkdownRenderer content={notes} />
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
  notesContainer: {
    paddingHorizontal: 0,
  },
});
