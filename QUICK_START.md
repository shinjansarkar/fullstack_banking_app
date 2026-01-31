# Quick Migration Reference

## ✅ YES - This project has data migration!

### What is available?

1. **Manual SQL Scripts** (`server/scripts.sql`)
   - Traditional SQL file for initial database setup
   - Creates database and tables from scratch

2. **Automated Migration System** (`server/migrate.js`)
   - Tracks which migrations have been applied
   - Runs pending migrations automatically
   - Migration files located in `server/migrations/`

3. **Environment Variable Support**
   - Database credentials configurable via `.env` file
   - No need to hardcode credentials

## How to Migrate Data

### First Time Setup (New Installation)

```bash
# 1. Create the database
psql -U postgres -c "CREATE DATABASE bank_account;"

# 2. Configure credentials
cd server
cp .env.example .env
# Edit .env with your credentials

# 3. Install dependencies
yarn install

# 4. Run migrations
yarn migrate
```

### Checking Migration Status

```bash
cd server
yarn migrate:status
```

### Manual Method (Alternative)

```bash
# Run the SQL script directly
psql -U postgres -f server/scripts.sql
```

## Database Tables

After migration, you will have:

1. **bank_user** - User accounts
   - userid (Primary Key)
   - first_name, last_name
   - email (Unique)
   - password (Hashed)

2. **tokens** - Authentication tokens
   - id (Primary Key)
   - access_token
   - userid (Foreign Key)

3. **schema_migrations** - Migration tracking (auto-created)
   - Tracks which migrations have been applied

## For More Details

- See [MIGRATION.md](MIGRATION.md) for comprehensive migration guide
- See [README.md](README.md) for full project setup
- See [server/migrations/README.md](server/migrations/README.md) for creating new migrations

## Common Commands

```bash
# Check database exists
psql -U postgres -l

# Connect to database
psql -U postgres -d bank_account

# View tables
psql -U postgres -d bank_account -c "\dt"

# Run migrations
cd server && yarn migrate

# Check migration status  
cd server && yarn migrate:status

# Start server
cd server && yarn start
```
