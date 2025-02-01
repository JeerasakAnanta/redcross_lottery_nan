// swagger.js
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PROT = process.env.NODE_PORT || 3000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Lotteries API",
      version: "1.0.0",
      description: "API for managing lotteries",
    },
    servers: [
      {
        url: `http://localhost:${PROT}`, // Replace with your server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Adjust the path to where your routes are defined
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
