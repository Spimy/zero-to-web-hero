import { Document, HydratedDocument, model, Schema, Types } from 'mongoose';
import { Todo } from './todo.model';

export interface INote extends Document<Types.ObjectId> {
  title: string;
}

const noteSchema = new Schema<INote>({
  title: { type: String, trim: true, minlength: 1, required: true }
});

// Cascade style delete, i.e., delete all todos that is owned by the deleted note
noteSchema.post<HydratedDocument<INote>>('findOneAndDelete', async function (_, next) {
  await Todo.deleteMany({ _noteId: this._id });
  next();
});

export const Note = model<INote>('notes', noteSchema);
