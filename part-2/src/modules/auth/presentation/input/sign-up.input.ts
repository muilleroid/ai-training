import { t } from 'elysia';

export const SignUpInput = t.Object(
  {
    email: t.String({
      description: 'User email address',
      examples: ['user@example.com'],
      format: 'email',
    }),
    name: t.String({
      description: 'User full name',
      examples: ['John Doe'],
    }),
    password: t.String({
      description: 'User password (8-20 characters)',
      examples: ['password123'],
      maxLength: 20,
      minLength: 8,
    }),
  },
  {
    description: 'Input parameters for user registration',
    title: 'Sign Up Input',
  },
);
