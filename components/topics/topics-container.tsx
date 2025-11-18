import { StyleSheet, View } from 'react-native';
import { TopicItem } from './topic-item';
import type { Topic } from '@/types/api';

interface TopicsContainerProps {
  topics: Topic[];
}

/**
 * TopicsContainer Component
 * Maps topics to TopicItem components with proper indexing
 */
export function TopicsContainer({ topics }: TopicsContainerProps) {
  return (
    <View style={styles.container}>
      {topics.map((topic, topicIndex) => (
        <TopicItem
          key={`topic-${topicIndex}`}
          topic={topic}
          topicIndex={topicIndex + 1}
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
