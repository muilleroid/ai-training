import { Elysia } from 'elysia';

import { userService } from '../application';

import { usersDto } from './dto';

export const userController = new Elysia({ name: 'user/controller', prefix: '/users' }).use(userService).get(
  '/',
  ({ userService }) => {
    return userService.find();
  },
  {
    body: usersDto,
  },
);
