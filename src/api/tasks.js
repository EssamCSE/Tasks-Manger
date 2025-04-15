import api from './config';

export const taskService = {
  getAllTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  getTaskById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  getTasksByCategory: async (category) => {
    const response = await api.get(`/tasks?category=${category}`);
    return response.data;
  },

  getTasksByStatus: async (status) => {
    const response = await api.get(`/tasks?status=${status}`);
    return response.data;
  }
};