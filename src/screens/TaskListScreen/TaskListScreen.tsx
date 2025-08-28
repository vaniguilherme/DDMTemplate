import { Button } from "@/src/atoms";
import { useAuth, useTaskContext } from "@/src/hooks";
import { TaskList } from "@/src/organisms";
import { PageTemplate } from "@/src/templates";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { Alert, StyleSheet, View } from "react-native";

export const TaskListScreen: React.FC = () => {
  const {
    tasks,
    refreshing,
    toggleTaskCompletion,
    deleteTask,
    onRefresh,
    getTaskStats,
  } = useTaskContext();
  const { logout, user } = useAuth();

  // Atualizar quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      // Força uma pequena atualização para garantir sincronização
    }, [])
  );

  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", onPress: () => void logout(), style: "destructive" },
    ]);
  };

  const stats = getTaskStats();

  return (
    <PageTemplate
      title="Minhas Tarefas"
      subtitle={`Olá, ${user?.name}! ${stats.pending} pendentes de ${stats.total}`}
    >
      <View style={styles.container}>
        <TaskList
          tasks={tasks}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onToggleComplete={toggleTaskCompletion}
          onDeleteTask={deleteTask}
        />

        <View style={styles.logoutContainer}>
          <Button
            title="Sair"
            variant="outline"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </View>
      </View>
    </PageTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  logoutButton: {
    backgroundColor: "transparent",
    borderColor: "#FF6B6B",
  },
});
