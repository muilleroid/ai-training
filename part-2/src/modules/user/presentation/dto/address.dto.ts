import { t } from 'elysia';

import { geoDto } from './geo.dto';

export const addressDto = t.Object(
  {
    city: t.String(),
    geo: t.Optional(t.Nullable(geoDto)),
    street: t.String(),
    suite: t.String(),
    zipcode: t.String(),
  },
  {
    title: 'Address DTO',
  },
);

export type AddressDto = typeof addressDto.static;
