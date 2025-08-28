import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import { PageTemplate } from '@/src/templates';
import { Button } from '@/src/atoms';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/src/hooks';

export function AboutScreen() {
  const { user } = useAuth();
  const [tapCount, setTapCount] = useState(0);
  const [easterEggActivated, setEasterEggActivated] = useState(false);

  const handleOpenLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Erro ao abrir link:', error);
      Alert.alert('Erro', 'Não foi possível abrir o link');
    }
  };

  const handleIconTap = () => {
    const newTapCount = tapCount + 1;
    setTapCount(newTapCount);

    // Vibração curta para feedback tátil
    Vibration.vibrate(50);

    if (newTapCount === 10 && !easterEggActivated) {
      setEasterEggActivated(true);
      // Reset do contador
      setTapCount(0);
      
      // Alert divertido
      Alert.alert(
        '🎉 Easter Egg Descoberto! 🎉',
        'Parabéns! Você encontrou o segredo escondido! Preparado para uma surpresa?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => setEasterEggActivated(false)
          },
          {
            text: '🎬 Ver Vídeo',
            onPress: () => {
              // Link para um vídeo engraçado do YouTube
              handleOpenLink('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
              setEasterEggActivated(false);
            }
          }
        ]
      );
    } else if (newTapCount >= 5 && newTapCount < 10) {
      // Feedback visual quando está chegando perto
      const remaining = 10 - newTapCount;
      Alert.alert(
        '🤔 Hmm...',
        `Algo interessante pode acontecer... ${remaining} toques restantes!`,
        [{ text: 'OK', style: 'default' }]
      );
    }

    // Reset automático após 5 segundos de inatividade
    setTimeout(() => {
      if (newTapCount < 10) {
        setTapCount(0);
      }
    }, 5000);
  };

  return (
    <PageTemplate
      title="Sobre"
      subtitle="Informações do aplicativo"
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* App Info */}
        <View style={styles.section}>
          <TouchableOpacity onPress={handleIconTap} style={styles.iconContainer}>
            <Text style={[styles.appIcon, tapCount > 0 && tapCount < 10 && styles.appIconAnimated]}>
              📋
            </Text>
            {tapCount > 0 && tapCount < 10 && (
              <Text style={styles.tapCounter}>{tapCount}/10</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.appName}>DDM Template</Text>
          <Text style={styles.appVersion}>Versão 1.0.0</Text>
          <Text style={styles.appDescription}>
            Sistema de Gerenciamento de Tarefas desenvolvido com React Native e Expo
          </Text>
        </View>

        {/* User Info */}
        {user && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👤 Usuário Logado</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Nome:</Text>
              <Text style={styles.infoValue}>{user.name}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>
        )}

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Funcionalidades</Text>
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>• Gerenciamento de tarefas</Text>
            <Text style={styles.featureItem}>• Sistema de prioridades</Text>
            <Text style={styles.featureItem}>• Autenticação local</Text>
            <Text style={styles.featureItem}>• Interface responsiva</Text>
            <Text style={styles.featureItem}>• Modo claro e escuro</Text>
            <Text style={styles.featureItem}>• Persistência de dados</Text>
          </View>
        </View>

        {/* Technologies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛠️ Tecnologias</Text>
          <View style={styles.techContainer}>
            <View style={styles.techItem}>
              <Text style={styles.techName}>React Native</Text>
              <Text style={styles.techVersion}>0.79.5</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techName}>Expo</Text>
              <Text style={styles.techVersion}>~53.0.20</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techName}>Expo Router</Text>
              <Text style={styles.techVersion}>~5.1.4</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techName}>TypeScript</Text>
              <Text style={styles.techVersion}>~5.8.3</Text>
            </View>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📞 Contato & Links</Text>
          <Button
            title="Repositório no GitHub"
            variant="outline"
            onPress={() => handleOpenLink('https://github.com/vaniguilherme/DDMTemplate')}
            style={styles.linkButton}
          />
          <Button
            title="Documentação do Expo"
            variant="outline"
            onPress={() => handleOpenLink('https://docs.expo.dev/')}
            style={styles.linkButton}
          />
          <Button
            title="React Native Docs"
            variant="outline"
            onPress={() => handleOpenLink('https://reactnative.dev/')}
            style={styles.linkButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Desenvolvido com ❤️ usando React Native
          </Text>
          <Text style={styles.footerText}>
            © 2025 DDM Template
          </Text>
        </View>
      </ScrollView>
    </PageTemplate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  appIcon: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  appIconAnimated: {
    transform: [{ scale: 1.1 }],
    opacity: 0.8,
  },
  tapCounter: {
    position: 'absolute',
    bottom: 0,
    right: '40%',
    backgroundColor: Colors.light.tint,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.light.text,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.tabIconDefault,
    marginBottom: 12,
  },
  appDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.light.text,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.tabIconDefault,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '500',
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
  },
  techContainer: {
    gap: 12,
  },
  techItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  techName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.text,
  },
  techVersion: {
    fontSize: 12,
    color: Colors.light.tabIconDefault,
    fontFamily: 'monospace',
  },
  linkButton: {
    marginBottom: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: Colors.light.tabIconDefault,
    textAlign: 'center',
    marginBottom: 4,
  },
});
