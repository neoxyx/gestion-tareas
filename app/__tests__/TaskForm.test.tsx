// app/__tests__/TaskForm.test.tsx
import React from 'react'; // Importa React
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import useTaskStore from '../store/useTaskStore';

// Mock del store de Zustand
jest.mock('../store/useTaskStore');

describe('TaskForm', () => {
    const addTaskMock = jest.fn();
    const onCloseMock = jest.fn();

    beforeEach(() => {
        // Mockea el hook para que devuelva la función mock de addTask
        (useTaskStore as unknown as jest.Mock).mockReturnValue({
            addTask: addTaskMock,
        });
    });

    it('should call addTask with correct data when form is submitted', () => {
        // Renderiza el formulario
        render(<TaskForm isOpen={true} onClose={onCloseMock} />);

        // Llena el formulario
        fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Nueva Tarea' } });
        fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Descripción de la tarea' } });
        fireEvent.change(screen.getByLabelText(/Estado/i), { target: { value: 'completed' } });

        // Envía el formulario
        fireEvent.click(screen.getByText(/Crear Tarea/i));

        // Verifica que addTask fue llamado con los datos correctos
        expect(addTaskMock).toHaveBeenCalledWith({
            id: expect.any(Number), // Verifica que se use un ID numérico
            title: 'Nueva Tarea',
            description: 'Descripción de la tarea',
            status: 'completed',
        });
    });
});
