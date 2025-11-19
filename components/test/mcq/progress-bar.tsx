import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

interface ProgressBarProps {
  current: number;
  total: number;
  timeRemaining: number;
  timeLimit: number;
}

/**
 * ProgressBar Component
 * Displays a color-changing progress bar based on time remaining
 * Colors: Green (>40s) → Yellow (30-40s) → Orange (15-30s) → Red (<15s)
 */
export function ProgressBar({
  current,
  total,
  timeRemaining,
  timeLimit,
}: ProgressBarProps) {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  // Progress is based on elapsed time (left to right)
  const elapsedTime = timeLimit + 1 - timeRemaining;
  const timeProgress = (elapsedTime / timeLimit) * 100;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: timeProgress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [timeProgress, widthAnim]);

  const getBarColor = () => {
    // Change colors at specific time points: after 2 seconds (13s left) and 4 seconds (11s left)
    if (timeRemaining > 4) {
      return "#10b981"; // Green (14-15 seconds)
    } else if (timeRemaining > 2) {
      return "#fbbf24"; // Yellow (12-13 seconds)
    } else if (timeRemaining > 0) {
      return "#db1504ff"; // Orange (1-2 seconds)
    } else {
      return "#db1504ff"; // Red (0 seconds)
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
