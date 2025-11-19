import { StyleSheet, Text, Pressable } from "react-native";

interface TestFormatBadgeProps {
  type: "mcq" | "output" | "interview";
  size?: "small" | "medium";
  onPress?: () => void;
}

/**
 * TestFormatBadge Component
 * Displays a single test format type with color coding
 * Pressable to navigate to test screen
 */
export function TestFormatBadge({
  type,
  size = "medium",
  onPress,
}: TestFormatBadgeProps) {
  const getLabel = (type: string) => {
    switch (type) {
      case "mcq":
        return "MCQ";
      case "output":
        return "OUTPUT";
      case "interview":
        return "INTERVIEW";
      default:
        return type;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "mcq":
        return "#6366f1"; // Purple/Indigo
      case "output":
        return "#10b981"; // Teal/Green
      case "interview":
        return "#ec4899"; // Pink
      default:
        return "#6b7280"; // Gray
    }
  };

  const color = getColor(type);
  const label = getLabel(type);
  const isSmall = size === "small";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.badge,
        { backgroundColor: color },
        isSmall && styles.badgeSmall,
        pressed && styles.badgePressed,
      ]}
    >
      <Text
        style={[styles.badgeText, isSmall && styles.badgeTextSmall]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  badgeSmall: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  badgePressed: {
    opacity: 0.8,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  badgeTextSmall: {
    fontSize: 11,
  },
});
