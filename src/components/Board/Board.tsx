import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  closestCenter,
} from '@dnd-kit/core';
import { Task, TaskStatus } from '../../types';
import { Column } from './Column';
import { TaskCard } from '../Task';
import { COLUMNS } from '../../constants';

interface BoardProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: TaskStatus) => void;
  onTaskClick: (task: Task) => void;
  onTaskEdit: (e: React.MouseEvent, task: Task) => void;
  onTaskDelete: (e: React.MouseEvent, taskId: string) => void;
}

export const Board: React.FC<BoardProps> = ({
  tasks,
  onTaskMove,
  onTaskClick,
  onTaskEdit,
  onTaskDelete,
}) => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the active task
    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // Check if we're hovering over a column (not a task)
    const isOverColumn = COLUMNS.some((col) => col.id === overId);
    
    if (isOverColumn) {
      const newStatus = overId as TaskStatus;
      if (activeTask.status !== newStatus) {
        onTaskMove(activeId, newStatus);
      }
      return;
    }

    // Check if we're hovering over a task
    const overTask = tasks.find((t) => t.id === overId);
    
    if (overTask) {
      // If hovering over a task in a different column, move to that column
      if (activeTask.status !== overTask.status) {
        onTaskMove(activeId, overTask.status);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // Check if dropped on a column
    const isOverColumn = COLUMNS.some((col) => col.id === overId);
    
    if (isOverColumn) {
      const newStatus = overId as TaskStatus;
      if (activeTask.status !== newStatus) {
        onTaskMove(activeId, newStatus);
      }
      return;
    }

    // Check if dropped on a task
    const overTask = tasks.find((t) => t.id === overId);
    
    if (overTask && activeTask.status !== overTask.status) {
      onTaskMove(activeId, overTask.status);
    }
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            icon={column.icon}
            tasks={getTasksByStatus(column.id)}
            onTaskClick={onTaskClick}
            onTaskEdit={onTaskEdit}
            onTaskDelete={onTaskDelete}
          />
        ))}
      </div>

      {/* Drag Overlay */}
      <DragOverlay dropAnimation={{
        duration: 200,
        easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
      }}>
        {activeTask ? (
          <div className="rotate-3 scale-105 cursor-grabbing">
            <TaskCard
              task={activeTask}
              onClick={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
              isDragging={true}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};