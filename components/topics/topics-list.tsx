import { StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { TopicsContainer } from './topics-container';
import { fetchSubjectByShortname } from '@/services/quizService';
import type { SubjectWithTopics } from '@/types/api';

interface TopicsListProps {
  shortname: string;
  subjectStatus?: string;
  subjectName?: string;
  subjectQuestions?: string;
}

/**
 * TopicsList Component
 * Fetches topics by shortname and displays them
 */
export function TopicsList({
  shortname,
  subjectStatus,
  subjectName,
  subjectQuestions,
}: TopicsListProps) {
  const [subject, setSubject] = useState<SubjectWithTopics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTopics();
  }, [shortname]);

  const loadTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchSubjectByShortname(shortname);
      setSubject(data);
    } catch (err: any) {
      // Handle 404 gracefully - subject not yet available
      if (err?.status === 404) {
        setSubject(null);
      } else {
        const errorMessage = err?.message || 'Failed to load topics';
        setError(errorMessage);
        console.error('Error loading topics:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Loading topics...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <Text style={styles.retryText}>Please try again later</Text>
      </View>
    );
  }

  if (!subject || !subject.topics || subject.topics.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.comingSoonText}>Coming Soon</Text>
        <Text style={styles.emptyText}>Topics for this subject are being prepared</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={[subject]}
      renderItem={() => (
        <TopicsContainer
          topics={subject.topics}
          subject={subject.name}
          subjectStatus={subjectStatus}
          subjectName={subjectName}
          subjectQuestions={subjectQuestions}
        />
      )}
      keyExtractor={() => 'topics'}
      scrollEnabled={false}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 200,
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
  comingSoonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6366f1',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
