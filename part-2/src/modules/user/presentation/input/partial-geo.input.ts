import { t } from 'elysia';

import { geoInput } from './geo.input';

export const partialGeoInput = t.Partial(geoInput, {
  description: 'Partial input data for updating geographical coordinates. All fields are optional.',
  title: 'Partial Geo Input',
});

export type PartialGeoInput = typeof partialGeoInput.static;
