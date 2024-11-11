import { Router } from 'express';
import {
  addTodo,
  createNote,
  deleteNoteById,
  deleteTodoById,
  getNoteById,
  getNotes,
  getTodos,
  toggleTodoById,
  updateNoteById
} from '../controllers/notes.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, getNotes);
router.get('/:id', authenticate, getNoteById);
router.get('/:id/todos', authenticate, getTodos);

router.post('/', authenticate, createNote);
router.post('/:id/todos', authenticate, addTodo);

router.delete('/:id', authenticate, deleteNoteById);
router.delete('/:id/todos/:todoId', authenticate, deleteTodoById);

router.patch('/:id', authenticate, updateNoteById);
router.patch('/:id/todos/:todoId', authenticate, toggleTodoById);

export default router;
