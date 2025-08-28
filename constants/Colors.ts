/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    // Extended colors for better theming
    primary: "#4CAF50",
    secondary: "#e0e0e0",
    danger: "#FF6B6B",
    success: "#4CAF50",
    warning: "#FFA726",
    info: "#29B6F6",
    surface: "#f8f9fa",
    border: "#e9ecef",
    placeholder: "#999",
    textSecondary: "#666",
    cardBackground: "#fff",
    shadowColor: "#000",
    overlayBackground: "rgba(0, 0, 0, 0.5)",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    // Extended colors for better theming
    primary: "#66BB6A",
    secondary: "#424242",
    danger: "#FF8A80",
    success: "#66BB6A",
    warning: "#FFB74D",
    info: "#4FC3F7",
    surface: "#262629",
    border: "#3C3C3F",
    placeholder: "#8E8E93",
    textSecondary: "#9BA1A6",
    cardBackground: "#1E1E20",
    shadowColor: "#000",
    overlayBackground: "rgba(0, 0, 0, 0.7)",
  },
};
