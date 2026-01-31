# Database Migrations

This directory contains SQL migration files for the database schema.

## Migration Files

Migration files are numbered sequentially and should follow this naming convention:
```
XXX_description.sql
```

Where:
- `XXX` is a zero-padded sequential number (001, 002, 003, etc.)
- `description` is a brief description of what the migration does

## Current Migrations

- **001_initial_schema.sql** - Creates initial database schema with bank_user and tokens tables

## Running Migrations

From the server directory:

```bash
# Run all pending migrations
yarn migrate

# Check migration status
yarn migrate:status
```

## Creating New Migrations

1. Create a new file in this directory with the next sequential number
2. Write your SQL statements (prefer idempotent operations using IF NOT EXISTS)
3. Run `yarn migrate` to apply the migration

Example:
```sql
-- 002_add_transactions_table.sql
CREATE TABLE IF NOT EXISTS transactions(
  transaction_id BIGSERIAL PRIMARY KEY NOT NULL,
  userid BIGSERIAL NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  transaction_type VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(userid) REFERENCES bank_user(userid) ON DELETE CASCADE
);
```

## Best Practices

1. Always use `IF NOT EXISTS` to make migrations idempotent
2. Include descriptive comments in migration files
3. Test migrations in development before applying to production
4. Keep migrations small and focused on a single change
5. Never modify existing migration files once they've been applied
6. Use transactions (BEGIN/COMMIT) for complex multi-step migrations

## Migration Tracking

Migrations are tracked in the `schema_migrations` table, which is automatically created when you run the first migration. This table records which migrations have been applied and when.
