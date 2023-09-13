import { Schema } from 'mongoose';
import { IClass } from '../interfaces/class.interface';

export const ClassSchema = new Schema<IClass>({
  name: { type: String, required: true },
  maxStudent: { type: Number, required: true },
});
