const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Definir opciones para Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Developer Social Network API",
      version: "1.0.0",
      description: "Documentación de la API usando Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000", // URL base de tu API
      },
      {
        url: "http://ec2-107-23-48-235.compute-1.amazonaws.com",
      },
    ],
  },
  apis: ["./src/features/**/*.ts"], // Ruta a todas las subcarpetas dentro de src/features
};

// Generar la especificación de Swagger
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpecs };
