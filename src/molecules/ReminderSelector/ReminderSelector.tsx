import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/src/atoms";
import { ReminderTime } from "@/src/types";
import React from "react";
import { StyleSheet } from "react-native";

interface ReminderSelectorProps {
  selectedReminder?: ReminderTime;
  onReminderChange: (reminder?: ReminderTime) => void;
}

export const ReminderSelector: React.FC<ReminderSelectorProps> = ({
  selectedReminder,
  onReminderChange,
}) => {
  const reminderOptions: { value: ReminderTime; label: string }[] = [
    { value: 1, label: "1 minuto" },
    { value: 10, label: "10 minutos" },
    { value: 60, label: "1 hora" },
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Lembrete</ThemedText>
      <ThemedText style={styles.subtitle}>
        Quando você quer ser lembrado dessa tarefa?
      </ThemedText>

      <ThemedView style={styles.buttonsContainer}>
        {reminderOptions.map((option) => (
          <Button
            key={option.value}
            title={option.label}
            variant={
              selectedReminder === option.value ? "primary" : "secondary"
            }
            onPress={() => {
              const newValue =
                selectedReminder === option.value ? undefined : option.value;
              onReminderChange(newValue);
            }}
            style={styles.reminderButton}
          />
        ))}
      </ThemedView>

      {selectedReminder && (
        <ThemedView style={styles.selectedInfo}>
          <ThemedText style={styles.selectedText}>
            ✓ Você será lembrado em{" "}
            {reminderOptions.find((o) => o.value === selectedReminder)?.label}
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  reminderButton: {
    flex: 1,
  },
  selectedInfo: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#e8f5e8",
    borderRadius: 8,
  },
  selectedText: {
    fontSize: 14,
    color: "#2d6a2d",
    textAlign: "center",
  },
});
