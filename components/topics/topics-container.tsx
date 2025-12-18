import { StyleSheet, View } from 'react-native';
import { TopicItem } from './topic-item';
import type { Topic } from '@/types/api';

interface TopicsContainerProps {
  topics: Topic[];
  subject?: string;
  subjectStatus?: string;
  subjectName?: string;
  subjectQuestions?: string;
}

/**
 * TopicsContainer Component
 * Maps topics to TopicItem components with proper indexing
 * Passes subject info for test navigation
 */
export function TopicsContainer({
  topics,
  subject,
  subjectStatus,
  subjectName,
  subjectQuestions,
}: TopicsContainerProps) {
  return (
    <View style={styles.container}>
      {topics.map((topic, topicIndex) => (
        <TopicItem
          key={`topic-${topicIndex}`}
          topic={topic}
          topicIndex={topicIndex + 1}
          subject={subject}
          subjectStatus={subjectStatus}
          subjectName={subjectName}
          subjectQuestions={subjectQuestions}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
