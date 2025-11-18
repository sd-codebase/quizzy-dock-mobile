import { StyleSheet, Text, View } from 'react-native';

interface TopicHeaderProps {
  title: string;
  topicIndex: number;
}

/**
 * TopicHeader Component
 * Displays topic section header with title
 */
export function TopicHeader({ title, topicIndex }: TopicHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {topicIndex}. {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginTop: 24,
    paddingTop: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 22,
    letterSpacing: 0.3,
  },
});
