import { t } from 'elysia';

import { companyInput } from './company.input';

export const partialCompanyInput = t.Partial(companyInput);

export type PartialCompanyInput = typeof partialCompanyInput.static;
