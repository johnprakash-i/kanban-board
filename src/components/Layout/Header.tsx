import React, { useState } from 'react';
import { useTasks } from '../../hooks';
import { Button } from '../common';

interface HeaderProps {
  onAddTask: () => void;
  onFilterChange?: (filter: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddTask, onFilterChange }) => {
  const { tasksCount, priorityCount } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onFilterChange?.(e.target.value);
  };

  return (
    <header className="mb-8 animate-fade-in">
      {/* Title Section */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Kanban Board
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your tasks efficiently with drag and drop
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={onAddTask}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* Stats and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Stats Cards */}
        <div className="flex flex-wrap gap-3">
          {/* Total Tasks */}
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Total:</span>
            <span className="font-bold text-gray-900">{tasksCount.total}</span>
          </div>

          {/* To Do */}
          <div className="bg-slate-50 rounded-lg px-4 py-2 shadow-sm border border-slate-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-500"></div>
            <span className="text-sm text-gray-600">To Do:</span>
            <span className="font-bold text-slate-700">{tasksCount.todo}</span>
          </div>

          {/* In Progress */}
          <div className="bg-blue-50 rounded-lg px-4 py-2 shadow-sm border border-blue-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">In Progress:</span>
            <span className="font-bold text-blue-700">{tasksCount.inprogress}</span>
          </div>

          {/* Done */}
          <div className="bg-green-50 rounded-lg px-4 py-2 shadow-sm border border-green-200 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Done:</span>
            <span className="font-bold text-green-700">{tasksCount.done}</span>
          </div>

          {/* High Priority Count */}
          {priorityCount.high > 0 && (
            <div className="bg-red-50 rounded-lg px-4 py-2 shadow-sm border border-red-200 flex items-center gap-2">
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">High Priority:</span>
              <span className="font-bold text-red-700">{priorityCount.high}</span>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-auto lg:min-w-[300px]">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};