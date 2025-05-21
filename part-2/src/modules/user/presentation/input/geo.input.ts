import { t } from 'elysia';

export const geoInput = t.Object(
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
    title: 'Geo Input',
    description: 'Input data for geographical coordinates',
  },
);

export type GeoInput = typeof geoInput.static;
