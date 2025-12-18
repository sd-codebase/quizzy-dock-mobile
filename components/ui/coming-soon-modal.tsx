import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface ComingSoonModalProps {
  visible: boolean;
  onClose: () => void;
  onContinue?: () => void;
  questionCount: string | number;
  subjectName?: string;
  showContinueButton?: boolean;
}

/**
 * ComingSoonModal Component
 * Displays a modal informing users that a subject will be available soon
 * Used for both subjects (with continue button) and subtopics (without)
 */
export function ComingSoonModal({
  visible,
  onClose,
  onContinue,
  questionCount,
  subjectName,
  showContinueButton = false,
}: ComingSoonModalProps) {
  const formattedCount =
    typeof questionCount === "string"
      ? questionCount
      : questionCount.toString();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>Coming Soon!</Text>
            <Text style={styles.message}>
              {subjectName || "This subject"} will be live soon with{" "}
              {formattedCount}+ questions
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.button,
                styles.secondaryButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>

            {showContinueButton && onContinue && (
              <Pressable
                onPress={onContinue}
                style={({ pressed }) => [
                  styles.button,
                  styles.primaryButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#1a1d35",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2a2d45",
    padding: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    fontWeight: "400",
    color: "#9ca3af",
    lineHeight: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#6366f1",
  },
  secondaryButton: {
    backgroundColor: "#2a2d45",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },
});
