import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '../../types';

import { COLUMN_BG_COLORS, COLUMN_COLORS } from '../../constants';
import { SortableTaskCard } from './sortableTaskCard';

interface ColumnProps {
  id: TaskStatus;
  title: string;
  icon: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskEdit: (e: React.MouseEvent, task: Task) => void;
  onTaskDelete: (e: React.MouseEvent, taskId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({
  id,
  title,
  icon,
  tasks,
  onTaskClick,
  onTaskEdit,
  onTaskDelete,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const taskIds = tasks.map(task => task.id);

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className={`
        ${COLUMN_BG_COLORS[id]} 
        border-2 ${COLUMN_COLORS[id]} 
        rounded-t-xl p-4 flex items-center justify-between
      `}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          <h2 className="font-bold text-gray-800 text-lg">{title}</h2>
          <span className="bg-white px-2.5 py-0.5 rounded-full text-sm font-semibold text-gray-700">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Droppable Area */}
      <div
        ref={setNodeRef}
        className={`
          flex-1 p-4 space-y-3 rounded-b-xl border-2 border-t-0 
          ${COLUMN_COLORS[id]} 
          ${COLUMN_BG_COLORS[id]}
          min-h-[500px]
          transition-all duration-200
          ${isOver ? 'bg-opacity-50 ring-2 ring-blue-400 ring-opacity-50' : ''}
        `}
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <svg className="w-16 h-16 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-sm font-medium">No tasks</p>
              <p className="text-xs mt-1">Drag tasks here</p>
            </div>
          ) : (
            tasks.map((task) => (
              <SortableTaskCard
                key={task.id}
                task={task}
                onClick={() => onTaskClick(task)}
                onEdit={(e) => onTaskEdit(e, task)}
                onDelete={(e) => onTaskDelete(e, task.id)}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
};