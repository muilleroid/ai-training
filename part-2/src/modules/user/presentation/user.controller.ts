import { Elysia } from 'elysia';

import { badRequestErrorDto, notFoundErrorDto } from 'core/dto';
import { authGuard } from 'modules/auth/core/guards';

import { userService } from '../application';

import { addressDto, companyDto, geoDto, userDto, usersDto } from './dto';
import { userIdParams } from './params';
import { partialUserInput, userInput } from './input';

export const userController = new Elysia({ name: 'user/controller', prefix: '/users' })
  .use(authGuard)
  .use(userService)
  .model({
    addressDto,
    companyDto,
    geoDto,
    partialUserInput,
    userDto,
    userIdParams,
    userInput,
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
        description: 'Retrieve a list of all users in the system',
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
                  $ref: '#/components/schemas/unauthorizedErrorDto',
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
        404: notFoundErrorDto,
      },
      detail: {
        tags: ['Users'],
        summary: 'Get user by ID',
        description: 'Retrieve detailed information about a specific user by their unique identifier',
        responses: {
          '200': {
            description: 'Successfully retrieved user information',
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
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
          },
          '404': {
            description: 'User not found with the specified ID',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
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
        400: badRequestErrorDto,
      },
      detail: {
        tags: ['Users'],
        summary: 'Create new user',
        description: 'Create a new user with complete profile information including address and company details',
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
            description: 'Invalid user data or user cannot be created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/badRequestErrorDto',
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
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
        404: notFoundErrorDto,
      },
      detail: {
        tags: ['Users'],
        summary: 'Update user',
        description: 'Update all fields of an existing user, requiring all user data to be provided',
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
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
          },
          '404': {
            description: 'User not found with the specified ID',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
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
        404: notFoundErrorDto,
      },
      detail: {
        tags: ['Users'],
        summary: 'Partially update user',
        description:
          'Update specific fields of an existing user, allowing partial updates of any user data including nested objects',
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
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
          },
          '404': {
            description: 'User not found with the specified ID',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
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
        404: notFoundErrorDto,
      },
      detail: {
        tags: ['Users'],
        summary: 'Delete user',
        description: 'Delete an existing user and all associated data',
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
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
          },
          '404': {
            description: 'User not found with the specified ID',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
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
