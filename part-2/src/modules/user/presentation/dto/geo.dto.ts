import { t } from 'elysia';

export const geoDto = t.Object(
  {
    lat: t.String(),
    lng: t.String(),
  },
  {
    title: 'Geo DTO',
  },
);

export type GeoDto = typeof geoDto.static;
