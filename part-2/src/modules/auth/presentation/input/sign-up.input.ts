import { t } from 'elysia';

export const signUpInput = t.Object({
  email: t.String({ format: 'email' }),
  name: t.String(),
  password: t.String({ maxLength: 20, minLength: 8 }),
});

export type SignUpInput = typeof signUpInput.static;
