# 📝 App Lista de Tarefas - Exemplo para Aula

Um aplicativo completo de lista de tarefas desenvolvido com **React Native** e **Expo** para demonstrar conceitos fundamentais de desenvolvimento mobile.

## 🚀 Funcionalidades

### ✅ Gerenciamento de Tarefas
- **Criar** novas tarefas com título, descrição e prioridade
- **Visualizar** lista completa de tarefas 
- **Editar** tarefas existentes
- **Marcar** como concluída/pendente
- **Deletar** tarefas
- **Persistência** de dados local com AsyncStorage

### 🎯 Níveis de Prioridade
- **Alta** (vermelho) - Para tarefas urgentes
- **Média** (azul-verde) - Para tarefas importantes  
- **Baixa** (azul) - Para tarefas menos urgentes

### 📱 Navegação
- **Tab Navigation** - Navegação entre telas principais
- **Stack Navigation** - Para tela de detalhes
- **Parâmetros** - Passagem de dados entre telas

## 🏗️ Estrutura do Projeto (Atomic Design)

```
DDMTemplate/
├── app/                       # 🚀 Navegação (Expo Router)
│   ├── (tabs)/
│   │   ├── index.tsx          # 🔗 Tab: Lista de Tarefas
│   │   ├── explore.tsx        # 🔗 Tab: Adicionar Tarefa
│   │   └── _layout.tsx        # 🔧 Layout das Tabs
│   ├── task-details.tsx       # 🔗 Página: Detalhes
│   └── _layout.tsx            # 🔧 Layout Principal
├── src/                       # 📦 Código Organizado (Atomic Design)
│   ├── atoms/                 # ⚛️ Componentes Básicos
│   │   ├── Button/            # 🔘 Botão Reutilizável
│   │   ├── Input/             # 📝 Input de Texto
│   │   ├── Icon/              # 🎯 Ícones
│   │   └── PriorityIndicator/ # 🔴 Indicador de Prioridade
│   ├── molecules/             # 🧬 Combinações de Atoms
│   │   ├── TaskItem/          # ✅ Item da Lista de Tarefas
│   │   ├── PrioritySelector/  # 🎚️ Seletor de Prioridade
│   │   └── EmptyState/        # 🗃️ Estado Vazio
│   ├── organisms/             # 🦴 Seções Complexas
│   │   ├── TaskList/          # 📋 Lista Completa de Tarefas
│   │   └── TaskForm/          # 📝 Formulário de Tarefa
│   ├── templates/             # 📐 Layouts de Página
│   │   └── PageTemplate/      # 📄 Template Base
│   ├── screens/               # 📱 Telas Finais
│   │   ├── TaskListScreen/    # 📋 Tela da Lista
│   │   ├── AddTaskScreen/     # ➕ Tela Adicionar
│   │   └── TaskDetailsScreen/ # 📝 Tela Detalhes
│   ├── hooks/                 # 🪝 Lógica Reutilizável
│   │   └── useTasks.ts        # 📊 Gerenciamento de Tarefas
│   ├── types/                 # 🏷️ Tipagens TypeScript
│   │   └── Task.ts            # 📝 Interface de Tarefa
│   └── utils/                 # 🛠️ Funções Auxiliares
│       └── sampleData.ts      # 📊 Dados de Exemplo
└── components/                # 🧩 Componentes do Expo (Mantidos)
```

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento
- **Expo Router** - Navegação baseada em arquivos
- **AsyncStorage** - Armazenamento local
- **TypeScript** - Tipagem estática
- **React Hooks** - useState, useEffect

## 🎨 Conceitos Demonstrados

### 🏗️ Atomic Design
- **Atoms** - Componentes básicos (Button, Input, Icon)
- **Molecules** - Combinações simples (TaskItem, PrioritySelector)
- **Organisms** - Seções complexas (TaskList, TaskForm)
- **Templates** - Layouts reutilizáveis (PageTemplate)
- **Screens** - Páginas finais (TaskListScreen, AddTaskScreen)

### 📱 React Native
- Componentes nativos (View, Text, FlatList, TouchableOpacity)
- Estilização com StyleSheet
- Gerenciamento de estado com useState
- Efeitos com useEffect
- Navegação entre telas

### 🪝 Hooks Customizados
- **useTasks** - Lógica completa de gerenciamento de tarefas
- **useState** - Estado local dos componentes
- **useEffect** - Ciclo de vida e efeitos colaterais
- **useLocalSearchParams** - Parâmetros de navegação

### 💾 Persistência de Dados
- **AsyncStorage** - Armazenamento local persistente
- **JSON** - Serialização e deserialização
- **Try/Catch** - Tratamento robusto de erros

### 🧭 Navegação
- **Tab Navigation** - Navegação por abas
- **Stack Navigation** - Pilha de telas
- **Programmatic Navigation** - Navegação por código
- **Parâmetros** - Passagem de dados entre telas

### 🎯 Padrões Avançados
- **TypeScript** - Tipagem estática completa
- **Componentização** - Reutilização e modularidade
- **Separation of Concerns** - Separação de responsabilidades
- **Custom Hooks** - Lógica reutilizável
- **Atomic Design** - Arquitetura escalável

## 🚦 Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor:**
   ```bash
   npm start
   ```

3. **Executar no dispositivo:**
   - Escaneie o QR code com o app Expo Go
   - Ou pressione `a` para Android / `i` para iOS
---

**Desenvolvido para fins educacionais** 🎓
Disciplina de Dispositivos Móveis - Unochapecó
