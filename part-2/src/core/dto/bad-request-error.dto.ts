import { t } from 'elysia';

export const badRequestErrorDto = t.Object(
  {
    message: t.String({
      description: 'Error message explaining request issues',
      examples: ['Bad request'],
      minLength: 1,
    }),
  },
  {
    description: 'Error response for invalid requests, including validation errors and malformed data',
    examples: [
      {
        message: 'Bad request',
      },
    ],
    title: 'Bad Request Error DTO',
  },
);
