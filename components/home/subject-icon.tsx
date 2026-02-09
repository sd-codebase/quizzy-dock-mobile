import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { SUBJECT_THUMBNAIL_BASE_URL } from '@/constants/theme';

interface SubjectIconProps {
  name: string;
  shortName?: string;
  size?: number;
}

/**
 * SubjectIcon Component
 * Displays an SVG thumbnail for the subject, falling back to the first letter
 * on a gradient background if the SVG fails to load.
 */
export function SubjectIcon({ name, shortName, size = 60 }: SubjectIconProps) {
  const [imageError, setImageError] = useState(false);

  const showFallback = !shortName || imageError;

  if (!showFallback) {
    return (
      <Image
        source={{ uri: `${SUBJECT_THUMBNAIL_BASE_URL}/${shortName}.svg` }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        contentFit="cover"
        cachePolicy="none"
        onError={() => setImageError(true)}
      />
    );
  }

  const firstLetter = name.charAt(0).toUpperCase();

  // Map subject names to gradient colors
  const getGradientColors = (subjectName: string): string[] => {
    const lowerName = subjectName.toLowerCase();
    if (lowerName.includes('javascript')) {
      return ['#6366f1', '#a855f7']; // Indigo to Purple
    } else if (lowerName.includes('typescript')) {
      return ['#a855f7', '#ec4899']; // Purple to Pink
    } else if (lowerName.includes('css')) {
      return ['#ec4899', '#f43f5e']; // Pink to Rose
    }
    return ['#6366f1', '#a855f7']; // Default gradient
  };

  const colors = getGradientColors(name);

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.icon, { width: size, height: size, borderRadius: size / 2 }]}
    >
      <Text style={[styles.letter, { fontSize: size * 0.5 }]}>
        {firstLetter}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    color: '#ffffff',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
