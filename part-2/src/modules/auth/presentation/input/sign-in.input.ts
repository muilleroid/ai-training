import { t } from 'elysia';

export const signInInput = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ maxLength: 20, minLength: 8 }),
});

export type SignInInput = typeof signInInput.static;
