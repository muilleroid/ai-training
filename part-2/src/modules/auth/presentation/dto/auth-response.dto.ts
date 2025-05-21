import { t } from 'elysia';

import { authDto } from './auth.dto';

export const authResponseDto = t.Object(
  {
    auth: authDto,
    token: t.String(),
  },
  {
    title: 'Auth Response DTO',
  },
);

export type AuthResponseDto = typeof authResponseDto.static;
