import { t } from 'elysia';

import { partialAddressInput } from './partial-address.input';
import { partialCompanyInput } from './partial-company.input';
import { userInput } from './user.input';

export const partialUserInput = t.Composite([
  t.Partial(t.Omit(userInput, ['address', 'company'])),
  t.Object({
    address: t.Optional(partialAddressInput),
    company: t.Optional(partialCompanyInput),
  }),
]);

export type PartialUserInput = typeof partialUserInput.static;
