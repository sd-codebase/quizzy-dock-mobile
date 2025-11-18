import { IconSymbol } from "@/components/ui/icon-symbol";
import { StyleSheet, Text, View } from "react-native";

export function Logo() {
  return (
    <View style={styles.container}>
      <IconSymbol
        name="bolt.fill"
        size={32}
        color="#6366f1"
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.quizzyText}>Quizzy</Text>
          <Text style={styles.dockText}>Dock</Text>
        </View>
        <Text style={styles.subtitleText}>TECH SKILLS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
    justifyContent: "center",
  },
  icon: {
    marginRight: 4,
  },
  textContainer: {
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  quizzyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: -0.5,
    marginBottom: -4,
  },
  dockText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6366f1",
    letterSpacing: -0.5,
    marginBottom: -4,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#b0b1b8",
    letterSpacing: 1.2,
  },
});
