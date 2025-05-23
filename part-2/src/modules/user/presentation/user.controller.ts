import { Elysia } from 'elysia';

import { AuthGuard } from 'modules/auth/application';

import { UserService } from '../application';

import { AddressDto, CompanyDto, GeoDto, UserDto, UsersDto } from './dto';
import { UserIdUrlParams } from './params';
import { PartialUserInput, UserInput } from './input';

export const UserController = new Elysia({ name: 'user/controller', prefix: '/users' })
  .use(AuthGuard)
  .use(UserService)
  .model({
    AddressDto,
    CompanyDto,
    GeoDto,
    PartialUserInput,
    UserDto,
    UserIdUrlParams,
    UserInput,
    UsersDto,
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
                  $ref: '#/components/schemas/UsersDto',
                },
              },
            },
            description: 'Successfully retrieved users',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedErrorDto',
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
      response: UsersDto,
    },
  )
  .get(
    '/:userId',
    ({ params: { userId }, userService }) => {
      return userService.findById({ userId });
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
                  $ref: '#/components/schemas/UserDto',
                },
              },
            },
            description: 'Successfully retrieved user information',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundErrorDto',
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
      params: UserIdUrlParams,
      response: UserDto,
    },
  )
  .post(
    '/',
    async ({ body, status, userService }) => {
      const user = await userService.create({ user: body });

      return status(201, user);
    },
    {
      authenticated: true,
      body: UserInput,
      detail: {
        description: 'Create a new user with complete profile information including address and company details',
        responses: {
          '201': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserDto',
                },
              },
            },
            description: 'User created successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '409': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ConflictErrorDto',
                },
              },
            },
            description: 'Conflict',
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
      response: { 201: UserDto },
    },
  )
  .put(
    '/:userId',
    ({ body, params: { userId }, userService }) => {
      return userService.update({
        user: body,
        userId,
      });
    },
    {
      authenticated: true,
      body: UserInput,
      detail: {
        description: 'Update all fields of an existing user, requiring all user data to be provided',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserDto',
                },
              },
            },
            description: 'User updated successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundErrorDto',
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
      params: UserIdUrlParams,
      response: UserDto,
    },
  )
  .patch(
    '/:userId',
    ({ body, params: { userId }, userService }) => {
      return userService.update({
        user: body,
        userId,
      });
    },
    {
      authenticated: true,
      body: PartialUserInput,
      detail: {
        description: 'Update specific fields of an existing user, allowing partial updates of any user data.',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserDto',
                },
              },
            },
            description: 'User updated successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundErrorDto',
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
      params: UserIdUrlParams,
      response: UserDto,
    },
  )
  .delete(
    '/:userId',
    ({ params: { userId }, userService }) => {
      return userService.delete({ userId });
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
                  $ref: '#/components/schemas/UserDto',
                },
              },
            },
            description: 'User deleted successfully',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UnauthorizedErrorDto',
                },
              },
            },
            description: 'Unauthorized',
          },
          '404': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/NotFoundErrorDto',
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
      params: UserIdUrlParams,
      response: UserDto,
    },
  );
