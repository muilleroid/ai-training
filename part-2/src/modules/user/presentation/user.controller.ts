import { Elysia } from 'elysia';

import { errorDto } from 'core/dto';
import { authGuard } from 'modules/auth/core/guards';

import { userService } from '../application';

import { userDto, usersDto } from './dto';
import { userIdParams } from './params';
import { partialUserInput, userInput } from './input';

export const userController = new Elysia({ name: 'user/controller', prefix: '/users' })
  .use(authGuard)
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
      authenticated: true,
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
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
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
      authenticated: true,
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
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
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
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
  )
  .post(
    '/',
    async ({ body, status, userService }) => {
      const user = await userService.create({ user: body });

      if (!user) {
        return status(400, { message: 'User cannot be created' });
      }

      return status(201, user);
    },
    {
      authenticated: true,
      body: userInput,
      response: {
        201: userDto,
        400: errorDto,
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
          '400': {
            description: 'User cannot be created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
                },
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
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
      authenticated: true,
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
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
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
        security: [
          {
            bearerAuth: [],
          },
        ],
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
      authenticated: true,
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
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
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
        security: [
          {
            bearerAuth: [],
          },
        ],
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
      authenticated: true,
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
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/errorDto',
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
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
  );
