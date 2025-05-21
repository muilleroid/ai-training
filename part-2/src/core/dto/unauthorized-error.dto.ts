import { t } from 'elysia';

export const unauthorizedErrorDto = t.Object(
  {
    message: t.String({
      description: 'Detailed error message explaining the authentication failure',
      examples: ['Unauthorized'],
      minLength: 1,
    }),
  },
  {
    description: 'Error response for authentication failures and invalid or missing credentials',
    examples: [
      {
        message: 'Unauthorized',
      },
    ],
    title: 'Unauthorized Error DTO',
  },
);
