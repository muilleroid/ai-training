import { Elysia } from 'elysia';

import { badRequestErrorDto, notFoundErrorDto } from 'core/dto';
import { AuthGuard } from 'modules/auth/core/guards';

import { UserService } from '../application';

import { addressDto, companyDto, geoDto, userDto, usersDto } from './dto';
import { userIdParams } from './params';
import { partialUserInput, userInput } from './input';

export const UserController = new Elysia({ name: 'user/controller', prefix: '/users' })
  .use(AuthGuard)
  .use(UserService)
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
      detail: {
        description: 'Retrieve a list of all users in the system',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/usersDto',
                },
              },
            },
            description: 'Successfully retrieved users',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Get all users',
        tags: ['Users'],
      },
      response: usersDto,
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
      detail: {
        description: 'Retrieve detailed information about a specific user by their unique identifier',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/userDto',
                },
              },
            },
            description: 'Successfully retrieved user information',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
                },
              },
            },
            description: 'User not found with the specified ID',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Get user by ID',
        tags: ['Users'],
      },
      params: userIdParams,
      response: {
        200: userDto,
        404: notFoundErrorDto,
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
      detail: {
        description: 'Create a new user with complete profile information including address and company details',
        responses: {
          '201': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/userDto',
                },
              },
            },
            description: 'User created successfully',
          },
          '400': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/badRequestErrorDto',
                },
              },
            },
            description: 'Invalid user data or user cannot be created',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Create new user',
        tags: ['Users'],
      },
      response: {
        201: userDto,
        400: badRequestErrorDto,
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
      body: userInput,
      detail: {
        description: 'Update all fields of an existing user, requiring all user data to be provided',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/userDto',
                },
              },
            },
            description: 'User updated successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
                },
              },
            },
            description: 'User not found with the specified ID',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Update user',
        tags: ['Users'],
      },
      params: userIdParams,
      response: {
        200: userDto,
        404: notFoundErrorDto,
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
      body: partialUserInput,
      detail: {
        description: 'Update specific fields of an existing user, allowing partial updates of any user data.',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/userDto',
                },
              },
            },
            description: 'User updated successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
                },
              },
            },
            description: 'User not found with the specified ID',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Partially update user',
        tags: ['Users'],
      },
      params: userIdParams,
      response: {
        200: userDto,
        404: notFoundErrorDto,
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
      detail: {
        description: 'Delete an existing user and all associated data',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/userDto',
                },
              },
            },
            description: 'User deleted successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/notFoundErrorDto',
                },
              },
            },
            description: 'User not found with the specified ID',
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        summary: 'Delete user',
        tags: ['Users'],
      },
      params: userIdParams,
      response: {
        200: userDto,
        404: notFoundErrorDto,
      },
    },
  );
