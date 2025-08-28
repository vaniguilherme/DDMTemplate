import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Icon } from "@/src/atoms";
import React from "react";
import { StyleSheet } from "react-native";

export interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "checklist",
  title,
  subtitle,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <Icon name={icon} size={64} color={colors.textSecondary} />
      <ThemedText
        style={[styles.title, { color: colors.textSecondary }]}
        lightColor={colors.textSecondary}
        darkColor={colors.textSecondary}
      >
        {title}
      </ThemedText>
      {subtitle && (
        <ThemedText
          style={[styles.subtitle, { color: colors.placeholder }]}
          lightColor={colors.placeholder}
          darkColor={colors.placeholder}
        >
          {subtitle}
        </ThemedText>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
});
