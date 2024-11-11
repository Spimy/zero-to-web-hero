import { Types } from 'mongoose';
import { INote, Note } from '../models/notes.model';
import { IUser } from '../models/user.model';

export const getNotes = async (userId: string) => {
  return await Note.aggregate([
    {
      $match: { _authorId: new Types.ObjectId(userId) }
    },
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

export const getNoteById = async (noteId: string, author: IUser) => {
  if (!Types.ObjectId.isValid(noteId)) return null;
  return await Note.findOne({ _id: noteId, _authorId: author._id.toHexString() }).lean().exec();
};

export const createNote = async (note: INote, author: IUser) => {
  return await Note.create({ ...note, _authorId: author._id.toHexString() });
};

export const deleteNoteById = async (noteId: string, author: IUser) => {
  if (!Types.ObjectId.isValid(noteId)) return null;
  return await Note.findOneAndDelete({ _id: noteId, _authorId: author._id.toHexString() }).lean().exec();
};

export const updateNoteById = async (noteId: string, noteData: INote, author: IUser) => {
  if (!Types.ObjectId.isValid(noteId)) return null;
  return await Note.findOneAndUpdate(
    {
      _id: noteId,
      _authorId: author._id.toHexString()
    },
    noteData,
    { new: true }
  )
    .lean()
    .exec();
};
