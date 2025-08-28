import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '@/src/types';

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Estudar React Native',
    description: 'Revisar conceitos de componentes, navegação e estado. Focar em hooks e Context API.',
    completed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 dias atrás
    priority: 'alta',
  },
  {
    id: '2',
    title: 'Preparar apresentação',
    description: 'Criar slides para a reunião de segunda-feira sobre o projeto mobile.',
    completed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 dia atrás
    priority: 'média',
  },
  {
    id: '3',
    title: 'Fazer compras',
    description: 'Comprar ingredientes para o jantar de domingo: carne, legumes, arroz e temperos.',
    completed: true,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 horas atrás
    priority: 'baixa',
  },
  {
    id: '4',
    title: 'Revisar código do projeto',
    description: 'Fazer code review do pull request da funcionalidade de autenticação.',
    completed: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hora atrás
    priority: 'alta',
  },
  {
    id: '5',
    title: 'Exercitar-se',
    description: 'Ir à academia ou fazer uma caminhada de 30 minutos no parque.',
    completed: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 horas atrás
    priority: 'média',
  },
];

export const addSampleData = async (): Promise<void> => {
  try {
    // Verificar se já existem dados
    const existingData = await AsyncStorage.getItem('tasks');
    if (!existingData) {
      // Adicionar dados de exemplo apenas se não existirem dados
      await AsyncStorage.setItem('tasks', JSON.stringify(sampleTasks));
      console.log('Dados de exemplo adicionados com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao adicionar dados de exemplo:', error);
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('tasks');
    console.log('Todos os dados foram removidos!');
  } catch (error) {
    console.error('Erro ao limpar dados:', error);
  }
};
