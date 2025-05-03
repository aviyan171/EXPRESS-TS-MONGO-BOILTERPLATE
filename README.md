# Express TypeScript MongoDB Boilerplate

A modern, production-ready boilerplate for Node.js applications using Express, TypeScript, MongoDB, and Biome.

## Features

- 🚀 **Express.js** - Fast, unopinionated web framework
- 📘 **TypeScript** - Type safety and modern JavaScript features
- 🍃 **MongoDB** with Mongoose - Robust database integration
- 🛡️ **Biome** - Modern JavaScript/TypeScript toolchain
- 🔒 **Helmet** - Security middleware
- 📝 **Winston** - Logging
- ✨ **CORS** - Cross-Origin Resource Sharing
- 🔄 **Nodemon** - Development auto-reload
- 🌍 **Environment Variables** - Configuration management
- 🚦 **Error Handling** - Centralized error handling
- 🧪 **Type-safe** - Strict TypeScript configuration

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd express-ts-mongo-boilerplate
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   cp .env.example .env
   ```

   Update the environment variables in `.env` with your configuration.

4. Start development server:

   ```bash
   npm run dev
   ```

5. Build for production:

   ```bash
   npm run build
   ```

6. Start production server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm run check` - Run Biome checks and auto-fix

## Project Structure

```
.
├── src/
│   ├── index.ts              # Application entry point
│   ├── routes/              # Route definitions
│   ├── middleware/          # Custom middleware
│   ├── models/             # Mongoose models
│   ├── controllers/        # Route controllers
│   ├── services/          # Business logic
│   └── utils/             # Utility functions
│   └── types/             # TypeScript type definitions
│   └── interfaces/        # Interface definitions
│   └── repositories/      # Repository definitions
│   └── config/            # Configuration
│   └── enums/             # Enums
│   └── constants/         # Constants
│   └── validations/       # Validation schemas
├── dist/                  # Compiled JavaScript
├── logs/                  # Application logs
├── .env                   # Environment variables
├── .env.example          # Environment variables example
├── tsconfig.json         # TypeScript configuration
├── biome.json           # Biome configuration
└── package.json         # Project dependencies
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/protected` - Example protected route

## Error Handling

The application includes a centralized error handling system. Custom errors can be thrown using the `AppError` class:

```typescript
throw new AppError(statusCode, message)
```

## Logging

Winston is configured for logging. Logs are written to:

- Console (all levels)
- `logs/error.log` (error level)
- `logs/combined.log` (all levels)

## Security

- Helmet.js is configured for security headers
- CORS is enabled and configurable
- Environment variables for sensitive data
- Type-safe code with strict TypeScript settings

## License

ISC
