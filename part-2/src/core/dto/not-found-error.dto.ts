import { t } from 'elysia';

export const notFoundErrorDto = t.Object(
  {
    message: t.String({
      description: 'Detailed error message indicating which resource could not be found',
      examples: ['Resource not found'],
      minLength: 1,
    }),
  },
  {
    title: 'Not Found Error DTO',
    description: 'Error response when the requested resource does not exist or cannot be found',
    examples: [
      {
        message: 'Resource not found',
      },
    ],
  },
);
