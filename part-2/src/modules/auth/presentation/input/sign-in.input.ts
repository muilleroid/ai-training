import { t } from 'elysia';

export const SignInInput = t.Object(
  {
    email: t.String({
      description: 'User email address',
      examples: ['user@example.com'],
      format: 'email',
    }),
    password: t.String({
      description: 'User password (8-20 characters)',
      examples: ['password123'],
      maxLength: 20,
      minLength: 8,
    }),
  },
  {
    description: 'Input parameters for user sign-in',
    title: 'Sign In Input',
  },
);
