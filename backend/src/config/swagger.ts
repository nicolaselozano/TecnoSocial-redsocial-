import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import path from "node:path";

const swaggerSpecs = yaml.load(
  path.resolve(__dirname, "../docs/build/swagger.yaml")
);

export { swaggerUi, swaggerSpecs };
