// app/page.tsx
'use client';

import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import TaskList from './components/TaskList';
import { Task } from './types/task';
import useTaskStore from './store/useTaskStore';

async function fetchTasksFromAPI(): Promise<Task[]> {
  // Simula la obtención de tareas desde una API
  return [];
}

const Home: React.FC = () => {
  const { addTask } = useTaskStore();

  React.useEffect(() => {
    const loadTasks = async () => {
      const initialTasks = await fetchTasksFromAPI();
      initialTasks.forEach(addTask);
    };

    loadTasks();
  }, [addTask]);

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';" />
        <title>Gestión de Tareas</title>
        <meta name="description" content="Aplicación de gestión de tareas con Next.js y Zustand" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="no-referrer" />
      </Helmet>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Gestión de Tareas</h1>        
        <TaskList />
      </div>
    </HelmetProvider>
  );
};

export default Home;
