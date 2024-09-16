// store/useTaskStore.ts
'use client';

import { create } from 'zustand';
import { Task } from '../types/task';

interface TaskStore {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (id: number, updatedTask: Task) => void;
    removeTask: (id: number) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
    tasks: [],
    addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
    updateTask: (id, updatedTask) => set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
    })),
    removeTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));

export default useTaskStore;
