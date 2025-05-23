import { t } from 'elysia';

import { UpdatePostInput } from './update-post.input';

export const PartialUpdatePostInput = t.Partial(UpdatePostInput, {
  description: 'Input data for partial update of a post',
  title: 'Partial Update Post Input',
});
