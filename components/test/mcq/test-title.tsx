import { StyleSheet, Text, View } from 'react-native';

interface TestTitleProps {
  topicName: string;
  subtopicName: string;
}

/**
 * TestTitle Component
 * Displays the topic and subtopic name for the current test
 * Topic name is larger, subtopic is smaller, displayed vertically
 */
export function TestTitle({ topicName, subtopicName }: TestTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.topicName}>{topicName}</Text>
      <Text style={styles.subtopicName}>{subtopicName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 4,
  },
  topicName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  subtopicName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9ca3af',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});
