import { Elysia } from 'elysia';

import { badRequestErrorDto, unauthorizedErrorDto } from 'core/dto';

import { AuthService } from '../application';
import { AuthGuard } from '../core/guards';

import { authDto, authResponseDto } from './dto';
import { signInInput, signUpInput } from './input';

export const AuthController = new Elysia({ name: 'auth' })
  .use(AuthGuard)
  .use(AuthService)
  .model({
    authDto,
    authResponseDto,
    signInInput,
    signUpInput,
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
      detail: {
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/authDto',
                },
              },
            },
            description: 'Successfully retrieved current user',
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
        summary: 'Get current user',
        tags: ['Auth'],
      },
      response: {
        200: authDto,
        401: unauthorizedErrorDto,
      },
      withUserId: true,
    },
  )
  .post(
    '/sign-in',
    async ({ authService, body: { email, password }, status }) => {
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
      detail: {
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/authResponseDto',
                },
              },
            },
            description: 'Successfully signed in',
          },
          '401': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/unauthorizedErrorDto',
                },
              },
            },
            description: 'Invalid credentials',
          },
        },
        summary: 'Sign in',
        tags: ['Auth'],
      },
      response: {
        200: authResponseDto,
        401: unauthorizedErrorDto,
      },
    },
  )
  .post(
    '/sign-up',
    async ({ authService, body: { email, name, password }, status }) => {
      const token = await authService.signUp({
        email,
        name,
        password,
      });

      if (!token) {
        return status(400, { message: 'Cannot sign up' });
      }

      return status(201, token);
    },
    {
      body: signUpInput,
      detail: {
        responses: {
          '201': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/authResponseDto',
                },
              },
            },
            description: 'Successfully signed up',
          },
          '400': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/badRequestErrorDto',
                },
              },
            },
            description: 'Cannot sign up',
          },
        },
        summary: 'Sign up',
        tags: ['Auth'],
      },
      response: {
        201: authResponseDto,
        400: badRequestErrorDto,
      },
    },
  );
