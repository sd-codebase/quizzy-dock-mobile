import { StyleSheet, Text } from 'react-native';

interface SubtopicNameProps {
  name: string;
}

/**
 * SubtopicName Component
 * Displays subtopic title with proper text handling
 */
export function SubtopicName({ name }: SubtopicNameProps) {
  return <Text style={styles.name}>{name}</Text>;
}

const styles = StyleSheet.create({
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
    flex: 1,
    lineHeight: 20,
  },
});
