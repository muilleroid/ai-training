import { t } from 'elysia';

import { userDto } from './user.dto';

export const usersDto = t.Array(userDto, {
  description: 'Array of user data transfer objects for listing multiple users',
  items: {
    description: 'A user object',
  },
  title: 'Users DTO',
});

export type UsersDto = typeof usersDto.static;
