import { swagger as swaggerPlugin } from '@elysiajs/swagger';

export const swagger = swaggerPlugin({
  documentation: {
    info: {
      title: 'Documentation',
      version: '1.0.0',
    },
    tags: [
      {
        description: 'Comment management endpoints',
        name: 'Comments',
      },
      {
        description: 'Post management endpoints',
        name: 'Posts',
      },
      {
        description: 'User management endpoints',
        name: 'Users',
      },
    ],
  },
  path: '/swagger',
});
