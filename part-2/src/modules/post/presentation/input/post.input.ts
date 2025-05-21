import { t } from 'elysia';

export const postInput = t.Object({
  body: t.String(),
  title: t.String(),
  userId: t.String(),
});

export type PostInput = typeof postInput.static;
