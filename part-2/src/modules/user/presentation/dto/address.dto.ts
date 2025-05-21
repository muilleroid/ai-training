import { t } from 'elysia';

import { geoDto } from './geo.dto';

export const addressDto = t.Object(
  {
    city: t.String({
      description: 'City name',
      example: 'Gwenborough',
      minLength: 1,
    }),
    geo: t.Optional(t.Nullable(geoDto)),
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
    description: 'Data transfer object for address information including optional geographical coordinates',
    title: 'Address DTO',
  },
);

export type AddressDto = typeof addressDto.static;
