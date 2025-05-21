import { eq } from 'drizzle-orm';
import { Elysia } from 'elysia';
import omitEmpty from 'omit-empty-es';

import { setup } from 'core/setup';

import type { PostRepository } from 'modules/post/domain/types';

import { postSchema } from '../schemas';

import { toPost, toPostList } from './post-repository.mapper';

export const postRepository = new Elysia({ name: 'post/repository' })
  .use(setup)
  .resolve({ as: 'global' }, ({ connection }) => {
    const repository: PostRepository = {
      create: async ({ post }) => {
        const [createdPost] = await connection.insert(postSchema).values(post).returning();

        return toPost(createdPost);
      },
      delete: async ({ postId }) => {
        const post = await repository.findById({ postId });

        await connection.delete(postSchema).where(eq(postSchema.id, postId));

        return post;
      },
      find: async ({ userId } = {}) => {
        const posts = await connection
          .select()
          .from(postSchema)
          .where(userId ? eq(postSchema.userId, userId) : undefined);

        return toPostList(posts);
      },
      findById: async ({ postId }) => {
        const [post] = await connection.select().from(postSchema).where(eq(postSchema.id, postId)).limit(1);

        return toPost(post);
      },
      update: async ({ postId, post }) => {
        const postUpdates = omitEmpty<object>(post);

        if (Object.keys(postUpdates).length > 0) {
          await connection.update(postSchema).set(postUpdates).where(eq(postSchema.id, postId));
        }

        return repository.findById({ postId });
      },
    };

    return { postRepository: repository };
  });
