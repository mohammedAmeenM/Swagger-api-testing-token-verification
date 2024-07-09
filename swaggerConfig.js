const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vedio Call Management System',
      version: '1.0.0',
      description: 'API documentation for the Vedio Call Management System',
    },
    servers: [
      {
        url: 'http://localhost:9000/api',
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js', './src/controllers/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
