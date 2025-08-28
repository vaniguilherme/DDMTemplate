import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { TaskPriority } from '@/src/types';

export interface PriorityIndicatorProps {
  priority: TaskPriority;
  size?: 'small' | 'medium' | 'large';
}

const PRIORITY_COLORS = {
  baixa: '#45B7D1',
  média: '#4ECDC4',
  alta: '#FF6B6B',
};

const SIZES = {
  small: 6,
  medium: 8,
  large: 12,
};

export const PriorityIndicator: React.FC<PriorityIndicatorProps> = ({
  priority,
  size = 'medium',
}) => {
  const indicatorSize = SIZES[size];
  const color = PRIORITY_COLORS[priority];

  return (
    <ThemedView
      style={[
        styles.indicator,
        {
          width: indicatorSize,
          height: indicatorSize,
          borderRadius: indicatorSize / 2,
          backgroundColor: color,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    // Estilos base são aplicados dinamicamente
  },
});
