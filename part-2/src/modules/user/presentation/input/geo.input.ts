import { t } from 'elysia';

export const geoInput = t.Object({
  lat: t.String(),
  lng: t.String(),
});

export type geoInput = typeof geoInput.static;
