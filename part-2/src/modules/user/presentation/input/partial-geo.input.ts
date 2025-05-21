import { t } from 'elysia';

import { geoInput } from './geo.input';

export const partialGeoInput = t.Partial(geoInput, {
  title: 'Partial Geo Input',
  description: 'Partial input data for updating geographical coordinates. All fields are optional.',
});

export type PartialGeoInput = typeof partialGeoInput.static;
