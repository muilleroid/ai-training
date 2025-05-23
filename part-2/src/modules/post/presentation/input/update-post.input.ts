import { t } from 'elysia';

export const UpdatePostInput = t.Object(
  {
    body: t.String({
      description: 'The content of the post',
      example: 'This is a detailed post content explaining something interesting.',
      minLength: 1,
    }),
    title: t.String({
      description: 'The title of the post',
      example: 'An Interesting Post Title',
      minLength: 1,
    }),
  },
  {
    description: 'Input data for updating a post',
    title: 'Update Post Input',
  },
);
