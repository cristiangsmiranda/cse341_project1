const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API to manage contacts (Project CSE341)',
    },
    servers: [
      {
        url: 'https://cse341-project1-lb4o.onrender.com',
      },
    ],
  },
  apis: ['./routes/contacts.js'], // onde estão as anotações dos endpoints
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
