import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Icon, PriorityIndicator } from "@/src/atoms";
import { Task } from "@/src/types";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export interface TaskItemProps {
  task: Task;
  onPress?: (task: Task) => void;
  onToggleComplete?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onPress,
  onToggleComplete,
  onDelete,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        },
        task.completed && [
          styles.completedContainer,
          {
            backgroundColor: colors.surface,
          },
        ],
      ]}
      onPress={() => onPress?.(task)}
    >
      <ThemedView style={styles.content}>
        <ThemedView style={styles.mainContent}>
          <ThemedView style={styles.titleRow}>
            <ThemedText
              style={[
                styles.title,
                task.completed && [
                  styles.completedText,
                  {
                    color: colors.textSecondary,
                  },
                ],
              ]}
              numberOfLines={1}
            >
              {task.title}
            </ThemedText>
            <PriorityIndicator priority={task.priority} />
          </ThemedView>

          {!!task.description && (
            <ThemedText
              style={[
                styles.description,
                { color: colors.textSecondary },
                task.completed && [
                  styles.completedText,
                  {
                    color: colors.textSecondary,
                  },
                ],
              ]}
              numberOfLines={2}
            >
              {task.description}
            </ThemedText>
          )}
        </ThemedView>

        <ThemedView style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onToggleComplete?.(task.id)}
          >
            <Icon
              name={task.completed ? "checkmark.circle.fill" : "circle"}
              size={24}
              color={task.completed ? colors.success : colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onDelete?.(task.id)}
          >
            <Icon name="trash" size={20} color={colors.danger} />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  completedContainer: {
    opacity: 0.7,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
  },
  mainContent: {
    flex: 1,
    marginRight: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
});
