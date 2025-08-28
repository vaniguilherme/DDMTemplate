import { useAuth, useTaskContext } from "@/src/hooks";
import { TaskList } from "@/src/organisms";
import { PageTemplate } from "@/src/templates";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

export const TaskListScreen = () => {
  const {
    tasks,
    refreshing,
    toggleTaskCompletion,
    deleteTask,
    onRefresh,
    getTaskStats,
  } = useTaskContext();
  const { user } = useAuth();

  // Atualizar quando a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      // Força uma pequena atualização para garantir sincronização
    }, [])
  );

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
      </View>
    </PageTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
