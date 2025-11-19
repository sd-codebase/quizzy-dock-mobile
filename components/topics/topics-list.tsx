import { StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { TopicsContainer } from './topics-container';
import { fetchSubjectByShortname } from '@/services/quizService';
import type { SubjectWithTopics } from '@/types/api';

interface TopicsListProps {
  shortname: string;
}

/**
 * TopicsList Component
 * Fetches topics by shortname and displays them
 */
export function TopicsList({ shortname }: TopicsListProps) {
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load topics';
      setError(errorMessage);
      console.error('Error loading topics:', err);
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
        <Text style={styles.emptyText}>No topics available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={[subject]}
      renderItem={() => <TopicsContainer topics={subject.topics} subject={subject.name} />}
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
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
  },
});
