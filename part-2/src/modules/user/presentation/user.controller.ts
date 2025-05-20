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
    detail: {
      tags: ['Users'],
      summary: 'Get all users',
      description: 'Retrieve a list of all users in the system',
      responses: {
        '200': {
          description: 'Successfully retrieved users',
        },
      },
    },
  },
);
