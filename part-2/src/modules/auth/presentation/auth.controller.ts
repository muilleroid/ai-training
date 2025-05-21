import { Elysia } from 'elysia';

import { errorDto } from 'core/dto';

import { authService } from '../application';
import { authGuard } from '../core/guards';

import { authDto, authResponseDto } from './dto';
import { signInInput, signUpInput } from './input';

export const authController = new Elysia({ name: 'auth' })
  .use(authGuard)
  .use(authService)
  .model({
    authDto,
    authResponseDto,
    errorDto,
  })
  .get(
    '/me',
    async ({ authService, status, userId }) => {
      const auth = await authService.findById({ userId });

      if (!auth) {
        return status(401, { message: 'Unauthorized' });
      }

      return auth;
    },
    {
      authenticated: true,
      withUserId: true,
      response: {
        200: authDto,
        401: errorDto,
      },
      detail: {
        tags: ['Auth'],
        summary: 'Get current user',
        responses: {
          '200': {
            description: 'Successfully retrieved current user',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/authDto',
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
  .post(
    '/sign-in',
    async ({ body: { email, password }, status, authService }) => {
      const auth = await authService.signIn({
        email,
        password,
      });

      if (!auth) {
        return status(401, { message: 'Invalid credentials' });
      }

      return auth;
    },
    {
      body: signInInput,
      response: {
        200: authResponseDto,
        401: errorDto,
      },
      detail: {
        tags: ['Auth'],
        summary: 'Sign in',
        responses: {
          '200': {
            description: 'Successfully signed in',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/authResponseDto',
                },
              },
            },
          },
          '401': {
            description: 'Invalid credentials',
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
    '/sign-up',
    async ({ body: { email, name, password }, status, authService }) => {
      const token = await authService.signUp({
        email,
        name,
        password,
      });

      if (!token) {
        return status(400, { message: 'User already exists' });
      }

      return status(201, token);
    },
    {
      body: signUpInput,
      response: {
        201: authResponseDto,
        400: errorDto,
      },
      detail: {
        tags: ['Auth'],
        summary: 'Sign up',
        responses: {
          '201': {
            description: 'Successfully signed up',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/authResponseDto',
                },
              },
            },
          },
          '400': {
            description: 'Cannot sign up',
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
