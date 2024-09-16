'use client';

import React, { useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import { Task } from '../types/task';
import TaskForm from './TaskForm';
import TaskFormEdit from './TaskFormEdit';
import ReactPaginate from 'react-paginate';

const TasksPerPage = 5; // Número de tareas por página

const TaskList: React.FC = () => {
  const { tasks, removeTask } = useTaskStore();
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null); // Estado para almacenar la tarea a editar
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null); // Estado para controlar la tarea a eliminar
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para manejar el cambio de página
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  // Calcula las tareas a mostrar en la página actual
  const indexOfLastTask = (currentPage + 1) * TasksPerPage;
  const indexOfFirstTask = indexOfLastTask - TasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Manejador para eliminar la tarea después de confirmar
  const handleConfirmDelete = () => {
    if (taskToDelete !== null) {
      removeTask(taskToDelete);
      setTaskToDelete(null); // Cierra el modal
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Lista de Tareas</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Nueva Tarea
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentTasks.map((task) => (
              <tr key={task.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                  <span className={`inline-block px-2 py-1 rounded-lg text-white ${task.status === 'completed' ? 'bg-green-500' : task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                    {task.status === 'completed' ? 'Completada' : task.status === 'in-progress' ? 'En progreso' : 'Pendiente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setTaskToEdit(task)} // Seleccionamos la tarea a editar
                    className="mr-2 text-blue-500 hover:text-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => setTaskToDelete(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <ReactPaginate
          previousLabel={'Anterior'}
          nextLabel={'Siguiente'}
          breakLabel={'...'}
          pageCount={Math.ceil(tasks.length / TasksPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>

      {/* Modal de confirmación */}
      {taskToDelete !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
            <p className="mb-4">¿Estás seguro de que deseas eliminar esta tarea?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setTaskToDelete(null)} // Cerrar el modal sin eliminar
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete} // Confirmar y eliminar
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de formulario */}
      <TaskForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Modal de formulario de edición */}
      {taskToEdit && <TaskFormEdit task={taskToEdit} setTaskToEdit={setTaskToEdit} />}
    </div>
  );
};

export default TaskList;
