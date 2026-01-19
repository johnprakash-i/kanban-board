import React from 'react';
import { Task } from '../../types';
import { Badge } from '../common';
import { formatDate, isOverdue, getDaysUntilDue } from '../../utils';
import { getPriorityConfig } from '../../constants';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  isDragging?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onClick,
  onEdit,
  onDelete,
  isDragging = false,
}) => {
  const priorityConfig = getPriorityConfig(task.priority);
  const daysUntilDue = getDaysUntilDue(task.dueDate);
  const overdue = isOverdue(task.dueDate);

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-lg p-4 shadow-sm border border-gray-200
        hover:shadow-md hover:border-gray-300 
        transition-all duration-200 cursor-pointer
        ${isDragging ? 'opacity-50 rotate-2 scale-105' : 'opacity-100'}
        group
      `}
    >
      {/* Header: Priority Badge and Actions */}
      <div className="flex items-start justify-between mb-3">
        <Badge variant="priority" priority={task.priority}>
          {priorityConfig.label}
        </Badge>

        {/* Action Buttons */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1.5 hover:bg-blue-50 rounded text-blue-600 transition-colors"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 hover:bg-red-50 rounded text-red-600 transition-colors"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Task Title */}
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {task.title}
      </h3>

      {/* Task Description */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {task.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="tag" className="text-xs">
              {tag}
            </Badge>
          ))}
          {task.tags.length > 3 && (
            <Badge variant="default" className="text-xs">
              +{task.tags.length - 3}
            </Badge>
          )}
        </div>
      )}

      {/* Footer: Due Date */}
      {task.dueDate && (
        <div className="flex items-center gap-1.5 text-xs">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className={`font-medium ${
            overdue 
              ? 'text-red-600' 
              : daysUntilDue !== null && daysUntilDue <= 3 
                ? 'text-orange-600' 
                : 'text-gray-600'
          }`}>
            {overdue ? 'Overdue' : formatDate(task.dueDate)}
            {daysUntilDue !== null && !overdue && daysUntilDue <= 7 && (
              <span className="ml-1">({daysUntilDue}d left)</span>
            )}
          </span>
        </div>
      )}
    </div>
  );
};