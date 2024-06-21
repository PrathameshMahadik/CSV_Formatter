import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "CSV API",
      version: "1.0.0",
      description: "API documentation for CSV handling",
    },
    servers: [
      {
        url: "http://localhost:4999",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["src/controllers/CSV/route.ts","src/controllers/CSV Details/route.ts","src/controllers/CSV Errors/route.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
