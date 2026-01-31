# Database Migration Guide

## Overview

This fullstack banking application uses PostgreSQL as its database. This guide explains how to set up and migrate the database for development and production environments.

## Database Schema

The application uses two main tables:
- **bank_user**: Stores user account information
- **tokens**: Stores authentication tokens for user sessions

## Migration Methods

### Method 1: Manual SQL Execution (Current Method)

This is the simplest method for initial setup or small projects.

#### Prerequisites
- PostgreSQL installed and running
- psql command-line tool available

#### Steps

1. **Start PostgreSQL service**
   ```bash
   # On Linux/Mac
   sudo service postgresql start
   
   # On Mac with Homebrew
   brew services start postgresql
   
   # On Windows
   # Start from Services or PostgreSQL application
   ```

2. **Access PostgreSQL**
   ```bash
   psql -U postgres
   ```

3. **Run the migration script**
   ```bash
   psql -U postgres -f server/scripts.sql
   ```
   
   Or from within psql:
   ```sql
   \i server/scripts.sql
   ```

4. **Verify the migration**
   ```sql
   \c bank_account
   \dt
   ```
   
   You should see two tables: `bank_user` and `tokens`

5. **Update database credentials**
   
   Edit `server/db/connect.js` with your PostgreSQL credentials:
   ```javascript
   const pool = new Pool({
     user: 'your_postgres_username',
     password: 'your_postgres_password',
     host: 'localhost',
     port: 5432,
     database: 'bank_account'
   });
   ```

### Method 2: Using Environment Variables (Recommended)

For better security and flexibility, use environment variables.

1. **Update server/db/connect.js** to read from environment variables

2. **Create/Update server/.env file**
   ```env
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=bank_account
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   ```

3. **Run the migration script**
   ```bash
   psql -U postgres -f server/scripts.sql
   ```

### Method 3: Programmatic Migration (For Production)

Use the migration runner script for automated deployments.

1. **Run the migration script**
   ```bash
   cd server
   npm run migrate
   ```

2. **Check migration status**
   ```bash
   npm run migrate:status
   ```

## Database Schema Details

### bank_user table
```sql
CREATE TABLE bank_user(
  userid BIGSERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(32) NOT NULL,
  last_name VARCHAR(32) NOT NULL,
  email VARCHAR(32) NOT NULL,
  password VARCHAR(255) NOT NULL,
  unique(email)
);
```

### tokens table
```sql
CREATE TABLE TOKENS(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  access_token VARCHAR(500) NOT NULL,
  userid BIGSERIAL NOT NULL,
  FOREIGN KEY(userid) REFERENCES bank_user(userid)
);
```

## Migration for Different Environments

### Development Environment
```bash
# Use default credentials from scripts.sql
psql -U postgres -f server/scripts.sql
```

### Production Environment
```bash
# Use environment-specific credentials
PGPASSWORD=prod_password psql -U prod_user -h prod_host -f server/scripts.sql
```

### Docker Environment
```bash
# Run migration inside Docker container
docker exec -i postgres_container psql -U postgres < server/scripts.sql
```

## Troubleshooting

### Database already exists
If you see "database already exists" error:
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Drop existing database (WARNING: This deletes all data)
DROP DATABASE IF EXISTS bank_account;

-- Then run migration script again
\i server/scripts.sql
```

### Permission denied
If you get permission errors:
```sql
-- Grant permissions to your user
GRANT ALL PRIVILEGES ON DATABASE bank_account TO your_username;
```

### Connection refused
If you can't connect to PostgreSQL:
1. Verify PostgreSQL is running: `sudo service postgresql status`
2. Check PostgreSQL is listening on port 5432: `netstat -an | grep 5432`
3. Verify pg_hba.conf allows local connections

## Rolling Back Changes

To rollback the database:
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Drop database
DROP DATABASE IF EXISTS bank_account;

-- Recreate empty database
CREATE DATABASE bank_account;
```

## Adding New Migrations

When you need to modify the database schema:

1. **Create a new migration file** in `server/migrations/` directory
   - Name format: `XXX_description.sql` (e.g., `002_add_account_table.sql`)

2. **Write the migration SQL**
   ```sql
   -- server/migrations/002_add_account_table.sql
   CREATE TABLE account(
     account_id BIGSERIAL PRIMARY KEY NOT NULL,
     userid BIGSERIAL NOT NULL,
     balance DECIMAL(15,2) DEFAULT 0.00,
     FOREIGN KEY(userid) REFERENCES bank_user(userid)
   );
   ```

3. **Run the new migration**
   ```bash
   psql -U postgres -d bank_account -f server/migrations/002_add_account_table.sql
   ```

## Best Practices

1. **Always backup** before running migrations in production
   ```bash
   pg_dump -U postgres bank_account > backup_$(date +%Y%m%d).sql
   ```

2. **Test migrations** in development environment first

3. **Use transactions** for complex migrations
   ```sql
   BEGIN;
   -- your migration SQL here
   COMMIT;
   -- Use ROLLBACK; if something goes wrong
   ```

4. **Document all schema changes** in migration files with comments

5. **Keep migrations in version control** to track database evolution

6. **Use environment variables** for credentials (never hardcode)

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL Command Line Tools](https://www.postgresql.org/docs/current/app-psql.html)
- [Database Migration Best Practices](https://www.postgresql.org/docs/current/backup.html)
