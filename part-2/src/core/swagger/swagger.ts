import { swagger as swaggerPlugin } from '@elysiajs/swagger';

export const swagger = swaggerPlugin({
  documentation: {
    info: {
      title: 'Documentation',
      version: '1.0.0',
    },
    tags: [
      {
        name: 'Users',
        description: 'User management endpoints',
      },
    ],
  },
  path: '/swagger',
});
