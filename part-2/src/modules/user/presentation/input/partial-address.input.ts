import { t } from 'elysia';

import { addressInput } from './address.input';
import { partialGeoInput } from './partial-geo.input';

export const partialAddressInput = t.Composite([
  t.Partial(t.Omit(addressInput, ['geo'])),
  t.Object({
    geo: t.Optional(partialGeoInput),
  }),
]);

export type PartialAddressInput = typeof partialAddressInput.static;
