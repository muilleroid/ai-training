import { t } from 'elysia';

import { addressInput } from './address.input';
import { companyInput } from './company.input';

export const userInput = t.Object({
  address: addressInput,
  company: companyInput,
  email: t.String(),
  name: t.String(),
  phone: t.String(),
  username: t.String(),
  website: t.String(),
});

export type userInput = typeof userInput.static;
