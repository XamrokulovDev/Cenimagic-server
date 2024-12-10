const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Cimagic API',
    version: '1.0.0',
    description: 'Node.js bilan yaratilgan Movie API',
  },
  servers: [
    {
      url: 'http://localhost:5000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;