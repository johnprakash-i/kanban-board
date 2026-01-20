# 📋 Kanban Task Board

A modern, feature-rich Kanban board application built with React, TypeScript, and Tailwind CSS. Manage your tasks efficiently with drag-and-drop functionality and persistent storage.

![Kanban Board](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### Core Functionality
- 🎯 **Drag & Drop** - Intuitive task movement between columns
- ✏️ **CRUD Operations** - Create, read, update, and delete tasks
- 💾 **LocalStorage Persistence** - Tasks saved automatically
- 🔍 **Real-time Search** - Instant task filtering
- 🎨 **Priority Levels** - High, Medium, Low with color coding
- 🏷️ **Tags & Categories** - Organize tasks with custom tags
- 📅 **Due Dates** - Set deadlines with overdue warnings

### Advanced Features
- ⌨️ **Keyboard Shortcuts** - Quick actions (Ctrl+N, Ctrl+K, ?)
- 📊 **Statistics Dashboard** - Track completion rates and progress
- 🔽 **Filter & Sort** - Filter by priority, sort by date/priority/title
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- 🎭 **Smooth Animations** - Beautiful transitions and effects
- 🌓 **Empty States** - Helpful placeholders for empty columns

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS v4** - Utility-first styling

### Libraries
- **@dnd-kit** - Drag and drop functionality
  - `@dnd-kit/core` - Core drag and drop
  - `@dnd-kit/sortable` - Sortable lists
  - `@dnd-kit/utilities` - Helper utilities

### State Management
- **React Context API** - Global state management
- **Custom Hooks** - Reusable logic (useTasks, useLocalStorage, useKeyboardShortcuts)

### Storage
- **LocalStorage** - Client-side data persistence

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

