import { StyleSheet, Text } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function DescriptionText() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Text style={[
      styles.description,
      { color: isDark ? '#b0b1b8' : '#666666' }
    ]}>
      Hundreds of curated, real-world questions across JavaScript, Python, Node.js, and more, designed to elevate your career.
    </Text>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
  },
});
