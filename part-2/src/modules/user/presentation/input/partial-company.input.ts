import { t } from 'elysia';

import { CompanyInput } from './company.input';

export const PartialCompanyInput = t.Partial(CompanyInput, {
  description: 'Partial input data for updating company information. All fields are optional.',
  title: 'Partial Company Input',
});
