import { t } from 'elysia';

export const companyDto = t.Object(
  {
    bs: t.String(),
    catchPhrase: t.String(),
    name: t.String(),
  },
  {
    title: 'Company DTO',
  },
);

export type CompanyDto = typeof companyDto.static;
