import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Internal Employee Portal API',
      version: '1.0.0',
      description: 'An express API for an internal employee portal',
    },
    components: {
      securitySchemes: {
        Authorization: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          value: 'Bearer <JWT token here>',
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
        },
      },
    },
  },
  apis: ['./docs/*.js', './routes/*.ts'], // Update path if needed
};

const specs = swaggerJsdoc(options);

export default {
  specs,
  swaggerUi,
};
