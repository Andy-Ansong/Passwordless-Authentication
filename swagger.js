import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
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
                    value: 'Bearer <JWT token here>'
                }
            }
        }
    },
    apis: ['./docs/*.js', './routes/*.js'],
};

const specs = swaggerJsdoc(options);

export default {
    specs,
    swaggerUi,
};