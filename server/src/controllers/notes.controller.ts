import { Request, Response } from 'express';
import { INote } from '../models/notes.model';
import { ITodo } from '../models/todo.model';
import * as NotesService from '../services/notes.service';
import * as TodoService from '../services/todo.service';

export type NotesParams = {
  id: string;
  todoId?: string;
};

export const getNotes = async (_: Request, response: Response) => {
  const notes = await NotesService.getNotes();
  return response.status(200).json(notes);
};

export const getNoteById = async (request: Request<NotesParams>, response: Response) => {
  const note = await NotesService.getNoteById(request.params.id);
  if (!note) return response.status(404).json({ message: 'Note not found' });
  return response.status(200).json(note);
};

export const createNote = async (request: Request<{}, {}, INote>, response: Response) => {
  const note = await NotesService.createNote(request.body);
  return response.status(201).json(note);
};

export const deleteNoteById = async (request: Request<NotesParams>, response: Response) => {
  const deletedNote = await NotesService.deleteNoteById(request.params.id);
  if (!deletedNote) return response.status(404).json({ message: 'Note not found' });
  return response.status(204).send();
};

export const updateNoteById = async (request: Request<NotesParams, {}, INote>, response: Response) => {
  if (!request.body.title) return response.status(400).json({ message: 'Title is required' });

  const updatedNote = await NotesService.updateNoteById(request.params.id, request.body);
  if (!updatedNote) return response.status(404).json({ message: 'Note not found' });

  return response.status(200).json(updatedNote);
};

export const getTodos = async (request: Request<NotesParams>, response: Response) => {
  return await TodoService.getTodos(request.params.id)
    .then((todos) => response.status(200).json(todos))
    .catch((error) => response.status(404).json({ message: error.message }));
};

export const addTodo = async (request: Request<NotesParams, {}, ITodo>, response: Response) => {
  if (!request.body.content) return response.status(400).json({ message: 'Content is required' });

  return await TodoService.addTodo(request.params.id, request.body)
    .then((todo) => response.status(200).json(todo))
    .catch((error) => response.status(404).json({ message: error.message }));
};

export const toggleTodoById = async (request: Request<NotesParams>, response: Response) => {
  return await TodoService.toggleTodoById(request.params.id, request.params.todoId)
    .then((todo) => {
      if (!todo) return response.status(404).json({ message: 'Todo not found' });
      return response.status(200).json(todo);
    })
    .catch((error) => response.status(404).json({ message: error.message }));
};

export const deleteTodoById = async (request: Request<NotesParams>, response: Response) => {
  return await TodoService.deleteTodoById(request.params.id, request.params.todoId)
    .then((deletedTodo) => {
      if (!deletedTodo) return response.status(404).json({ message: 'Todo not found' });
      return response.status(204).send();
    })
    .catch((error) => response.status(404).json({ message: error.message }));
};
