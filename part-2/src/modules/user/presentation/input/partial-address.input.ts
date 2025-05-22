import { t } from 'elysia';

import { AddressInput } from './address.input';
import { PartialGeoInput } from './partial-geo.input';

export const PartialAddressInput = t.Composite(
  [
    t.Partial(t.Omit(AddressInput, ['geo'])),
    t.Object({
      geo: t.Optional(PartialGeoInput),
    }),
  ],
  {
    description:
      'Partial input data for updating address information. All fields are optional including nested geo data.',
    title: 'Partial Address Input',
  },
);
