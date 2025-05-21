import { t } from 'elysia';

import { geoInput } from './geo.input';

export const addressInput = t.Object(
  {
    city: t.String({
      description: 'City name',
      example: 'Gwenborough',
      minLength: 1,
    }),
    geo: geoInput,
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
    title: 'Address Input',
    description: 'Input data for creating or updating address information',
  },
);

export type AddressInput = typeof addressInput.static;
