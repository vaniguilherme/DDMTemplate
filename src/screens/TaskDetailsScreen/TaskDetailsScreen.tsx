import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Button } from "@/src/atoms/Button";
import { Icon } from "@/src/atoms/Icon";
import { Input } from "@/src/atoms/Input";
import { PriorityIndicator } from "@/src/atoms/PriorityIndicator";
import { useTaskContext } from "@/src/hooks";
import { PrioritySelector } from "@/src/molecules/PrioritySelector";
import { Task, TaskPriority } from "@/src/types";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export const TaskDetailsScreen: React.FC = () => {
  const { id } = useLocalSearchParams();
  const { getTaskById, updateTask, toggleTaskCompletion, deleteTask } =
    useTaskContext();
  const colors = useThemeColors();

  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("média");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id && typeof id === "string") {
      const foundTask = getTaskById(id);
      if (foundTask) {
        setTask(foundTask);
        setTitle(foundTask.title);
        setDescription(foundTask.description);
        setPriority(foundTask.priority);
      } else {
        Alert.alert("Erro", "Tarefa não encontrada!");
        router.back();
      }
    }
  }, [id]);

  const handleSaveChanges = async () => {
    if (!title.trim()) {
      Alert.alert("Erro", "O título da tarefa é obrigatório!");
      return;
    }

    if (!task) return;

    setIsLoading(true);
    try {
      await updateTask(task.id, {
        title: title.trim(),
        description: description.trim(),
        priority,
      });

      // Atualizar estado local
      const updatedTask = {
        ...task,
        title: title.trim(),
        description: description.trim(),
        priority,
      };
      setTask(updatedTask);
      setIsEditing(false);
      Alert.alert("Sucesso!", "Tarefa atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleCompletion = async () => {
    if (!task) return;

    try {
      await toggleTaskCompletion(task.id);
      setTask({ ...task, completed: !task.completed });
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleDeleteTask = () => {
    if (!task) return;

    Alert.alert(
      "Deletar Tarefa",
      "Tem certeza que deseja deletar esta tarefa? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteTask(task.id);
              router.back();
            } catch (error) {
              console.error("Erro ao deletar tarefa:", error);
              Alert.alert("Erro", "Não foi possível deletar a tarefa.");
            }
          },
        },
      ]
    );
  };

  const cancelEdit = () => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!task) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>Carregando...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <ThemedView style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Icon name="chevron.left" size={24} color={colors.text} />
        </TouchableOpacity>

        <ThemedText type="title" style={styles.headerTitle}>
          {isEditing ? "Editar Tarefa" : "Detalhes"}
        </ThemedText>

        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Icon
            name={isEditing ? "xmark" : "pencil"}
            size={20}
            color={isEditing ? colors.danger : colors.text}
          />
        </TouchableOpacity>
      </ThemedView>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Status da Tarefa */}
        <ThemedView style={styles.statusContainer}>
          <TouchableOpacity
            style={[
              styles.statusButton,
              { backgroundColor: colors.surface },
              task.completed && [
                styles.completedStatusButton,
                { backgroundColor: colors.success + "20" },
              ],
            ]}
            onPress={handleToggleCompletion}
          >
            <Icon
              name={task.completed ? "checkmark.circle.fill" : "circle"}
              size={24}
              color={task.completed ? colors.success : colors.textSecondary}
            />
            <ThemedText
              style={[
                styles.statusText,
                {
                  color: task.completed ? colors.success : colors.textSecondary,
                },
                task.completed && styles.completedStatusText,
              ]}
            >
              {task.completed ? "Concluída" : "Pendente"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Conteúdo da Tarefa */}
        <ThemedView style={styles.taskContent}>
          {isEditing ? (
            <>
              <Input
                label="Título"
                value={title}
                onChangeText={setTitle}
                placeholder="Título da tarefa"
                maxLength={100}
                showCharCount
              />

              <Input
                label="Descrição"
                value={description}
                onChangeText={setDescription}
                placeholder="Descrição da tarefa"
                maxLength={500}
                showCharCount
                multiline
              />

              <PrioritySelector
                selectedPriority={priority}
                onPriorityChange={setPriority}
              />
            </>
          ) : (
            <>
              <ThemedView style={styles.section}>
                <ThemedText
                  style={[styles.sectionLabel, { color: colors.textSecondary }]}
                >
                  Título
                </ThemedText>
                <ThemedText
                  style={[
                    styles.taskTitle,
                    task.completed && [
                      styles.completedText,
                      { color: colors.placeholder },
                    ],
                  ]}
                >
                  {task.title}
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.section}>
                <ThemedText
                  style={[styles.sectionLabel, { color: colors.textSecondary }]}
                >
                  Descrição
                </ThemedText>
                <ThemedText
                  style={[
                    styles.taskDescription,
                    task.completed && [
                      styles.completedText,
                      { color: colors.placeholder },
                    ],
                  ]}
                >
                  {task.description || "Sem descrição"}
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.section}>
                <ThemedText
                  style={[styles.sectionLabel, { color: colors.textSecondary }]}
                >
                  Prioridade
                </ThemedText>
                <ThemedView style={styles.priorityDisplay}>
                  <PriorityIndicator priority={task.priority} />
                  <ThemedText style={styles.priorityText}>
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </ThemedText>
                </ThemedView>
              </ThemedView>

              <ThemedView style={styles.section}>
                <ThemedText
                  style={[styles.sectionLabel, { color: colors.textSecondary }]}
                >
                  Criada em
                </ThemedText>
                <ThemedText
                  style={[styles.dateText, { color: colors.textSecondary }]}
                >
                  {formatDate(task.createdAt)}
                </ThemedText>
              </ThemedView>
            </>
          )}
        </ThemedView>
      </ScrollView>

      {/* Botões de Ação */}
      <ThemedView
        style={[styles.actionButtons, { borderTopColor: colors.border }]}
      >
        {isEditing ? (
          <>
            <ThemedView style={styles.cancelButtonContainer}>
              <Button
                title="Cancelar"
                variant="secondary"
                onPress={cancelEdit}
                fullWidth
              />
            </ThemedView>

            <ThemedView style={styles.saveButtonContainer}>
              <Button
                title={isLoading ? "Salvando..." : "Salvar"}
                variant="primary"
                onPress={handleSaveChanges}
                disabled={!title.trim() || isLoading}
                fullWidth
              />
            </ThemedView>
          </>
        ) : (
          <Button
            title="Deletar Tarefa"
            variant="danger"
            onPress={handleDeleteTask}
            fullWidth
          />
        )}
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerButton: {
    padding: 8,
    width: 40,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 120, // Espaço para os botões
  },
  statusContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  completedStatusButton: {
    // This will be overridden by inline styles with theme colors
  },
  statusText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  completedStatusText: {
    // This will use theme colors
  },
  taskContent: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  },
  taskDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  priorityDisplay: {
    flexDirection: "row",
    alignItems: "center",
  },
  priorityText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  dateText: {
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: "row",
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  cancelButtonContainer: {
    width: "40%",
    marginRight: 6,
  },
  saveButtonContainer: {
    width: "56%",
    marginLeft: 6,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
