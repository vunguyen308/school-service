import { Document } from 'mongoose';

export interface IStudent extends Document {
  readonly studentCode: string;
  readonly name: string;
  readonly birthYear: number;
}
