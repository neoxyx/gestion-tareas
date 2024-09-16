// components/TaskFormEdit.tsx
'use client';

import React, { useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import { Task } from '../types/task';
import { sanitizeInput } from '../utils/sanitize';

interface TaskFormEditProps {
    task: Task;
    setTaskToEdit: (task: Task | null) => void;
}

const TaskFormEdit: React.FC<TaskFormEditProps> = ({ task, setTaskToEdit }) => {
    const { updateTask } = useTaskStore();
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const sanitizedTitle = sanitizeInput(title);
        const sanitizedDescription = sanitizeInput(description);

        if (!title || !description) {
            setError('El título y la descripción son obligatorios.');
            return;
        }

        const updatedTask: Task = {
            ...task,
            title: sanitizedTitle,
            description: sanitizedDescription,
            status,
        };

        updateTask(task.id, updatedTask);
        setTaskToEdit(null); // Cerramos el formulario de edición
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <h2 className="text-xl font-bold mb-4">Editar Tarea</h2>
                <button
                    onClick={() => setTaskToEdit(null)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>
                <form onSubmit={handleSubmit}>
                    {error && <p className="text-red-500">{error}</p>}

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Estado</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as 'pending' | 'in-progress' | 'completed')}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="pending">Pendiente</option>
                            <option value="in-progress">En progreso</option>
                            <option value="completed">Completada</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        onClick={() => setTaskToEdit(null)}
                        type="button"
                        className="mt-2 w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskFormEdit;
