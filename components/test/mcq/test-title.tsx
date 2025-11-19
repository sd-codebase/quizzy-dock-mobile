import { StyleSheet, Text, View } from 'react-native';

interface TestTitleProps {
  topicName: string;
  subtopicName: string;
}

/**
 * TestTitle Component
 * Displays the subtopic and topic name for the current test
 * Subtopic name is larger and displayed first, topic is smaller, displayed vertically
 */
export function TestTitle({ topicName, subtopicName }: TestTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtopicName}>{subtopicName}</Text>
      <Text style={styles.topicName}>{topicName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 4,
  },
  topicName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9ca3af',
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  subtopicName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 24,
    letterSpacing: 0.3,
  },
});
