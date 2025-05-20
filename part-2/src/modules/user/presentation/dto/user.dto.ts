import { t } from 'elysia';

import { addressDto } from './address.dto';
import { companyDto } from './company.dto';

export const userDto = t.Object({
  address: t.Optional(t.Nullable(addressDto)),
  company: t.Optional(t.Nullable(companyDto)),
  email: t.String(),
  id: t.String({ format: 'uuid' }),
  name: t.String(),
  phone: t.String(),
  username: t.String(),
  website: t.String(),
});

export type UserDto = typeof userDto.static;
