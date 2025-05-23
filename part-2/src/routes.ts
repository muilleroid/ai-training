import { Elysia } from 'elysia';

import { ConflictErrorDto, NotFoundErrorDto, UnauthorizedErrorDto } from 'core/presentation/dto';
import { AuthController } from 'modules/auth';
import { CommentController } from 'modules/comment';
import { PostController } from 'modules/post';
import { PostCommentController } from 'modules/post-comment';
import { UserController } from 'modules/user';

export const routes = new Elysia({ name: 'routes', prefix: '/api/v1' })
  .model({
    ConflictErrorDto,
    NotFoundErrorDto,
    UnauthorizedErrorDto,
  })
  .use(AuthController)
  .use(CommentController)
  .use(PostController)
  .use(PostCommentController)
  .use(UserController);
