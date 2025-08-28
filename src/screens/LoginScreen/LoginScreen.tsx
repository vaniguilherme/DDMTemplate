import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Button, Input } from "@/src/atoms";
import { useAuth } from "@/src/hooks";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha os campos");
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (!success) {
        Alert.alert(
          "Erro de Autenticação",
          "Credenciais inválidas. Use:\nEmail: admin@ddm.com\nSenha: 123456"
        );
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      Alert.alert("Erro", "Ocorreu um erro durante o login");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail("admin@ddm.com");
    setPassword("123456");
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.logoContainer}>
          <Text style={styles.logo}>📋</Text>
          <ThemedText style={styles.title}>DDM Template</ThemedText>
          <ThemedText
            style={[styles.subtitle, { color: colors.textSecondary }]}
          >
            Sistema de Gerenciamento de Tarefas
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.formContainer}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <Input
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry
            style={styles.input}
          />

          <Button
            title={isLoading ? "Entrando..." : "Entrar"}
            onPress={handleLogin}
            disabled={isLoading}
            style={styles.loginButton}
          />

          <Button
            title="Usar Credenciais Demo"
            onPress={fillDemoCredentials}
            variant="outline"
            style={styles.demoButton}
          />

          <ThemedView
            style={[
              styles.credentialsInfo,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <ThemedText style={styles.credentialsTitle}>
              Credenciais de Demonstração:
            </ThemedText>
            <ThemedText
              style={[styles.credentialsText, { color: colors.textSecondary }]}
            >
              Email: admin@ddm.com
            </ThemedText>
            <ThemedText
              style={[styles.credentialsText, { color: colors.textSecondary }]}
            >
              Senha: 123456
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  demoButton: {
    marginBottom: 32,
  },
  credentialsInfo: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  credentialsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  credentialsText: {
    fontSize: 12,
    fontFamily: "monospace",
  },
});
