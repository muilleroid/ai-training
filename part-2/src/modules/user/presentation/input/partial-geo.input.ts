import { t } from 'elysia';

import { GeoInput } from './geo.input';

export const PartialGeoInput = t.Partial(GeoInput, {
  description: 'Partial input data for updating geographical coordinates. All fields are optional.',
  title: 'Partial Geo Input',
});
