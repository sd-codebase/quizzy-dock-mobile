import { StyleSheet, View } from 'react-native';
import { SubtopicNumber } from './subtopic-number';
import { SubtopicName } from './subtopic-name';
import { TestFormatBadgesRow } from './test-format-badges-row';
import type { Subtopic } from '@/types/api';

interface SubtopicRowProps {
  topicIndex: number;
  subtopicIndex: number;
  subtopic: Subtopic;
}

/**
 * SubtopicRow Component
 * Displays a single subtopic with number, name, and test format badges
 */
export function SubtopicRow({ topicIndex, subtopicIndex, subtopic }: SubtopicRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <SubtopicNumber topicIndex={topicIndex} subtopicIndex={subtopicIndex} />
        <SubtopicName name={subtopic.name} />
      </View>
      <View style={styles.badgesContainer}>
        <TestFormatBadgesRow size="small" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2d45',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  badgesContainer: {
    marginLeft: 35,
  },
});
