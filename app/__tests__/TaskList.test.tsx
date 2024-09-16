import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskList from '../components/TaskList';

// Mock para useTaskStore
jest.mock('../store/useTaskStore', () => ({
    __esModule: true,
    default: () => ({
        tasks: [
            { id: 1, title: 'Tarea 1', description: 'Descripción 1', status: 'pending' },
            { id: 2, title: 'Tarea 2', description: 'Descripción 2', status: 'completed' },
        ],
        removeTask: jest.fn(),
    }),
}));

describe('TaskList Component', () => {
    it('debería renderizar la lista de tareas', () => {
        render(<TaskList />);

        expect(screen.getByText('Tarea 1')).toBeInTheDocument();
        expect(screen.getByText('Descripción 1')).toBeInTheDocument();
        expect(screen.getByText('Tarea 2')).toBeInTheDocument();
        expect(screen.getByText('Descripción 2')).toBeInTheDocument();
    });

    it('debería abrir el modal de confirmación al hacer clic en "Eliminar"', () => {
        render(<TaskList />);

        const deleteButton = screen.getAllByText('Eliminar')[0];
        fireEvent.click(deleteButton);

        expect(screen.getByText('Confirmar Eliminación')).toBeInTheDocument();
    });

    it('debería cerrar el modal de confirmación al hacer clic en "Cancelar"', () => {
        render(<TaskList />);

        const deleteButton = screen.getAllByText('Eliminar')[0];
        fireEvent.click(deleteButton);

        const cancelButton = screen.getByText('Cancelar');
        fireEvent.click(cancelButton);

        expect(screen.queryByText('Confirmar Eliminación')).not.toBeInTheDocument();
    });
});
