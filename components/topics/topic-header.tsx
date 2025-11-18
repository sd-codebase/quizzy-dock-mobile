import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface TopicHeaderProps {
  title: string;
  topicIndex: number;
  isExpanded?: boolean;
  onPress?: () => void;
}

/**
 * TopicHeader Component
 * Displays topic section header with title and expand/collapse chevron
 */
export function TopicHeader({ title, topicIndex, isExpanded = false, onPress }: TopicHeaderProps) {
  const rotationAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotationAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, rotationAnim]);

  const chevronRotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.containerPressed,
      ]}
    >
      <Animated.View
        style={[
          styles.chevron,
          {
            transform: [{ rotate: chevronRotation }],
          },
        ]}
      >
        <IconSymbol size={24} name="chevron.right" color="#6366f1" />
      </Animated.View>
      <Text style={styles.title}>
        {topicIndex}. {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginTop: 24,
    paddingTop: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerPressed: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  chevron: {
    marginRight: 8,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 22,
    letterSpacing: 0.3,
    flex: 1,
  },
});
