import { StyleSheet, Text, View } from 'react-native';

interface TestBadgeProps {
  testType: 'mcq' | 'interview' | 'output';
}

/**
 * TestBadge Component
 * Displays the test type badge (MCQ Test, Interview Test, Output Test)
 */
export function TestBadge({ testType }: TestBadgeProps) {
  const getLabel = (type: string) => {
    switch (type) {
      case 'mcq':
        return 'MCQ Test';
      case 'interview':
        return 'Interview Test';
      case 'output':
        return 'Output Test';
      default:
        return 'Test';
    }
  };

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{getLabel(testType)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
