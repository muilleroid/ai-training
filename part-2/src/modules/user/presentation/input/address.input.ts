import { t } from 'elysia';

import { geoInput } from './geo.input';

export const addressInput = t.Object({
  city: t.String(),
  geo: geoInput,
  street: t.String(),
  suite: t.String(),
  zipcode: t.String(),
});

export type addressInput = typeof addressInput.static;
