import { t } from 'elysia';

import { addressInput } from './address.input';
import { companyInput } from './company.input';

export const userInput = t.Object(
  {
    address: addressInput,
    company: companyInput,
    email: t.String({
      description: 'User email address',
      example: 'john.doe@example.com',
      format: 'email',
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
    description: 'Input data for creating a new user with required personal, address, and company information',
    title: 'User Input',
  },
);

export type UserInput = typeof userInput.static;
