import { t } from 'elysia';

export const errorDto = t.Object(
  {
    message: t.String(),
  },
  {
    title: 'Error Dto',
  },
);

export type ErrorDto = typeof errorDto.static;
