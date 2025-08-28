import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

/**
 * Hook que retorna as cores do tema atual (light/dark)
 * Facilita o acesso às cores em qualquer componente
 */
export function useThemeColors() {
  const colorScheme = useColorScheme() ?? "light";
  return Colors[colorScheme];
}

/**
 * Hook que retorna uma cor específica do tema atual
 */
export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  fallback?: string
) {
  const colors = useThemeColors();
  return colors[colorName] || fallback || "#000";
}
