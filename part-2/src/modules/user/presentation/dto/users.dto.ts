import { t } from 'elysia';

import { userDto } from './user.dto';

export const usersDto = t.Array(userDto, {
  title: 'Users DTO',
  description: 'Array of user data transfer objects for listing multiple users',
  minItems: 0,
  items: {
    $ref: '#/components/schemas/userDto',
  },
});

export type UsersDto = typeof usersDto.static;
