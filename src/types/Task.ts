export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  priority: TaskPriority;
  reminderTime?: number; // Tempo em minutos
}

export type TaskPriority = "baixa" | "média" | "alta";

export type ReminderTime = 1 | 10 | 60; // 1 min, 10 min, 1 hora

export interface CreateTaskData {
  title: string;
  description: string;
  priority: TaskPriority;
  reminderTime?: ReminderTime;
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  completed?: boolean;
}
