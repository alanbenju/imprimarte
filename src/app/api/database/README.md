# Database Management

## Overview

This project uses MikroORM with PostgreSQL as the database system. MikroORM is an Object-Relational Mapping (ORM) tool that provides entity mapping, migrations, and other features for working with databases.

## Entity Files

Entity definitions are located in their module directories:

- User entities: `src/app/api/modules/users/entities/`
- Store entities: `src/app/api/modules/store/entities/`

Each entity file defines the schema for a database table using TypeScript classes with decorators.

## Database Configuration

The database configuration is defined in `src/app/api/database/mikro-orm.config.ts` and uses the following environment variables:

- `MIKRO_ORM_HOST`: Database host (default: `localhost`)
- `MIKRO_ORM_PORT`: Database port (default: `5432`)
- `MIKRO_ORM_USER`: Database username (default: `postgres`)
- `MIKRO_ORM_PASSWORD`: Database password (default: `postgres`)
- `MIKRO_ORM_DB_NAME`: Database name (default: `customia`)

## Migrations

MikroORM supports database migrations to manage schema changes over time. Migrations are stored in `src/app/api/database/migrations/`.

### Creating Migrations

To create a new migration, use:

```bash
# Create a blank named migration
npm run migration:create -- --name=MigrationName --blank
```

This will create a file like `Migration20250322195342_MigrationName.ts` with `up()` and `down()` methods.

### Writing Migrations

Edit the migration file to include your schema changes:

```typescript
import { Migration } from "@mikro-orm/migrations";

export class Migration20250322195342_MigrationName extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      CREATE TABLE IF NOT EXISTS "your_table" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" varchar(255) NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT now()
      );
    `);
  }

  async down(): Promise<void> {
    this.addSql("DROP TABLE IF EXISTS \"your_table\";");
  }
}
```

### Running Migrations

Due to configuration issues with the MikroORM CLI in this project, we've implemented a custom script to run migrations directly:

```bash
# Run a specific migration
npm run migration:run MigrationName
```

For example:
```bash
npm run migration:run Migration20240525000000
```

This script:
1. Reads the migration file
2. Extracts SQL statements
3. Creates a temporary SQL file with a transaction
4. Executes the SQL using `psql`
5. Cleans up the temporary file

### Checking Migration Status

To check the applied migrations:

```bash
psql postgresql://postgres:postgres@localhost:5432/customia -c "SELECT * FROM mikro_orm_migrations"
```

## Database Operations

### Starting the Database

The project uses Docker Compose to run the database:

```bash
# Start the database
npm run docker:up

# Stop the database
npm run docker:down

# View database logs
npm run docker:logs
```

### Resetting the Database

To completely reset the database:

```bash
npm run db:fresh
```

This command drops the volumes and recreates them with a fresh database.

## Schema Updates Process

When making changes to the database schema, follow these steps:

1. Update the entity files with new fields/relationships
2. Create a migration with `npm run migration:create -- --name=AddNewField --blank`
3. Edit the migration file to include the necessary SQL statements
4. Run the migration with `npm run migration:run Migration12345_AddNewField`
5. Test that the changes work properly
6. Commit the entity and migration files

## Troubleshooting

### Common Errors

1. **Class constructor Migration cannot be invoked without 'new'**: This is a known issue with the MikroORM CLI in this project. Use the custom `migration:run` script instead.

2. **Column does not exist**: This indicates you need to create and run a migration for your schema changes.

3. **Connection refused**: Make sure the database is running with `npm run docker:up`.

### Executing Raw SQL

For debugging, you can execute raw SQL against the database:

```bash
psql postgresql://postgres:postgres@localhost:5432/customia -c "SELECT * FROM your_table"
```

## Best Practices

1. Always use migrations for schema changes, never modify the database directly
2. Keep entity definitions and database schema in sync
3. Include both `up()` and `down()` methods in migrations for reversibility
4. Test migrations in development before applying to production 