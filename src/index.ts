import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import favicon from 'serve-favicon';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import healthRouter from './routes/health';
import { corsOptions } from './config/cors';
import { rateLimitConfig } from './config/rateLimit'
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { requestLogger } from './middleware/requestLogger';
import { validateRequest } from './middleware/validateRequest';
import { apiRoutes } from './routes';
import { NodeEnv } from './types/environment';

// Load environment variables
dotenv.config();

export const app: Express = express();
const port = process.env.PORT || 3000;
const apiPrefix = process.env.API_PREFIX || '/api/v1';
const isProduction = process.env.NODE_ENV === NodeEnv.Production;

// Trust proxy if behind a reverse proxy (like nginx)
if (isProduction) {
  app.set('trust proxy', 1);
}

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(requestLogger);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"], // Needed for Swagger UI
      styleSrc: ["'self'", "'unsafe-inline'"], // Needed for Swagger UI
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false, // Needed for Swagger UI
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Needed for Swagger UI
  strictTransportSecurity: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  }
}));

// Logging
if (isProduction) {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Static files and favicon
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../public')));

// Rate limiting
const limiter = rateLimit(rateLimitConfig);
app.use(limiter);

// Request validation
app.use(validateRequest);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
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
}));

/**
 * @swagger
 * /:
 *   get:
 *     operationId: getRoot
 *     summary: Root endpoint
 *     description: Returns welcome message and API documentation link
 *     tags: [Root]
 *     responses:
 *       200:
 *         description: Welcome message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Welcome to Express TypeScript API
 *                 documentation:
 *                   type: string
 *                   example: /api-docs
 */
app.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Welcome to Express TypeScript API',
    documentation: `/api-docs`
  });
});

// API routes
app.use('/health', healthRouter);
app.use('/api', apiRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server only if not in test environment
if (process.env.NODE_ENV !== NodeEnv.Test) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`API prefix: ${apiPrefix}`);
    console.log(`Environment: ${process.env.NODE_ENV || NodeEnv.Development}`);
    console.log(`API Documentation available at http://localhost:${port}/api-docs`);
  });
} 