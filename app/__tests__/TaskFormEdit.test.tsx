// __tests__/TaskFormEdit.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import TaskFormEdit from '../components/TaskFormEdit';
import useTaskStore from '../store/useTaskStore';
import '@testing-library/jest-dom';
import { Task } from '../types/task';

const mockTask: Task = {
    id: 1,
    title: 'Tarea de prueba',
    description: 'Descripción de prueba',
    status: 'pending',
};

test('edita una tarea correctamente', () => {
    const mockSetTaskToEdit = jest.fn();
    render(<TaskFormEdit task={mockTask} setTaskToEdit={mockSetTaskToEdit} />);

    const titleInput = screen.getByLabelText('Título');
    fireEvent.change(titleInput, { target: { value: 'Tarea editada' } });

    const submitButton = screen.getByText('Guardar Cambios');
    fireEvent.click(submitButton);

    const tasks = useTaskStore.getState().tasks;
    expect(tasks[0].title).toBe('Tarea editada');
    expect(mockSetTaskToEdit).toHaveBeenCalledWith(null);
});
