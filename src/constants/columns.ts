import { Column } from '../types';

export const COLUMNS: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: 'bg-slate-100',
    icon: '📋',
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    color: 'bg-blue-100',
    icon: '🚀',
  },
  {
    id: 'done',
    title: 'Done',
    color: 'bg-green-100',
    icon: '✅',
  },
];

export const COLUMN_COLORS: Record<string, string> = {
  todo: 'border-slate-300',
  inprogress: 'border-blue-300',
  done: 'border-green-300',
};

export const COLUMN_BG_COLORS: Record<string, string> = {
  todo: 'bg-slate-50',
  inprogress: 'bg-blue-50',
  done: 'bg-green-50',
};