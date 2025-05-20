import { t } from 'elysia';

import { geoInput } from './geo.input';

export const partialGeoInput = t.Partial(geoInput);

export type PartialGeoInput = typeof partialGeoInput.static;
