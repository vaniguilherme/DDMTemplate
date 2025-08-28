import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Button } from "@/src/atoms";
import { useAuth } from "@/src/hooks";
import { PageTemplate } from "@/src/templates";
import { Alert, StyleSheet, View } from "react-native";

export const SettingsScreen = () => {
  const { logout, user } = useAuth();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", onPress: () => void logout(), style: "destructive" },
    ]);
  };

  return (
    <PageTemplate title="Configurações" subtitle={`Usuário: ${user?.name}`}>
      <View style={styles.container}>
        <View style={styles.logoutContainer}>
          <Button
            title="Sair"
            variant="outline"
            onPress={handleLogout}
            style={[
              styles.logoutButton,
              {
                borderColor: colors.danger,
              },
            ]}
          />
        </View>
      </View>
    </PageTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  logoutContainer: {
    width: "100%",
  },
  logoutButton: {
    backgroundColor: "transparent",
  },
});
