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

const router = Router();

router.get('/', getNotes);
router.get('/:id', getNoteById);
router.get('/:id/todos', getTodos);

router.post('/', createNote);
router.post('/:id/todos', addTodo);

router.delete('/:id', deleteNoteById);
router.delete('/:id/todos/:todoId', deleteTodoById);

router.patch('/:id', updateNoteById);
router.patch('/:id/todos/:todoId', toggleTodoById);

export default router;
