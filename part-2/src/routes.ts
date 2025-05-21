import { Elysia } from 'elysia';

import { badRequestErrorDto, notFoundErrorDto, unauthorizedErrorDto } from 'core/dto';
import { AuthController } from 'modules/auth';
import { CommentController } from 'modules/comment';
import { PostController } from 'modules/post';
import { PostCommentController } from 'modules/post-comment';
import { UserController } from 'modules/user';

export const routes = new Elysia({ name: 'routes', prefix: '/api/v1' })
  .model({
    badRequestErrorDto,
    notFoundErrorDto,
    unauthorizedErrorDto,
  })
  .use(AuthController)
  .use(CommentController)
  .use(PostController)
  .use(PostCommentController)
  .use(UserController);
