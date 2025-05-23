import { Elysia } from 'elysia';

import { ConflictErrorDto, UnauthorizedErrorDto } from 'core/presentation/dto';

import { AuthGuard, AuthService } from '../application';

import { AccountDto, AccountResponseDto } from './dto';
import { SignInInput, SignUpInput } from './input';

export const AuthController = new Elysia({ name: 'auth', prefix: '/auth' })
  .use(AuthGuard)
  .use(AuthService)
  .model({
    AccountDto,
    AccountResponseDto,
    SignInInput,
    SignUpInput,
  })
  .get(
    '/me',
    async ({ accountId, authService, status }) => {
      const account = await authService.findById({ accountId });

      if (!account) {
        return status(401, { message: 'Unauthorized' });
      }

      return account;
    },
    {
      authenticated: true,
      detail: {
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AccountDto',
                },
              },
            },
            description: 'Successfully retrieved current user',
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
        summary: 'Get current user',
        tags: ['Auth'],
      },
      response: {
        200: AccountDto,
        401: UnauthorizedErrorDto,
      },
    },
  )
  .post(
    '/sign-in',
    async ({ authService, body: { email, password }, status }) => {
      const account = await authService.signIn({
        email,
        password,
      });

      if (!account) {
        return status(401, { message: 'Unauthorized' });
      }

      return account;
    },
    {
      body: SignInInput,
      detail: {
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AccountResponseDto',
                },
              },
            },
            description: 'Successfully signed in',
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
        summary: 'Sign in',
        tags: ['Auth'],
      },
      response: {
        200: AccountResponseDto,
        401: UnauthorizedErrorDto,
      },
    },
  )
  .post(
    '/sign-up',
    async ({ authService, body: { email, name, password }, status }) => {
      const response = await authService.signUp({
        email,
        name,
        password,
      });

      if (!response) {
        return status(409, { message: 'Conflict' });
      }

      return status(200, response);
    },
    {
      body: SignUpInput,
      detail: {
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AccountResponseDto',
                },
              },
            },
            description: 'Successfully signed up',
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
        summary: 'Sign up',
        tags: ['Auth'],
      },
      response: {
        200: AccountResponseDto,
        409: ConflictErrorDto,
      },
    },
  );
