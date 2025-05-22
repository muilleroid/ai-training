import { t } from 'elysia';

import { AccountDto } from './account.dto';

export const AccountResponseDto = t.Object(
  {
    account: AccountDto,
    token: t.String({
      description: 'JWT authentication token',
      examples: ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'],
    }),
  },
  {
    description: 'Response containing user account data and access token',
    title: 'Account Response DTO',
  },
);
