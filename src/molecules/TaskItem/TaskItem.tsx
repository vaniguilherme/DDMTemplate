import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Icon, PriorityIndicator } from '@/src/atoms';
import { Task } from '@/src/types';

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
  return (
    <TouchableOpacity
      style={[styles.container, task.completed && styles.completedContainer]}
      onPress={() => onPress?.(task)}
    >
      <ThemedView style={styles.content}>
        <ThemedView style={styles.mainContent}>
          <ThemedView style={styles.titleRow}>
            <ThemedText
              style={[
                styles.title,
                task.completed && styles.completedText,
              ]}
              numberOfLines={1}
            >
              {task.title}
            </ThemedText>
            <PriorityIndicator priority={task.priority} />
          </ThemedView>
          
          {task.description && (
            <ThemedText
              style={[
                styles.description,
                task.completed && styles.completedText,
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
              name={task.completed ? 'checkmark.circle.fill' : 'circle'}
              size={24}
              color={task.completed ? '#4CAF50' : '#666'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onDelete?.(task.id)}
          >
            <Icon name="trash" size={20} color="#FF6B6B" />
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
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  completedContainer: {
    opacity: 0.7,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  mainContent: {
    flex: 1,
    marginRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
});
