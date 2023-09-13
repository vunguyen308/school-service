import { Schema } from 'mongoose';
import { IStudent } from '../interfaces/student.interface';

export const StudentSchema = new Schema<IStudent>({
  studentCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  birthYear: { type: Number, required: true },
});
