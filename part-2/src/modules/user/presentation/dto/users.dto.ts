import { t } from 'elysia';

import { UserDto } from './user.dto';

export const UsersDto = t.Array(UserDto, {
  description: 'Array of user data transfer objects for listing multiple users',
  items: {
    description: 'A user object',
  },
  title: 'Users DTO',
});
