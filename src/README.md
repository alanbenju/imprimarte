# Project Structure

This project follows a modular architecture to organize code in a maintainable and scalable way.

## Directory Structure

- `/modules` - Contains feature modules separated by domain
  - `/users` - User management, authentication, and authorization
    - `/controllers` - API route handlers and request/response management
    - `/services` - Business logic and operations
    - `/repositories` - Data access layer for the users domain
    - `/entities` - MikroORM entity definitions
  - `/store` - Store and product management
    - `/controllers` - API route handlers for store operations
    - `/services` - Store-related business logic
    - `/repositories` - Data access for store entities
    - `/entities` - MikroORM entity definitions for store domain
- `/database` - Database connection and migration management
  - `/migrations` - MikroORM migrations
  - `connection.ts` - MikroORM connection management
  - `mikro-orm.config.ts` - MikroORM configuration

## Layers

1. **Entities** - Database models using MikroORM
2. **Repositories** - Data access layer with CRUD operations
3. **Services** - Business logic layer
4. **Controllers** - API endpoints and route handlers

## MikroORM Commands

MikroORM is used for database management. Here are some useful commands:

```bash
# Create a migration
npm run migration:create

# Apply pending migrations
npm run migration:up

# Revert the last migration
npm run migration:down

# Fresh database schema (drops everything and recreates)
npm run schema:fresh
```

## Development

To start the development server:

```bash
npm run dev
``` 