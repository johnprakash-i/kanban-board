import React from 'react';
import { TaskPriority } from '../../types';
import { Select, Button } from '../common';

interface FilterSortProps {
  onPriorityFilter: (priority: TaskPriority | 'all') => void;
  onSortChange: (sort: 'date' | 'priority' | 'title') => void;
  onClearFilters: () => void;
  currentPriority: TaskPriority | 'all';
  currentSort: 'date' | 'priority' | 'title';
}

export const FilterSort: React.FC<FilterSortProps> = ({
  onPriorityFilter,
  onSortChange,
  onClearFilters,
  currentPriority,
  currentSort,
}) => {
  const hasActiveFilters = currentPriority !== 'all' || currentSort !== 'date';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <Select
          options={[
            { value: 'all', label: 'All Priorities' },
            { value: 'high', label: 'High Priority' },
            { value: 'medium', label: 'Medium Priority' },
            { value: 'low', label: 'Low Priority' },
          ]}
          value={currentPriority}
          onChange={(e) => onPriorityFilter(e.target.value as TaskPriority | 'all')}
          className="w-48"
        />

        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
        </div>

        <Select
          options={[
            { value: 'date', label: 'Date Created' },
            { value: 'priority', label: 'Priority' },
            { value: 'title', label: 'Title (A-Z)' },
          ]}
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as 'date' | 'priority' | 'title')}
          className="w-48"
        />

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            icon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};