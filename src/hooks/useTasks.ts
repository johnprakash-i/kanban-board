import { useMemo } from 'react';
import { useTaskContext } from '../context';
import { Task, TaskPriority } from '../types';
import { sortTasksByPriority, sortTasksByCreatedDate } from '../utils';

export const useTasks = () => {
  const context = useTaskContext();

  // Get tasks by status
  const todoTasks = useMemo(
    () => context.getTasksByStatus('todo'),
    [context]
  );

  const inProgressTasks = useMemo(
    () => context.getTasksByStatus('inprogress'),
    [context]
  );

  const doneTasks = useMemo(
    () => context.getTasksByStatus('done'),
    [context]
  );

  // Get sorted tasks by priority
  const tasksByPriority = useMemo(
    () => sortTasksByPriority(context.tasks),
    [context.tasks]
  );

  // Get sorted tasks by date
  const tasksByDate = useMemo(
    () => sortTasksByCreatedDate(context.tasks),
    [context.tasks]
  );

  // Get tasks count by status
  const tasksCount = useMemo(
    () => ({
      todo: todoTasks.length,
      inprogress: inProgressTasks.length,
      done: doneTasks.length,
      total: context.tasks.length,
    }),
    [todoTasks, inProgressTasks, doneTasks, context.tasks]
  );

  // Get tasks count by priority
  const priorityCount = useMemo(
    () => ({
      high: context.tasks.filter((t) => t.priority === 'high').length,
      medium: context.tasks.filter((t) => t.priority === 'medium').length,
      low: context.tasks.filter((t) => t.priority === 'low').length,
    }),
    [context.tasks]
  );

  // Filter tasks by priority
  const getTasksByPriority = (priority: TaskPriority): Task[] => {
    return context.tasks.filter((task) => task.priority === priority);
  };

  // Filter tasks by tag
  const getTasksByTag = (tag: string): Task[] => {
    return context.tasks.filter((task) => task.tags.includes(tag));
  };

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    context.tasks.forEach((task) => {
      task.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [context.tasks]);

  // Search tasks
  const searchTasks = (query: string): Task[] => {
    const lowercaseQuery = query.toLowerCase();
    return context.tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowercaseQuery) ||
        task.description.toLowerCase().includes(lowercaseQuery) ||
        task.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  return {
    ...context,
    todoTasks,
    inProgressTasks,
    doneTasks,
    tasksByPriority,
    tasksByDate,
    tasksCount,
    priorityCount,
    getTasksByPriority,
    getTasksByTag,
    allTags,
    searchTasks,
  };
};