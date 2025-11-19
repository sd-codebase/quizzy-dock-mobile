import { StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';

interface TextareaInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * TextareaInputField Component
 * Custom textarea for interview answers with focus states
 */
export function TextareaInputField({
  value,
  onChangeText,
  disabled = false,
  placeholder = "Write your answer here...",
}: TextareaInputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        isFocused && !disabled && styles.containerFocused,
        disabled && styles.containerDisabled,
      ]}
    >
      <TextInput
        style={[
          styles.textarea,
          disabled && styles.textareaDisabled,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#d1d5db"
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        multiline={true}
        numberOfLines={6}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
  containerFocused: {
    borderColor: '#a5d6ff',
    backgroundColor: '#ffffff',
  },
  containerDisabled: {
    opacity: 0.8,
  },
  textarea: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
    minHeight: 144,
    textAlignVertical: 'top',
  },
  textareaDisabled: {
    color: '#9ca3af',
  },
});
