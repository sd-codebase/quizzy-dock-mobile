import { StyleSheet, View } from 'react-native';
import { OptionButton } from './option-button';

interface Option {
  text: string;
  index: number;
}

interface OptionsContainerProps {
  options: string[];
  selectedIndex: number | null;
  correctIndex: number;
  showResults: boolean;
  onSelectOption: (index: number) => void;
}

/**
 * OptionsContainer Component
 * Displays all answer options in a vertical stack
 */
export function OptionsContainer({
  options,
  selectedIndex,
  correctIndex,
  showResults,
  onSelectOption,
}: OptionsContainerProps) {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <OptionButton
          key={index}
          text={option}
          isSelected={selectedIndex === index}
          isCorrect={showResults && index === correctIndex}
          isIncorrect={showResults && selectedIndex === index && index !== correctIndex}
          onPress={() => onSelectOption(index)}
          disabled={showResults || selectedIndex !== null}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});
