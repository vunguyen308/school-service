import { Mongoose } from 'mongoose';
import { ClassSchema } from './schemas/class.schema';

export const classProviders = [
  {
    provide: 'CLASS_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Class', ClassSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
