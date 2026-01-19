import { TaskPriority } from '../types';

export interface PriorityConfig {
  value: TaskPriority;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export const PRIORITIES: PriorityConfig[] = [
  {
    value: 'low',
    label: 'Low',
    color: 'bg-gray-100',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
  },
  {
    value: 'medium',
    label: 'Medium',
    color: 'bg-yellow-100',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
  },
  {
    value: 'high',
    label: 'High',
    color: 'bg-red-100',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
];

export const getPriorityConfig = (priority: TaskPriority): PriorityConfig => {
  return PRIORITIES.find((p) => p.value === priority) || PRIORITIES[0];
};

export const PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};