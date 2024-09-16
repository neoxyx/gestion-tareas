// __tests__/TaskForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import useTaskStore from '../store/useTaskStore';
import '@testing-library/jest-dom';

test('muestra mensaje de error si los campos están vacíos', () => {
    render(<TaskForm />);

    const submitButton = screen.getByText('Crear Tarea');
    fireEvent.click(submitButton);

    expect(screen.getByText('El título y la descripción son obligatorios.')).toBeInTheDocument();
});

test('añade una nueva tarea correctamente', () => {
    render(<TaskForm />);

    const titleInput = screen.getByLabelText('Título');
    const descriptionInput = screen.getByLabelText('Descripción');
    const submitButton = screen.getByText('Crear Tarea');

    fireEvent.change(titleInput, { target: { value: 'Nueva Tarea' } });
    fireEvent.change(descriptionInput, { target: { value: 'Descripción de la nueva tarea' } });
    fireEvent.click(submitButton);

    const tasks = useTaskStore.getState().tasks;
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Nueva Tarea');
    expect(tasks[0].description).toBe('Descripción de la nueva tarea');
});
