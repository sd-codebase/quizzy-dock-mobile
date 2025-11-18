import { StyleSheet, Text, View } from 'react-native';
import { GradientText } from '@/components/ui/gradient-text';

export function HeroSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>
        The Ultimate
      </Text>
      <View style={styles.gradientContainer}>
        <GradientText
          colors={['#6366f1', '#a855f7', '#ec4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientText}
        >
          Coding Quiz Hub
        </GradientText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: -0.5,
    marginBottom: 4,
    color: '#ffffff',
  },
  gradientContainer: {
    alignItems: 'center',
  },
  gradientText: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
});
