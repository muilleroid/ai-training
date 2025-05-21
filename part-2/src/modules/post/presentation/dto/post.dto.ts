import { t } from 'elysia';

export const postDto = t.Object(
  {
    body: t.String(),
    id: t.String(),
    title: t.String(),
    userId: t.String(),
  },
  {
    title: 'Post DTO',
  },
);

export type PostDto = typeof postDto.static;
