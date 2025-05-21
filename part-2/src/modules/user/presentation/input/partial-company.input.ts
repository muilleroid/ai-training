import { t } from 'elysia';

import { companyInput } from './company.input';

export const partialCompanyInput = t.Partial(companyInput, {
  description: 'Partial input data for updating company information. All fields are optional.',
  title: 'Partial Company Input',
});

export type PartialCompanyInput = typeof partialCompanyInput.static;
