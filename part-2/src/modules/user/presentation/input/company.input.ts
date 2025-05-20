import { t } from 'elysia';

export const companyInput = t.Object({
  bs: t.String(),
  catchPhrase: t.String(),
  name: t.String(),
});

export type companyInput = typeof companyInput.static;
