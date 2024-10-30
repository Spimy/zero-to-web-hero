import { Document, model, Schema, Types } from 'mongoose';

export interface ITodo extends Document<Types.ObjectId> {
  content: string;
  complete?: boolean;
  _noteId: Types.ObjectId;
}

const todoSchema = new Schema<ITodo>({
  content: { type: String, trim: true, minlength: 1, required: true },
  complete: { type: Boolean, default: false, required: true },
  _noteId: { type: Schema.ObjectId, required: true, ref: 'notes' }
});

export const Todo = model<ITodo>('todos', todoSchema);
