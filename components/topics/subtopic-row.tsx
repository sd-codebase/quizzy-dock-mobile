import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SubtopicNumber } from './subtopic-number';
import { SubtopicName } from './subtopic-name';
import { TestFormatBadgesRow } from './test-format-badges-row';
import { ComingSoonModal } from '@/components/ui/coming-soon-modal';
import type { Subtopic } from '@/types/api';

interface SubtopicRowProps {
  topicIndex: number;
  subtopicIndex: number;
  subtopic: Subtopic;
  topicName?: string;
  subject?: string;
  isSubjectActive?: boolean;
  subjectName?: string;
  subjectQuestions?: string;
}

/**
 * SubtopicRow Component
 * Displays a single subtopic with number, name, and test format badges
 * Badges are interactive and navigate to test screens
 */
export function SubtopicRow({
  topicIndex,
  subtopicIndex,
  subtopic,
  topicName = '',
  subject = '',
  isSubjectActive = true,
  subjectName = '',
  subjectQuestions = '0',
}: SubtopicRowProps) {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const handleMCQPress = () => {
    if (!isSubjectActive) {
      setModalVisible(true);
      return;
    }
    router.push({
      pathname: '/test/mcq/[subtopicId]',
      params: {
        subtopicId: subtopic.id,
        subtopicName: subtopic.name,
        topicName,
        subject,
      },
    });
  };

  const handleOutputPress = () => {
    if (!isSubjectActive) {
      setModalVisible(true);
      return;
    }
    router.push({
      pathname: '/test/output/[subtopicId]',
      params: {
        subtopicId: subtopic.id,
        subtopicName: subtopic.name,
        topicName,
        subject,
      },
    });
  };

  const handleInterviewPress = () => {
    if (!isSubjectActive) {
      setModalVisible(true);
      return;
    }
    router.push({
      pathname: '/test/interview/[subtopicId]',
      params: {
        subtopicId: subtopic.id,
        subtopicName: subtopic.name,
        topicName,
        subject,
      },
    });
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <SubtopicNumber topicIndex={topicIndex} subtopicIndex={subtopicIndex} />
          <SubtopicName name={subtopic.name} />
        </View>
        <View style={styles.badgesContainer}>
          <TestFormatBadgesRow
            size="small"
            onMCQPress={handleMCQPress}
            onOutputPress={handleOutputPress}
            onInterviewPress={handleInterviewPress}
          />
        </View>
      </View>
      <ComingSoonModal
        visible={modalVisible}
        onClose={handleModalClose}
        questionCount={subjectQuestions}
        subjectName={subjectName}
        showContinueButton={false}
      />
    </>
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
