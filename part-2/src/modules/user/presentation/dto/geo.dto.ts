import { t } from 'elysia';

export const geoDto = t.Object({
  lat: t.String(),
  lng: t.String(),
});

export type GeoDto = typeof geoDto.static;
