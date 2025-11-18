import { StyleSheet, Text, View } from 'react-native';

export function HeroSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>
        The Ultimate
      </Text>
      <View style={styles.gradientContainer}>
        <Text style={styles.gradientText}>
          Coding Quiz Hub
        </Text>
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
    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
    color: '#6366f1',
  },
});
