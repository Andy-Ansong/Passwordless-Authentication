// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CV API',
            version: '1.0.0',
            description: 'A simple Express API with Swagger documentation',
        },
        components: {
            securitySchemes: {
                JWT: {
                    description: '',
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header'
                }
            }
        }
    },
    apis: ['./routes/*.js'], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
    specs,
    swaggerUi,
};