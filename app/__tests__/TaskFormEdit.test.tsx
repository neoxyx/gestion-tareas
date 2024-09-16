import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TaskFormEdit from '../components/TaskFormEdit';
import useTaskStore from '../store/useTaskStore';
import { Task } from '../types/task';

// Mock de la tienda de tareas
jest.mock('../store/useTaskStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    updateTask: jest.fn(),
  })),
}));

describe('TaskFormEdit', () => {
  const setTaskToEditMock = jest.fn();
  const initialTask: Task = {
    id: 1,
    title: 'Tarea Inicial',
    description: 'Descripción Inicial',
    status: 'pending',
  };

  it('should call updateTask with correct data when form is submitted', () => {
    // Configura el mock de updateTask
    const updateTaskMock = jest.fn();
    (useTaskStore as unknown as jest.Mock).mockReturnValue({ updateTask: updateTaskMock });
    
    // Renderiza el componente TaskFormEdit con la tarea inicial
    render(<TaskFormEdit task={initialTask} setTaskToEdit={setTaskToEditMock} />);

    // Llena el formulario con datos actualizados
    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Tarea Actualizada' } });
    fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Descripción Actualizada' } });
    fireEvent.change(screen.getByLabelText(/Estado/i), { target: { value: 'completed' } });

    // Envía el formulario
    fireEvent.click(screen.getByText(/Guardar Cambios/i));

    // Verifica que updateTask haya sido llamado con los datos correctos
    expect(useTaskStore().updateTask).toHaveBeenCalledWith(1, {
      id: 1,
      title: 'Tarea Actualizada',
      description: 'Descripción Actualizada',
      status: 'completed',
    });

    // Verifica que el formulario se cierra después de enviar
    expect(setTaskToEditMock).toHaveBeenCalledWith(null);
  });
});
