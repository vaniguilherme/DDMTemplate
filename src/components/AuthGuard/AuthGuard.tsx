import { Colors } from "@/constants/Colors";
import { useAuth } from "@/src/hooks";
import { useRouter, useSegments } from "expo-router";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export function AuthGuard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(tabs)";

    if (isLoading) return;

    if (!isAuthenticated && inAuthGroup) {
      // Redirect para login se não autenticado e tentando acessar área protegida
      router.replace("/login");
    } else if (
      isAuthenticated &&
      !inAuthGroup &&
      segments[0] !== "task-details"
    ) {
      // Redirect para home se autenticado e não em área protegida
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isLoading, segments, router]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
});
