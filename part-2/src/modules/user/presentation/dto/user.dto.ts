import { t } from 'elysia';

import { AddressDto } from './address.dto';
import { CompanyDto } from './company.dto';

export const UserDto = t.Object(
  {
    address: t.MaybeEmpty(AddressDto),
    company: t.MaybeEmpty(CompanyDto),
    email: t.String({
      description: 'User email address',
      example: 'john.doe@example.com',
      format: 'email',
    }),
    id: t.String({
      description: 'Unique identifier for the user',
      example: 'ck9x8v7b600001kp5hbd6g0q2',
    }),
    name: t.String({
      description: 'Full name of the user',
      example: 'John Doe',
      minLength: 1,
    }),
    phone: t.String({
      description: 'Contact phone number',
      example: '1-770-736-8031 x56442',
      pattern: '^[\\d\\-\\(\\)\\s\\w]+$',
    }),
    username: t.String({
      description: 'Unique username for the account',
      example: 'johndoe',
      minLength: 3,
      pattern: '^[a-zA-Z0-9_]+$',
    }),
    website: t.String({
      description: 'Personal or company website URL',
      example: 'hildegard.org',
      format: 'uri',
    }),
  },
  {
    description: 'Data transfer object for user information including optional address and company details',
    title: 'User DTO',
  },
);
