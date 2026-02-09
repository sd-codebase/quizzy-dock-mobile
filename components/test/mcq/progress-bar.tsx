import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

interface ProgressBarProps {
  current: number;
  total: number;
  timeRemaining: number;
  timeLimit: number;
}

/**
 * ProgressBar Component
 * Displays a smooth, continuously filling progress bar based on time remaining
 * Colors: Green → Yellow → Red as time runs out
 */
export function ProgressBar({
  current,
  total,
  timeRemaining,
  timeLimit,
}: ProgressBarProps) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  // Progress is based on elapsed time (left to right)
  const elapsedTime = timeLimit - timeRemaining;
  const timeProgress = (elapsedTime / timeLimit) * 100;

  useEffect(() => {
    // Animate smoothly over 1 second (the interval between ticks)
    Animated.timing(widthAnim, {
      toValue: timeProgress,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [timeProgress, widthAnim]);

  // Reset animation instantly when question changes
  useEffect(() => {
    widthAnim.setValue(0);
  }, [current]);

  const getBarColor = () => {
    const elapsed = 1 - (timeRemaining / timeLimit);
    if (elapsed < 0.75) {
      return "#10b981"; // Green (0–75% elapsed)
    } else if (elapsed < 0.90) {
      return "#fbbf24"; // Yellow (75–90% elapsed)
    } else {
      return "#db1504ff"; // Red (90–100% elapsed)
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bar,
          {
            width: widthAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            backgroundColor: getBarColor(),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 12,
    marginBottom: 16,
  },
  bar: {
    height: "100%",
    borderRadius: 4,
  },
});
