import React, { useState } from 'react';
import { TaskProvider } from './context';
import { useTasks } from './hooks';
import { 
  PageLayout, 
  Header, 
  Statistics, 
  ShortcutsHelp,
  FilterSort 
} from './components/Layout';
import { Board } from './components/Board';
import { TaskModal, TaskForm } from './components/Task';
import { Modal } from './components/common';
import { Task, TaskPriority } from './types';

const KanbanApp: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'title'>('date');
 



  // Filter and sort tasks
  const filteredAndSortedTasks = React.useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return sorted;
  }, [tasks, searchQuery, priorityFilter, sortBy]);

  const handleAddTask = () => {
    setIsAddModalOpen(true);
  };

  const handleCreateTask = (taskData: Partial<Task>) => {
    addTask(taskData as any);
    setIsAddModalOpen(false);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleTaskEdit = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleTaskDelete = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  const handleFilterChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setPriorityFilter('all');
    setSortBy('date');
    setSearchQuery('');
  };

  return (
    <PageLayout>
      {/* Header */}
      <Header onAddTask={handleAddTask} onFilterChange={handleFilterChange} />

      {/* Statistics Dashboard */}
      <Statistics />

      {/* Filter and Sort Controls */}
      <FilterSort
        onPriorityFilter={setPriorityFilter}
        onSortChange={setSortBy}
        onClearFilters={handleClearFilters}
        currentPriority={priorityFilter}
        currentSort={sortBy}
      />

      {/* Kanban Board */}
      <div className="animate-fade-in">
        <Board
          tasks={filteredAndSortedTasks}
          onTaskMove={moveTask}
          onTaskClick={handleTaskClick}
          onTaskEdit={handleTaskEdit}
          onTaskDelete={handleTaskDelete}
        />
      </div>

  

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Task"
        size="lg"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Task Detail Modal */}
      <TaskModal
        task={selectedTask}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedTask(null);
        }}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />

      {/* Keyboard Shortcuts Help */}
      <ShortcutsHelp
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Footer */}
      <footer className="text-center mt-12 py-8 border-t border-gray-200">
        <div className="flex items-center justify-center gap-2 text-gray-600 mb-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
          </svg>
          <span className="font-medium">Built with React + TypeScript + Tailwind CSS</span>
        </div>
     
      </footer>
    </PageLayout>
  );
};

const App: React.FC = () => {
  return (
    <TaskProvider>
      <KanbanApp />
    </TaskProvider>
  );
}

export default App;