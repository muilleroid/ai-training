import { swagger as swaggerPlugin } from '@elysiajs/swagger';

export const swagger = swaggerPlugin({
  documentation: {
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
    components: {
      responses: {
        '400': {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/badRequestErrorDto',
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/unauthorizedErrorDto',
              },
            },
          },
        },
        '404': {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/notFoundErrorDto',
              },
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  path: '/swagger',
});
