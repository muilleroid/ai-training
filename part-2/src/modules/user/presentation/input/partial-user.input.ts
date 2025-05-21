import { t } from 'elysia';

import { partialAddressInput } from './partial-address.input';
import { partialCompanyInput } from './partial-company.input';
import { userInput } from './user.input';

export const partialUserInput = t.Composite(
  [
    t.Partial(t.Omit(userInput, ['address', 'company'])),
    t.Object({
      address: t.Optional(partialAddressInput),
      company: t.Optional(partialCompanyInput),
    }),
  ],
  {
    title: 'Partial User Input',
    description: 'Partial input data for updating user information. All fields are optional including nested address and company data.',
  },
);

export type PartialUserInput = typeof partialUserInput.static;
