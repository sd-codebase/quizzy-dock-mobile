import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { TopicHeader } from './topic-header';
import { SubtopicRow } from './subtopic-row';
import type { Topic } from '@/types/api';

interface TopicItemProps {
  topic: Topic;
  topicIndex: number;
  subject?: string;
}

/**
 * TopicItem Component
 * Displays a topic with all its subtopics
 * Supports expand/collapse functionality
 * Passes topic/subject info to subtopic rows for test navigation
 */
export function TopicItem({ topic, topicIndex, subject }: TopicItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <TopicHeader
        title={topic.name}
        topicIndex={topicIndex}
        isExpanded={isExpanded}
        onPress={toggleExpanded}
      />
      {isExpanded && (
        <View style={styles.subtopicsContainer}>
          {topic.subtopics.map((subtopic, subtopicIndex) => (
            <SubtopicRow
              key={subtopic.id}
              topicIndex={topicIndex}
              subtopicIndex={subtopicIndex + 1}
              subtopic={subtopic}
              topicName={topic.name}
              subject={subject}
            />
          ))}
        </View>
      )}
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
