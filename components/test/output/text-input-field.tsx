import { StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';

interface TextInputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

/**
 * TextInputField Component
 * Custom text input for output test with focus states
 */
export function TextInputField({
  value,
  onChangeText,
  disabled = false,
  placeholder = "Type the output here...",
}: TextInputFieldProps) {
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
          styles.input,
          disabled && styles.inputDisabled,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#d1d5db"
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        multiline={true}
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
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
    minHeight: 48,
    textAlignVertical: 'top',
  },
  inputDisabled: {
    color: '#9ca3af',
  },
});
