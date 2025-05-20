import type { User } from 'modules/user/domain/types';

import type { UserSchema } from '../schemas';

export const toUser = (user: UserSchema): User => {
  return {
    id: user.id,
  };
};

export const toUserList = (users: UserSchema[]): User[] => {
  return users.map(toUser);
};
