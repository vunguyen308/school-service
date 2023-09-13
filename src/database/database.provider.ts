import * as mongoose from 'mongoose';
import { DATABASE_PROVIDER_KEY } from './keys';

export const databaseProviders = [
  {
    provide: DATABASE_PROVIDER_KEY,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGODB_URL),
  },
];
