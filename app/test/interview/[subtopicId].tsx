import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { GradientBackground } from '@/components/home/gradient-background';

export default function InterviewScreen() {
  const router = useRouter();

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Interview Test</Text>
          <Text style={styles.message}>Coming Soon</Text>
          <Text style={styles.subtitle}>
            Interview preparation tests will be available soon.
          </Text>
        </View>

        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  message: {
    fontSize: 24,
    fontWeight: '600',
    color: '#6366f1',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 24,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
