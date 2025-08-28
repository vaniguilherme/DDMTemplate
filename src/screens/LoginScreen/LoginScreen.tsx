import { Colors } from "@/constants/Colors";
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
  View,
} from "react-native";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>📋</Text>
          <Text style={styles.title}>DDM Template</Text>
          <Text style={styles.subtitle}>
            Sistema de Gerenciamento de Tarefas
          </Text>
        </View>

        <View style={styles.formContainer}>
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

          <View style={styles.credentialsInfo}>
            <Text style={styles.credentialsTitle}>
              Credenciais de Demonstração:
            </Text>
            <Text style={styles.credentialsText}>Email: admin@ddm.com</Text>
            <Text style={styles.credentialsText}>Senha: 123456</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
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
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.tabIconDefault,
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
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  credentialsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  credentialsText: {
    fontSize: 12,
    color: Colors.light.tabIconDefault,
    fontFamily: "monospace",
  },
});
