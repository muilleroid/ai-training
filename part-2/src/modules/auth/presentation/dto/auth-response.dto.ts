import { t } from 'elysia';

import { AuthDto } from './auth.dto';

export const AuthResponseDto = t.Object(
  {
    auth: AuthDto,
    token: t.String({
      description: 'JWT authentication token',
      examples: ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'],
    }),
  },
  {
    description: 'Response containing user authentication data and access token',
    title: 'Auth Response DTO',
  },
);
