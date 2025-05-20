import { t } from 'elysia';

import { userDto } from './user.dto';

export const usersDto = t.Array(userDto);

export type UsersDto = typeof usersDto.static;
