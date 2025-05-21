import { Elysia } from 'elysia';

import { commentController } from 'modules/comment';
import { postController } from 'modules/post';
import { userController } from 'modules/user';

export const routes = new Elysia({ name: 'routes', prefix: '/api/v1' })
  .use(commentController)
  .use(postController)
  .use(userController);
