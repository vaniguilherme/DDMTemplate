import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  multiline?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  multiline = false,
  maxLength,
  showCharCount = false,
  style,
  value,
  ...props
}) => {
  return (
    <ThemedView style={styles.container}>
      {label && (
        <ThemedText style={styles.label}>{label}</ThemedText>
      )}
      
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          error && styles.inputError,
          style,
        ]}
        value={value}
        maxLength={maxLength}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        placeholderTextColor="#999"
        {...props}
      />
      
      <ThemedView style={styles.footer}>
        {error && (
          <ThemedText style={styles.error}>{error}</ThemedText>
        )}
        {showCharCount && maxLength && (
          <ThemedText style={styles.charCount}>
            {(value?.length || 0)}/{maxLength}
          </ThemedText>
        )}
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
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
    minHeight: 48,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  error: {
    fontSize: 12,
    color: '#FF6B6B',
  },
  charCount: {
    fontSize: 12,
    color: '#999',
  },
});
