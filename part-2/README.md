# Social API Platform

A modern REST API built with Elysia, Bun, PostgreSQL, and Drizzle ORM for managing users, posts, and comments. The application follows clean architecture principles and includes comprehensive testing.

## Features

- 🚀 **High Performance**: Built on Bun runtime with Elysia.js for maximum performance
- 🔐 **Authentication**: JWT-based authentication system
- 📊 **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- 📝 **API Documentation**: Swagger documentation included
- 🔍 **Observability**: OpenTelemetry integration with Jaeger for tracing
- 🧪 **Testing**: Comprehensive unit and E2E tests
- 🐳 **Docker**: Easy deployment with Docker Compose

## Tech Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Elysia.js](https://elysiajs.com/)
- **Database**: PostgreSQL
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: JWT
- **Logging**: Pino
- **Testing**: Bun's built-in test runner
- **Tracing**: OpenTelemetry with Jaeger
- **Documentation**: Swagger
- **Container**: Docker

## Project Structure

The project follows a clean architecture approach with a modular design:

```
src/
├── core/                 # Core functionality and infrastructure
│   ├── application/      # Application services and middleware
│   ├── errors/           # Custom error classes
│   ├── infrastructure/   # Database, JWT, and logging infrastructure
│   ├── presentation/     # DTOs and response models
│   └── setup/            # Application setup and configuration
└── modules/              # Feature modules
    ├── auth/             # Authentication module
    ├── comment/          # Comment management
    ├── post/             # Post management
    ├── post-comment/     # Post-comment relationships
    └── user/             # User management
```

Each module follows a similar structure:

```
module/
├── application/          # Application services
├── domain/               # Domain logic
├── infrastructure/       # Database schemas and repositories
└── presentation/         # Controllers, DTOs, and input models
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.2.0 or higher)
- [Docker](https://www.docker.com/) and Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd part-2
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the infrastructure services (PostgreSQL and Jaeger):
   ```bash
   docker-compose -f docker-compose.infrastructure.yml up -d
   ```

4. Seed the database with initial data:
   ```bash
   bun run db:seed
   ```

5. Start the development server:
   ```bash
   bun run dev
   ```

The API will be available at http://localhost:3000

### Using Docker

To run the entire application stack with Docker:

```bash
docker-compose up -d
```

This will start the application, PostgreSQL database, run migrations, seed the database, and start Jaeger for observability.

## API Documentation

Swagger documentation is available at http://localhost:3000/swagger when the application is running.

### Available Endpoints

- **Authentication**: `/api/v1/auth`
  - `GET /me`: Get information about current user
  - `POST /register`: Register a new account
  - `POST /login`: Login and receive a JWT token

- **Users**: `/api/v1/users`
  - `GET /`: Get all users
  - `GET /:id`: Get user by ID
  - `POST /`: Create a new user
  - `PUT /:id`: Update a user
  - `PATCH /:id`: Update a user (partial)
  - `DELETE /:id`: Delete a user

- **Posts**: `/api/v1/posts`
  - `GET /`: Get all posts
  - `GET /:id`: Get post by ID
  - `POST /`: Create a new post
  - `PUT /:id`: Update a post
  - `PATCH /:id`: Update a post (partial)
  - `DELETE /:id`: Delete a post

- **Comments**: `/api/v1/comments`
  - `GET /`: Get all comments
  - `GET /:id`: Get comment by ID
  - `POST /`: Create a new comment
  - `PUT /:id`: Update a comment
  - `PATCH /:id`: Update a comment (partial)
  - `DELETE /:id`: Delete a comment

- **Post Comments**: `/api/v1/posts/:postId/comments`
  - `GET /`: Get all comments for a specific post

## Development

### Available Scripts

- `bun run dev`: Start the development server with hot reloading
- `bun run db:generate`: Generate new Drizzle migrations
- `bun run db:migrate`: Run all pending Drizzle migrations
- `bun run db:seed`: Seed the database with initial data
- `bun run lint`: Run ESLint to check for code quality issues
- `bun run lint:fix`: Automatically fix ESLint issues
- `bun run format`: Format code with Prettier
- `bun run test:unit`: Run unit tests
- `bun run test:e2e`: Run end-to-end tests
- `bun run typecheck`: Check TypeScript types

### Testing

The project includes both unit and end-to-end tests:

- Unit tests focus on testing individual components in isolation
- E2E tests verify the integrated functionality of the entire application

Run the tests with:

```bash
# Run unit tests
bun run test:unit

# Run end-to-end tests
bun run test:e2e
```

### Database Migrations

To make changes to the database schema:

1. Update the schema files in `src/modules/*/infrastructure/schemas`
2. Run `bun run db:generate` to create a new migration
3. Run `bun run db:migrate` to apply the migration to the database

### Observability

The application includes OpenTelemetry integration with Jaeger for distributed tracing.
Access the Jaeger UI at [http://localhost:16686](http://localhost:16686) when the application is running.

## Docker Configuration

The project includes several Docker Compose files:

- `docker-compose.yml`: Main configuration for running the complete application
- `docker-compose.infrastructure.yml`: Configuration for infrastructure services (PostgreSQL, Jaeger)
- `docker-compose.e2e.yml`: Configuration for running end-to-end tests
