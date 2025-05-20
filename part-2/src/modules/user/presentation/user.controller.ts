import { Elysia } from 'elysia';

import { errorDto } from 'core/dto';

import { userService } from '../application';

import { userDto, usersDto } from './dto';
import { userIdParams } from './params';
import { partialUserInput, userInput } from './input';

export const userController = new Elysia({ name: 'user/controller', prefix: '/users' })
  .use(userService)
  .model({
    errorDto,
    userDto,
    usersDto,
  })
  .get(
    '/',
    ({ userService }) => {
      return userService.find();
    },
    {
      response: usersDto,
      detail: {
        tags: ['Users'],
        summary: 'Get all users',
        responses: {
          '200': {
            description: 'Successfully retrieved users',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/usersDto',
                },
              },
            },
          },
        },
      },
    },
  )
  .get(
    '/:userId',
    async ({ params: { userId }, status, userService }) => {
      const user = await userService.findById({ userId });

      if (!user) {
        return status(404, { message: 'User not found' });
      }

      return user;
    },
    {
      params: userIdParams,
      response: {
        200: userDto,
        404: errorDto,
      },
      detail: {
        tags: ['Users'],
        summary: 'Get user by ID',
        responses: {
          '200': {
            description: 'Successfully retrieved user',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/userDto',
                },
              },
            },
          },
          '404': {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
        },
      },
    },
  )
  .post(
    '/',
    async ({ body, status, userService }) => {
      const user = await userService.create({ user: body });

      if (!user) {
        return status(422, { message: 'User cannot be created' });
      }

      return status(201, user);
    },
    {
      body: userInput,
      response: {
        201: userDto,
        422: errorDto,
      },
      detail: {
        tags: ['Users'],
        summary: 'Create new user',
        responses: {
          '201': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/userDto',
                },
              },
            },
          },
          '422': {
            description: 'User cannot be created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
        },
      },
    },
  )
  .put(
    '/:userId',
    async ({ body, params: { userId }, status, userService }) => {
      const user = await userService.update({
        user: body,
        userId,
      });

      if (!user) {
        return status(404, { message: 'User not found' });
      }

      return user;
    },
    {
      params: userIdParams,
      body: userInput,
      response: {
        200: userDto,
        404: errorDto,
      },
      detail: {
        tags: ['Users'],
        summary: 'Update user',
        responses: {
          '200': {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/userDto',
                },
              },
            },
          },
          '404': {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
        },
      },
    },
  )
  .patch(
    '/:userId',
    async ({ body, params: { userId }, status, userService }) => {
      const user = await userService.update({
        user: body,
        userId,
      });

      if (!user) {
        return status(404, { message: 'User not found' });
      }

      return user;
    },
    {
      params: userIdParams,
      body: partialUserInput,
      response: {
        200: userDto,
        404: errorDto,
      },
      detail: {
        tags: ['Users'],
        summary: 'Partially update user',
        responses: {
          '200': {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/userDto',
                },
              },
            },
          },
          '404': {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
        },
      },
    },
  )
  .delete(
    '/:userId',
    async ({ params: { userId }, status, userService }) => {
      const user = await userService.delete({ userId });

      if (!user) {
        return status(404, { message: 'User not found' });
      }

      return user;
    },
    {
      params: userIdParams,
      response: {
        200: userDto,
        404: errorDto,
      },
      detail: {
        tags: ['Users'],
        summary: 'Delete user',
        responses: {
          '200': {
            description: 'User deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/userDto',
                },
              },
            },
          },
          '404': {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
        },
      },
    },
  );
