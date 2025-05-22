import { swagger as swaggerPlugin } from '@elysiajs/swagger';

export const swagger = swaggerPlugin({
  documentation: {
    components: {
      securitySchemes: {
        bearerAuth: {
          bearerFormat: 'JWT',
          scheme: 'bearer',
          type: 'http',
        },
      },
    },
    info: {
      title: 'Documentation',
      version: '1.0.0',
    },
    tags: [
      {
        description: 'Authentication endpoints',
        name: 'Auth',
      },
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
