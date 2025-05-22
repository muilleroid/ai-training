import { t } from 'elysia';

export const GeoInput = t.Object(
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
    description: 'Input data for geographical coordinates',
    title: 'Geo Input',
  },
);
