import { t } from 'elysia';

export const authDto = t.Object(
  {
    email: t.String(),
    id: t.String(),
    name: t.String(),
  },
  {
    title: 'Auth DTO',
  },
);

export type AuthDto = typeof authDto.static;
