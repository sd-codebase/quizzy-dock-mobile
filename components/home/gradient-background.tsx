import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode } from 'react';

interface GradientBackgroundProps {
  children: ReactNode;
}

export function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={['#0f0a2e', '#1a1340', '#2d1b52']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
}
