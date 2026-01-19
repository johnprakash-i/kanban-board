import React from 'react';
import { TaskPriority } from '../../types';
import { PRIORITY_COLORS } from '../../constants';

export type BadgeVariant = 'priority' | 'tag' | 'status' | 'default';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  priority?: TaskPriority;
  color?: string;
  onRemove?: () => void;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  priority: '',
  tag: 'bg-indigo-100 text-indigo-700',
  status: 'bg-blue-100 text-blue-700',
  default: 'bg-gray-100 text-gray-700',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  priority,
  color,
  onRemove,
  className = '',
}) => {
  let badgeStyles = variantStyles[variant];

  // If it's a priority badge, use priority-specific colors
  if (variant === 'priority' && priority) {
    badgeStyles = PRIORITY_COLORS[priority];
  }

  // If custom color is provided
  if (color) {
    badgeStyles = color;
  }

  const baseStyles = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all';

  return (
    <span className={`${baseStyles} ${badgeStyles} ${className}`}>
      {children}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}
    </span>
  );
};