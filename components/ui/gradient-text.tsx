import { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';

interface GradientTextProps {
  children: ReactNode;
  colors?: string[];
  style?: any;
}

/**
 * GradientText Component
 * Creates text with a gradient-like color effect
 * Uses the first color in the gradient array as the text color
 */
export function GradientText({
  children,
  colors = ['#6366f1', '#a855f7', '#ec4899'],
  style,
}: GradientTextProps) {
  // Use the first color as the primary gradient color
  const gradientColor = colors[0];

  return (
    <Text style={[styles.text, { color: gradientColor }, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});
