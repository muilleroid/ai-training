import { t } from 'elysia';

export const companyDto = t.Object(
  {
    bs: t.String({
      description: 'Business strategy or slogan',
      example: 'harness real-time e-markets',
      minLength: 1,
    }),
    catchPhrase: t.String({
      description: 'Company catch phrase or motto',
      example: 'Multi-layered client-server neural-net',
      minLength: 1,
    }),
    name: t.String({
      description: 'Company name',
      example: 'Hoeger LLC',
      minLength: 1,
    }),
  },
  {
    title: 'Company DTO',
    description: 'Data transfer object for company information',
  },
);

export type CompanyDto = typeof companyDto.static;
