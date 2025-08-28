import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  style,
  disabled,
  ...props
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const getButtonStyle = () => {
    const sizeStyle =
      size === "small"
        ? styles.small
        : size === "large"
        ? styles.large
        : styles.medium;

    const baseStyle = [styles.button, sizeStyle, fullWidth && styles.fullWidth];

    if (disabled) {
      return [
        ...baseStyle,
        { backgroundColor: colors.secondary, opacity: 0.6 },
      ];
    }

    switch (variant) {
      case "primary":
        return [...baseStyle, { backgroundColor: colors.primary }];
      case "secondary":
        return [
          ...baseStyle,
          {
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: colors.secondary,
          },
        ];
      case "danger":
        return [...baseStyle, { backgroundColor: colors.danger }];
      case "outline":
        return [
          ...baseStyle,
          {
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: colors.primary,
          },
        ];
      default:
        return [...baseStyle, { backgroundColor: colors.primary }];
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return colors.textSecondary;
    }

    switch (variant) {
      case "primary":
      case "danger":
        return "#ffffff";
      case "secondary":
        return colors.textSecondary;
      case "outline":
        return colors.primary;
      default:
        return "#ffffff";
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      disabled={disabled}
      {...props}
    >
      <ThemedText
        style={[styles.text, { color: getTextColor() }]}
        lightColor={getTextColor()}
        darkColor={getTextColor()}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  // States
  fullWidth: {
    width: "100%",
  },
  // Text styles
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
