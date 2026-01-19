import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { Task, TaskStatus, TaskContextType } from '../types';
import { useLocalStorage } from '../hooks';
import {
  generateId,
  getCurrentTimestamp,
  filterTasksByStatus,
} from '../utils';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('kanban-tasks', []);

  // Initialize with sample data if empty
  useEffect(() => {
    if (tasks.length === 0) {
      const sampleTasks: Task[] = [
        {
          id: generateId(),
          title: 'Design new landing page',
          description: 'Create wireframes and mockups for the new product landing page',
          status: 'todo',
          priority: 'high',
          tags: ['design', 'ui/ux'],
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: generateId(),
          title: 'Implement authentication',
          description: 'Add JWT-based authentication to the backend API',
          status: 'inprogress',
          priority: 'high',
          tags: ['backend', 'security'],
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
        },
        {
          id: generateId(),
          title: 'Write documentation',
          description: 'Document the API endpoints and usage examples',
          status: 'todo',
          priority: 'medium',
          tags: ['documentation'],
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
        },
        {
          id: generateId(),
          title: 'Fix mobile responsiveness',
          description: 'Ensure all pages work correctly on mobile devices',
          status: 'inprogress',
          priority: 'medium',
          tags: ['frontend', 'bug'],
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: generateId(),
          title: 'Set up CI/CD pipeline',
          description: 'Configure GitHub Actions for automated testing and deployment',
          status: 'done',
          priority: 'low',
          tags: ['devops', 'automation'],
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
        },
        {
          id: generateId(),
          title: 'Code review for PR #42',
          description: 'Review the new feature implementation',
          status: 'done',
          priority: 'medium',
          tags: ['review'],
          createdAt: getCurrentTimestamp(),
          updatedAt: getCurrentTimestamp(),
        },
      ];
      setTasks(sampleTasks);
    }
  }, []);

  // Add new task
  const addTask = useCallback(
    (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newTask: Task = {
        ...taskData,
        id: generateId(),
        createdAt: getCurrentTimestamp(),
        updatedAt: getCurrentTimestamp(),
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    },
    [setTasks]
  );

  // Update existing task
  const updateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? { ...task, ...updates, updatedAt: getCurrentTimestamp() }
            : task
        )
      );
    },
    [setTasks]
  );

  // Delete task
  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  // Move task to different status
  const moveTask = useCallback(
    (taskId: string, newStatus: TaskStatus) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, status: newStatus, updatedAt: getCurrentTimestamp() }
            : task
        )
      );
    },
    [setTasks]
  );

  // Get tasks by status
  const getTasksByStatus = useCallback(
    (status: TaskStatus): Task[] => {
      return filterTasksByStatus(tasks, status);
    },
    [tasks]
  );

  const value: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByStatus,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};