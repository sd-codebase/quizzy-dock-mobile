import { StyleSheet, View } from 'react-native';
import { TopicHeader } from './topic-header';
import { SubtopicRow } from './subtopic-row';
import type { Topic } from '@/types/api';

interface TopicItemProps {
  topic: Topic;
  topicIndex: number;
}

/**
 * TopicItem Component
 * Displays a topic with all its subtopics
 */
export function TopicItem({ topic, topicIndex }: TopicItemProps) {
  return (
    <View style={styles.container}>
      <TopicHeader title={topic.name} topicIndex={topicIndex} />
      <View style={styles.subtopicsContainer}>
        {topic.subtopics.map((subtopic, subtopicIndex) => (
          <SubtopicRow
            key={subtopic.id}
            topicIndex={topicIndex}
            subtopicIndex={subtopicIndex + 1}
            subtopic={subtopic}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  subtopicsContainer: {
    paddingLeft: 8,
  },
});
