import { Mongoose } from 'mongoose';
import { ClassSchema } from './schemas/class.schema';
import { CLASS_PROVIDER_KEY } from './keys';
import { DATABASE_PROVIDER_KEY } from '../../database/keys';

export const classProviders = [
  {
    provide: CLASS_PROVIDER_KEY,
    useFactory: (mongoose: Mongoose) => mongoose.model('Class', ClassSchema),
    inject: [DATABASE_PROVIDER_KEY],
  },
];
