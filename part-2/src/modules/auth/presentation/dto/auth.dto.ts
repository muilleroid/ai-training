import { t } from 'elysia';

export const AuthDto = t.Object(
  {
    email: t.String({
      description: 'User email address',
      examples: ['user@example.com'],
      format: 'email',
    }),
    id: t.String({
      description: 'Unique user identifier',
      examples: ['123e4567-e89b-12d3-a456-426614174000'],
    }),
    name: t.String({
      description: 'User full name',
      examples: ['John Doe'],
    }),
  },
  {
    description: 'Basic user authentication information',
    title: 'Auth DTO',
  },
);
