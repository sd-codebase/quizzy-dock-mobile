import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { SubjectCard } from './subject-card';
import { fetchAllSubjects } from '@/services/quizService';
import { ComingSoonModal } from '@/components/ui/coming-soon-modal';
import type { Subject } from '@/types/api';

interface SubjectsListProps {
  onSubjectPress?: (subject: Subject) => void;
}

/**
 * SubjectsList Component
 * Fetches and displays a list of active subjects from the API using FlatList
 * Optimized for rendering up to 25-30 subjects efficiently
 */
export function SubjectsList({ onSubjectPress }: SubjectsListProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllSubjects();
      // Sort by order field if available
      const sorted = data.sort((a, b) => (a.order || 0) - (b.order || 0));
      setSubjects(sorted);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load subjects';
      setError(errorMessage);
      console.error('Error loading subjects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectCardPress = (subject: Subject) => {
    if (subject.status !== 'active') {
      setSelectedSubject(subject);
      setModalVisible(true);
    } else {
      onSubjectPress?.(subject);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedSubject(null);
  };

  const handleModalContinue = () => {
    setModalVisible(false);
    if (selectedSubject) {
      onSubjectPress?.(selectedSubject);
    }
    setSelectedSubject(null);
  };

  const renderSubjectCard = ({ item }: { item: Subject }) => {
    const isActive = item.status === 'active';

    return (
      <SubjectCard
        name={item.name}
        questions={item.questions}
        isActive={isActive}
        onPress={() => handleSubjectCardPress(item)}
      />
    );
  };

  const renderEmpty = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.emptyText}>No subjects available</Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>Error: {error}</Text>
      <Text style={styles.retryText}>Please try again later</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading subjects...</Text>
      </View>
    );
  }

  if (error) {
    return renderError();
  }

  return (
    <>
      <FlatList
        data={subjects}
        renderItem={renderSubjectCard}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
        removeClippedSubviews={true}
        ListEmptyComponent={renderEmpty}
      />
      {selectedSubject && (
        <ComingSoonModal
          visible={modalVisible}
          onClose={handleModalClose}
          onContinue={handleModalContinue}
          questionCount={selectedSubject.questions || 0}
          subjectName={selectedSubject.name}
          showContinueButton={true}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#9ca3af',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    marginBottom: 8,
    textAlign: 'center',
  },
  retryText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
  },
});
