import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test environment
process.env.NODE_ENV = 'test';
process.env.PORT = '3001'; // Use different port for testing
process.env.API_URL = 'http://localhost:3001'; 