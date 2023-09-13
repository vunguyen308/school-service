import { Document } from 'mongoose';

export interface IClass extends Document {
  readonly name: string;
  readonly maxStudent: number;
}
