import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text } from "react-native";

export function HeaderBadge() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Text style={[styles.badge, { color: isDark ? "#818cf8" : "#6366f1" }]}>
      MASTER YOUR TECH SKILLS
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1.5,
    marginBottom: 12,
    textAlign: "center",
  },
});
