import { t } from 'elysia';

export const userDto = t.Object({
  id: t.String({ format: 'uuid' }),
});

export type UserDto = typeof userDto.static;
