import { Types } from 'mongoose';
import { INote, Note } from '../models/notes.model';

export const getNotes = async () => {
  return await Note.aggregate([
    {
      $lookup: {
        from: 'todos',
        as: 'todos',
        localField: '_id',
        foreignField: '_noteId'
      }
    },
    {
      $addFields: {
        numTodos: { $size: '$todos' }
      }
    },
    {
      $project: {
        todos: false
      }
    }
  ]);
};

export const getNoteById = async (noteId: string) => {
  if (!Types.ObjectId.isValid(noteId)) return null;
  return await Note.findOne({ _id: noteId }).lean().exec();
};

export const createNote = async (note: INote) => {
  return await Note.create({ ...note });
};

export const deleteNoteById = async (noteId: string) => {
  if (!Types.ObjectId.isValid(noteId)) return null;
  return await Note.findOneAndDelete({ _id: noteId }).lean().exec();
};

export const updateNoteById = async (noteId: string, noteData: INote) => {
  if (!Types.ObjectId.isValid(noteId)) return null;
  return await Note.findOneAndUpdate({ _id: noteId }, noteData, { new: true }).lean().exec();
};
