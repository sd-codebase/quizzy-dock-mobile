import { StyleSheet, Pressable, View, Text } from 'react-native';
import { memo } from 'react';
import { SubjectIcon } from './subject-icon';

interface SubjectCardProps {
  name: string;
  questions: string | number;
  onPress: () => void;
}

/**
 * SubjectCard Component
 * Displays a single subject with icon and question count
 * Memoized to prevent unnecessary re-renders
 */
const SubjectCardComponent = ({ name, questions, onPress }: SubjectCardProps) => {
  const questionCount = typeof questions === 'string' ? questions : questions.toString();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.content}>
        <SubjectIcon name={name} size={70} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.questionCount}>
            ({questionCount}+ Questions)
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export const SubjectCard = memo(SubjectCardComponent);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1d35',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2d45',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  questionCount: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
});
