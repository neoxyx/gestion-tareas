// __tests__/TaskList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';
import useTaskStore from '../store/useTaskStore';
import { Task } from '../types/task';
import '@testing-library/jest-dom';

const mockTasks: Task[] = [
    { id: 1, title: 'Tarea 1', description: 'Descripción 1', status: 'pending' },
    { id: 2, title: 'Tarea 2', description: 'Descripción 2', status: 'completed' },
];

beforeEach(() => {
    const store = useTaskStore.getState();
    store.tasks = mockTasks; // Preparamos el estado inicial con tareas de prueba
});

test('elimina una tarea correctamente', () => {
    render(<TaskList />);

    // Verificamos que ambas tareas están en el documento
    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();

    const deleteButton = screen.getAllByText('Eliminar')[0];
    fireEvent.click(deleteButton); // Eliminamos la primera tarea

    // Solo debe quedar una tarea
    expect(screen.queryByText('Tarea 1')).not.toBeInTheDocument();
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
});

test('renderiza tareas correctamente', () => {
    const tasks: Task[] = [
        { id: 1, title: 'Tarea 1', description: 'Descripción 1', status: 'pending' },
        { id: 2, title: 'Tarea 2', description: 'Descripción 2', status: 'completed' },
    ];

    useTaskStore.setState({ tasks });

    render(<TaskList />);

    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    expect(screen.getByText('Descripción 1')).toBeInTheDocument();
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
    expect(screen.getByText('Descripción 2')).toBeInTheDocument();
});
