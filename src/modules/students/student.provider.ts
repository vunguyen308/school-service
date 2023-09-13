import { Mongoose } from 'mongoose';
import { StudentSchema } from './schemas/student.schema';
import { STUDENT_PROVIDER_KEY } from './keys';
import { DATABASE_PROVIDER_KEY } from '../../database/keys';

export const classProviders = [
  {
    provide: STUDENT_PROVIDER_KEY,
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Student', StudentSchema),
    inject: [DATABASE_PROVIDER_KEY],
  },
];
