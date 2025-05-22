import { Elysia } from 'elysia';

import { BadRequestErrorDto, UnauthorizedErrorDto } from 'core/presentation/dto';

import { AuthGuard, AuthService } from '../application';

import { AuthDto, AuthResponseDto } from './dto';
import { SignInInput, SignUpInput } from './input';

export const AuthController = new Elysia({ name: 'auth' })
  .use(AuthGuard)
  .use(AuthService)
  .model({
    AuthDto,
    AuthResponseDto,
    SignInInput,
    SignUpInput,
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
                  $ref: '#/components/schemas/AuthDto',
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
        200: AuthDto,
        401: UnauthorizedErrorDto,
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
      body: SignInInput,
      detail: {
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponseDto',
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
            description: 'Invalid credentials',
          },
        },
        summary: 'Sign in',
        tags: ['Auth'],
      },
      response: {
        200: AuthResponseDto,
        401: UnauthorizedErrorDto,
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
      body: SignUpInput,
      detail: {
        responses: {
          '201': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponseDto',
                },
              },
            },
            description: 'Successfully signed up',
          },
          '400': {
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/BadRequestErrorDto',
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
        201: AuthResponseDto,
        400: BadRequestErrorDto,
      },
    },
  );
