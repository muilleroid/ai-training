import { t } from 'elysia';

export const findQueryParams = t.Object({
  userId: t.Optional(t.String()),
});
