import { t } from 'elysia';

import { GeoInput } from './geo.input';

export const AddressInput = t.Object(
  {
    city: t.String({
      description: 'City name',
      example: 'Gwenborough',
      minLength: 1,
    }),
    geo: GeoInput,
    street: t.String({
      description: 'Street name and number',
      example: 'Kulas Light',
      minLength: 1,
    }),
    suite: t.String({
      description: 'Apartment, suite, or unit number',
      example: 'Apt. 556',
      minLength: 1,
    }),
    zipcode: t.String({
      description: 'Postal code',
      example: '92998-3874',
      pattern: '^\\d{5}(?:-\\d{4})?$',
    }),
  },
  {
    description: 'Input data for creating or updating address information',
    title: 'Address Input',
  },
);
