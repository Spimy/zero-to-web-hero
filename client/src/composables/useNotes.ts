import { ref } from 'vue';
import { useAuth } from './useAuth';

interface Note {
  _id: string;
  title: string;
  _authorId: string;
  numTodos: number;
}

interface Todo {
  _id: string;
  content: string;
  complete: boolean;
  _noteId: string;
}

const notes = ref<Note[]>([]);
const todos = ref<Todo[]>([]);
const API_URL = import.meta.env.VITE_API_URL + '/notes';

export function useNotes() {
  const { axiosInstance } = useAuth();

  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}`);
      notes.value = response.data;
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  const fetchTodos = async (noteId: string) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/${noteId}/todos`);
      todos.value = response.data;
    } catch (err) {
      console.error('Error fetching todos:', err);
    }
  };

  const createNote = async (title: string) => {
    try {
      const response = await axiosInstance.post(`${API_URL}`, { title });
      notes.value.push(response.data);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const createTodo = async (noteId: string, content: string) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/${noteId}/todos`, { content });
      notes.value.push(response.data);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      await axiosInstance.delete(`${API_URL}/${noteId}`);
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const deleteTodo = async (noteId: string, todoId: string) => {
    try {
      await axiosInstance.delete(`${API_URL}/${noteId}/todos/${todoId}`);
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return {
    notes,
    todos,
    createNote,
    createTodo,
    fetchNotes,
    fetchTodos,
    deleteNote,
    deleteTodo
  };
}
