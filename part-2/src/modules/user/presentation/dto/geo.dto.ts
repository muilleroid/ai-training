import { t } from 'elysia';

export const geoDto = t.Object(
  {
    lat: t.String({
      description: 'Geographical latitude coordinate',
      example: '40.7128',
      pattern: '^-?\\d+\\.\\d+$',
    }),
    lng: t.String({
      description: 'Geographical longitude coordinate',
      example: '-74.0060',
      pattern: '^-?\\d+\\.\\d+$',
    }),
  },
  {
    title: 'Geo DTO',
    description: 'Data transfer object for geographical coordinates',
  },
);

export type GeoDto = typeof geoDto.static;
