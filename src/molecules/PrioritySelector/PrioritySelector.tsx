import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { PriorityIndicator } from '@/src/atoms';
import { TaskPriority } from '@/src/types';

export interface PrioritySelectorProps {
  selectedPriority: TaskPriority;
  onPriorityChange: (priority: TaskPriority) => void;
  label?: string;
}

const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: 'baixa', label: 'Baixa' },
  { value: 'média', label: 'Média' },
  { value: 'alta', label: 'Alta' },
];

export const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  selectedPriority,
  onPriorityChange,
  label = 'Prioridade',
}) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <ThemedView style={styles.optionsContainer}>
        {PRIORITY_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              selectedPriority === option.value && styles.selectedOption,
            ]}
            onPress={() => onPriorityChange(option.value)}
          >
            <PriorityIndicator priority={option.value} size="medium" />
            <ThemedText
              style={[
                styles.optionText,
                selectedPriority === option.value && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#fafafa',
  },
  selectedOption: {
    backgroundColor: '#f0f0f0',
    borderColor: '#4CAF50',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginLeft: 8,
  },
  selectedOptionText: {
    color: '#333',
    fontWeight: '600',
  },
});
