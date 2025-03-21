# Express TypeScript Starter Template

A production-ready Express.js API template with TypeScript, following best practices and modern development standards.

## Features

- 🚀 Express.js with TypeScript
- 📝 OpenAPI 3.0 / Swagger Documentation
- 🔒 Security best practices (Helmet, CORS, Rate Limiting)
- 🧪 Jest for testing
- 📦 ESLint + Prettier for code quality
- 🐳 Docker support
- 📝 Comprehensive documentation
- 🔄 Hot reload in development
- 🚀 Production-ready configuration

## Prerequisites

- Node.js 20.x (LTS)
- npm 10.x or higher
- Docker (optional)
- direnv (recommended for automatic Node.js version switching)

## Quick Start

### Using this Template

1. Click the green "Use this template" button at the top of this repository
2. Choose a name for your new repository
3. Choose whether to make it public or private
4. Click "Create repository from template"
5. Clone your new repository:
   ```bash
   git clone git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

### Using npm

1. Click the "Use this template" button on GitHub
2. Clone your new repository
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Using nvm (Node Version Manager)

If you use nvm, you can automatically switch to the correct Node.js version:

```bash
# Install nvm if you haven't already
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart your terminal, then:
nvm install    # Installs the version specified in .nvmrc
nvm use        # Switches to the version specified in .nvmrc
```

### Using direnv (Recommended)

direnv automatically switches Node.js version when you enter the project directory:

```bash
# Install direnv
# macOS
brew install direnv

# Linux
curl -sfL https://direnv.net/install.sh | bash

# Add to your shell (add to ~/.bashrc, ~/.zshrc, etc.)
eval "$(direnv hook bash)"  # for bash
eval "$(direnv hook zsh)"   # for zsh

# Allow direnv in this project
direnv allow

# Now when you cd into the project directory, it will automatically:
# 1. Switch to Node.js version from .nvmrc
# 2. Load environment variables from .env
```

### Using Docker

1. Development:
   ```bash
   docker-compose up
   ```

2. Production:
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Environment Variables

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
API_PREFIX=/api/v1
CORS_ORIGIN=*
```

## Documentation

- API Documentation: `http://localhost:3000/api-docs`
- Swagger UI: `http://localhost:3000/api-docs`

## Docker Configuration

The project includes Docker support with:

- Multi-stage builds for optimized production images
- Development and production docker-compose configurations
- Health checks for production services
- Volume mounts for development hot-reload
- Example configurations for additional services (Redis, etc.)

### Development with Docker

```bash
# Start development server
docker-compose up

# Rebuild and start
docker-compose up --build

# Stop all containers
docker-compose down
```

### Production Deployment

```bash
# Build and start production services
docker-compose -f docker-compose.prod.yml up --build

# Stop production services
docker-compose -f docker-compose.prod.yml down
```

## Contributing

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 