import { CreateTaskData, Task, UpdateTaskData } from '@/src/types';
import React, { createContext, useContext } from 'react';
import { useTasks } from './useTasks';

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  refreshing: boolean;
  createTask: (taskData: CreateTaskData) => Promise<Task>;
  updateTask: (taskId: string, updates: UpdateTaskData) => Promise<void>;
  toggleTaskCompletion: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  getTaskById: (taskId: string) => Task | undefined;
  onRefresh: () => Promise<void>;
  getTaskStats: () => { total: number; completed: number; pending: number };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const taskHook = useTasks();

  return (
    <TaskContext.Provider value={taskHook}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
