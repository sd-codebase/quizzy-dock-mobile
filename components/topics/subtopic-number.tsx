import { StyleSheet, Text } from 'react-native';

interface SubtopicNumberProps {
  topicIndex: number;
  subtopicIndex: number;
}

/**
 * SubtopicNumber Component
 * Displays formatted subtopic number (e.g., "1.1", "2.3")
 */
export function SubtopicNumber({ topicIndex, subtopicIndex }: SubtopicNumberProps) {
  const number = `${topicIndex}.${subtopicIndex}`;

  return <Text style={styles.number}>{number}</Text>;
}

const styles = StyleSheet.create({
  number: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9ca3af',
    minWidth: 35,
  },
});
