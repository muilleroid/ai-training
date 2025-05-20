import { t } from 'elysia';

export const companyDto = t.Object({
  bs: t.String(),
  catchPhrase: t.String(),
  id: t.String({ format: 'uuid' }),
  name: t.String(),
});

export type CompanyDto = typeof companyDto.static;
