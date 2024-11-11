import { INote, Note } from '../models/notes.model';
import { ITodo, Todo } from '../models/todo.model';
import { IUser } from '../models/user.model';

export type NoteBody = Pick<INote, 'title' | '_authorId'>;
export type TodoBody = Pick<ITodo, 'content'>;

const getAuthorNote = async (noteId: string, author: IUser) => {
  return await Note.findOne({ _id: noteId, _authorId: author._id.toHexString() }).then(async (note) => {
    if (!note) return null;
    return note;
  });
};

export const getTodos = async (noteId: string, author: IUser) => {
  return await getAuthorNote(noteId, author).then(async (note) => {
    if (!note) throw new Error('Cannot find Note ID provided.');
    return await Todo.find({ _noteId: noteId }).lean().exec();
  });
};

export const addTodo = async (noteId: string, todo: TodoBody, author: IUser) => {
  return await getAuthorNote(noteId, author).then(async (note) => {
    if (!note) throw new Error('Cannot find Note ID provided.');
    return await Todo.create({ ...todo, _noteId: noteId });
  });
};

export const toggleTodoById = async (noteId: string, todoId: string, author: IUser) => {
  return await getAuthorNote(noteId, author).then(async (note) => {
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

export const deleteTodoById = async (noteId: string, todoId: string, author: IUser) => {
  return await getAuthorNote(noteId, author).then(async (note) => {
    if (!note) throw new Error('Cannot find Note ID provided.');

    return await Todo.findOneAndDelete({
      _id: todoId,
      _noteId: noteId
    })
      .lean()
      .exec();
  });
};
