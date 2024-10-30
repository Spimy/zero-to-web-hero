import { INote, Note } from '../models/notes.model';
import { ITodo, Todo } from '../models/todo.model';

export type NoteBody = Pick<INote, 'title'>;
export type TodoBody = Pick<ITodo, 'content'>;

const getAuthorNote = async (noteId: string) => {
  return await Note.findOne({ _id: noteId }).then(async (note) => {
    if (!note) return null;
    return note;
  });
};

export const getTodos = async (noteId: string) => {
  return await getAuthorNote(noteId).then(async (note) => {
    if (!note) throw new Error('Cannot find Note ID provided.');
    return await Todo.find({ _noteId: noteId }).lean().exec();
  });
};

export const addTodo = async (noteId: string, todo: TodoBody) => {
  return await getAuthorNote(noteId).then(async (note) => {
    if (!note) throw new Error('Cannot find Note ID provided.');
    return await Todo.create({ ...todo, _noteId: noteId });
  });
};

export const toggleTodoById = async (noteId: string, todoId: string) => {
  return await getAuthorNote(noteId).then(async (note) => {
    if (!note) throw new Error('Cannot find Note ID provided.');

    return await Todo.findOne({ _id: todoId, _noteId: noteId })
      .exec()
      .then(async (todo) => {
        if (!todo) return null;
        todo.complete = !todo.complete;
        return await todo.save();
      });
  });
};

export const deleteTodoById = async (noteId: string, todoId: string) => {
  return await getAuthorNote(noteId).then(async (note) => {
    if (!note) throw new Error('Cannot find Note ID provided.');

    return await Todo.findOneAndDelete({
      _id: todoId,
      _noteId: noteId
    })
      .lean()
      .exec();
  });
};
