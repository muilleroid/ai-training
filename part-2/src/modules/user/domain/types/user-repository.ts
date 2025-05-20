import type { User } from './user';

export type UserRepository = {
  find: () => Promise<User[]>;
};
