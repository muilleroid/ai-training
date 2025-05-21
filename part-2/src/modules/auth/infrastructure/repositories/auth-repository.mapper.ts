import type { Auth } from '../../domain/types';

import type { AuthSchema } from '../schemas';

export const toAuth = (auth?: AuthSchema | null): Auth | null => {
  if (!auth) {
    return null;
  }

  return {
    email: auth.email,
    id: auth.id,
    name: auth.name,
    passwordHash: auth.passwordHash,
  };
};
