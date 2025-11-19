import { StyleSheet, Text, View } from 'react-native';

interface TestBadgeProps {
  testType: 'mcq' | 'interview' | 'output';
  label?: string;
}

/**
 * TestBadge Component
 * Displays the test type badge (MCQ Test, Interview Test, Output Test)
 */
export function TestBadge({ testType, label }: TestBadgeProps) {
  const getLabel = (type: string) => {
    switch (type) {
      case 'mcq':
        return 'MCQ Test';
      case 'interview':
        return 'Interview Questions';
      case 'output':
        return 'Output Questions';
      default:
        return 'Test';
    }
  };

  const displayLabel = label || getLabel(testType);

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'mcq':
        return '#6366f1'; // Indigo
      case 'interview':
        return '#ec4899'; // Pink
      case 'output':
        return '#10b981'; // Green
      default:
        return '#6366f1';
    }
  };

  return (
    <View style={[styles.badge, { backgroundColor: getBackgroundColor(testType) }]}>
      <Text style={styles.badgeText}>{displayLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
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
