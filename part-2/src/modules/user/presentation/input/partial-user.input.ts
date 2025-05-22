import { t } from 'elysia';

import { PartialAddressInput } from './partial-address.input';
import { PartialCompanyInput } from './partial-company.input';
import { UserInput } from './user.input';

export const PartialUserInput = t.Composite(
  [
    t.Partial(t.Omit(UserInput, ['address', 'company'])),
    t.Object({
      address: t.Optional(PartialAddressInput),
      company: t.Optional(PartialCompanyInput),
    }),
  ],
  {
    description: 'Partial input data for updating user information.',
    title: 'Partial User Input',
  },
);
