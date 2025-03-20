import swaggerJsdoc from 'swagger-jsdoc';
import { version } from '../../package.json';
import { SwaggerOptions } from 'swagger-ui-express';
import { NodeEnv } from '../types/environment';

// Get environment variables with defaults
const NODE_ENV = process.env.NODE_ENV || NodeEnv.Development;
const API_URL = process.env.API_URL || 'http://localhost:3000';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Express TypeScript API',
      version,
      description: `API documentation for Express TypeScript application (${NODE_ENV} environment)`,
      contact: {
        name: 'API Support',
        email: process.env.SUPPORT_EMAIL || 'support@example.com'
      },
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC'
      }
    },
    servers: [
      {
        url: API_URL,
        description: `${NODE_ENV.charAt(0).toUpperCase() + NODE_ENV.slice(1)} server`
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'] // Path to the API routes and models
};

// Generate Swagger spec
export const swaggerSpec = swaggerJsdoc(options);

// Log when Swagger spec is regenerated in development
if (NODE_ENV === NodeEnv.Development) {
  console.log('🔄 Swagger documentation updated');
  console.log(`📚 API Documentation available at ${API_URL}/api-docs`);
}

export const swaggerOptions: SwaggerOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    filter: true,
    deepLinking: true,
    displayRequestDuration: true,
    defaultModelsExpandDepth: 2,
    defaultModelExpandDepth: 2,
    docExpansion: 'none',
    tryItOutEnabled: true,
    syntaxHighlight: {
      theme: 'monokai',
      activate: true,
    },
  },
}; 