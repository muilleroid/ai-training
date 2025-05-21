import { t } from 'elysia';

import { addressInput } from './address.input';
import { partialGeoInput } from './partial-geo.input';

export const partialAddressInput = t.Composite(
  [
    t.Partial(t.Omit(addressInput, ['geo'])),
    t.Object({
      geo: t.Optional(partialGeoInput),
    }),
  ],
  {
    description:
      'Partial input data for updating address information. All fields are optional including nested geo data.',
    title: 'Partial Address Input',
  },
);

export type PartialAddressInput = typeof partialAddressInput.static;
