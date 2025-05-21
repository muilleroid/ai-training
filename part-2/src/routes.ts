import { Elysia } from 'elysia';

import { badRequestErrorDto, notFoundErrorDto, unauthorizedErrorDto } from 'core/dto';
import { authController } from 'modules/auth';
import { commentController } from 'modules/comment';
import { postController } from 'modules/post';
import { postCommentController } from 'modules/post-comment';
import { userController } from 'modules/user';

export const routes = new Elysia({ name: 'routes', prefix: '/api/v1' })
  .model({
    badRequestErrorDto,
    notFoundErrorDto,
    unauthorizedErrorDto,
  })
  .use(authController)
  .use(commentController)
  .use(postController)
  .use(postCommentController)
  .use(userController);
