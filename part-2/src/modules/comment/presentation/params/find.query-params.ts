import { t } from 'elysia';

export const findQueryParams = t.Object({
  postId: t.Optional(t.String()),
  userId: t.Optional(t.String()),
});
