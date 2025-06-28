# Database Management Guide

## Overview

This project uses MikroORM with PostgreSQL as the database system. Entity definitions are located in their respective module folders.

## Entity Structure

Entities are defined in TypeScript classes with decorators that define their schema:
- User entities: `src/app/api/modules/users/entities/`
- Store entities: `src/app/api/modules/store/entities/`

## Database Updates and Migrations

**Important**: MikroORM does not automatically update your database schema from entity definitions in production environments. This is by design for safety reasons.

### Option 1: Using Direct SQL (Quick Method)

For quick updates during development, you can directly run SQL commands:

```bash
# Connect to the database and run SQL
psql postgresql://postgres:postgres@localhost:5432/customia -c "ALTER TABLE \"company_store\" ADD COLUMN IF NOT EXISTS \"product_text_color\" varchar(255) DEFAULT '#333333';"
```

### Option 2: MikroORM Migrations (Recommended for Production)

For production environments, use the migration system:

1. Update entity files with new fields/relationships
2. Generate a migration
3. Review the migration
4. Apply the migration
5. Deploy the code

## Migration Issues and Solutions

### Current Issues

The project has encountered the following issues with MikroORM:

1. The `ensureIndexes` and `implicitTransactions` options are not supported by PostgreSQL driver and have been removed from the config.
2. The migration CLI tool has some issues with the project's TypeScript configuration.

### Temporary Solution

Until the migration system is fully integrated:

1. Write the SQL migrations manually in `src/app/api/database/migrations/` files.
2. Run the SQL directly against the database.
3. Track applied migrations manually.

### Future Work

- Set up proper MikroORM CLI configuration
- Integrate the migration system with the CI/CD pipeline
- Create a standardized process for database changes

## Best Practices

1. **Never modify the database directly** in production
2. Always use migrations for schema changes in production
3. Test migrations in development before applying to production
4. Include both `up()` and `down()` methods in migrations for rollback capability
5. Keep your entity definitions and database schema in sync

## Troubleshooting

### Common Errors

1. **EntityNotFound**: Check that you're importing entities correctly in your repositories
2. **Column does not exist**: Indicates a migration is needed for schema changes
3. **Migration failed**: Check that your database connection works
4. **This method is not supported by PostgreSqlDriver driver**: Remove unsupported options from MikroORM config

## Verifying Database Schema

```bash
# List all columns in a table
psql postgresql://postgres:postgres@localhost:5432/customia -c "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'company_store' ORDER BY ordinal_position;"

# Check for specific columns
psql postgresql://postgres:postgres@localhost:5432/customia -t -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'company_store' AND column_name = 'product_text_color';"
```

## Development Setup

For local development:

```bash
# Start the database with Docker
npm run docker:up

# Apply migrations
npm run migration:up

# Reset database (development only)
npm run schema:fresh
``` 