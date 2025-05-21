import { swagger as swaggerPlugin } from '@elysiajs/swagger';

export const swagger = swaggerPlugin({
  documentation: {
    info: {
      title: 'Documentation',
      version: '1.0.0',
    },
    tags: [
      {
        description: 'User management endpoints',
        name: 'Users',
      },
      {
        description: 'Post management endpoints',
        name: 'Posts',
      },
    ],
  },
  path: '/swagger',
});
