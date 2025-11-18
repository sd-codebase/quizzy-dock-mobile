import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface FeatureCardProps {
  title: string;
  icon: string;
}

export function FeatureCard({ title, icon }: FeatureCardProps) {
  return (
    <LinearGradient
      colors={['#1a1340', '#2d1b52']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientWrapper}
    >
      <View style={styles.card}>
        <IconSymbol
          name={icon as any}
          size={24}
          color="#00bcd4"
          style={styles.icon}
        />
        <Text style={styles.title}>
          {title}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientWrapper: {
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: '100%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  icon: {
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
