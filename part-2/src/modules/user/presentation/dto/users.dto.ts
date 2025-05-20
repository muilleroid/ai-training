import { t } from 'elysia';

import { userDto } from './user.dto';

export const usersDto = t.Array(userDto, {
  title: 'Users DTO',
});

export type UsersDto = typeof usersDto.static;
