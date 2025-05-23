import { t } from 'elysia';

export const ConflictErrorDto = t.Object(
  {
    message: t.String({
      description: 'Error message explaining request issues',
      examples: ['Conflict'],
      minLength: 1,
    }),
  },
  {
    description: 'Error response for conflict situations, such as attempting to create a resource that already exists',
    examples: [
      {
        message: 'Conflict',
      },
    ],
    title: 'Conflict Error DTO',
  },
);
