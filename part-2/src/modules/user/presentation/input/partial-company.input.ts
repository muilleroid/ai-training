import { t } from 'elysia';

import { companyInput } from './company.input';

export const partialCompanyInput = t.Partial(companyInput, {
  title: 'Partial Company Input',
  description: 'Partial input data for updating company information. All fields are optional.',
});

export type PartialCompanyInput = typeof partialCompanyInput.static;
