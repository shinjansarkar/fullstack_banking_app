const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'bank_account'
});

// Create migrations tracking table
async function createMigrationsTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id SERIAL PRIMARY KEY,
      version VARCHAR(255) NOT NULL UNIQUE,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  
  try {
    await pool.query(query);
    console.log('✓ Migrations table ready');
  } catch (error) {
    console.error('Error creating migrations table:', error.message);
    throw error;
  }
}

// Get list of applied migrations
async function getAppliedMigrations() {
  try {
    const result = await pool.query(
      'SELECT version FROM schema_migrations ORDER BY version'
    );
    return result.rows.map(row => row.version);
  } catch (error) {
    console.error('Error fetching applied migrations:', error.message);
    return [];
  }
}

// Get list of migration files
function getMigrationFiles() {
  const migrationsDir = path.join(__dirname, 'migrations');
  
  if (!fs.existsSync(migrationsDir)) {
    console.log('No migrations directory found');
    return [];
  }
  
  return fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort();
}

// Run a single migration
async function runMigration(filename) {
  const filePath = path.join(__dirname, 'migrations', filename);
  const sql = fs.readFileSync(filePath, 'utf8');
  
  try {
    // Start transaction
    await pool.query('BEGIN');
    
    // Execute migration
    await pool.query(sql);
    
    // Record migration
    await pool.query(
      'INSERT INTO schema_migrations (version) VALUES ($1)',
      [filename]
    );
    
    // Commit transaction
    await pool.query('COMMIT');
    
    console.log(`✓ Applied migration: ${filename}`);
    return true;
  } catch (error) {
    // Rollback on error
    await pool.query('ROLLBACK');
    console.error(`✗ Failed to apply migration: ${filename}`);
    console.error(`  Error: ${error.message}`);
    throw error;
  }
}

// Run all pending migrations
async function migrate() {
  try {
    console.log('Starting database migration...\n');
    
    // Ensure migrations table exists
    await createMigrationsTable();
    
    // Get applied and available migrations
    const appliedMigrations = await getAppliedMigrations();
    const migrationFiles = getMigrationFiles();
    
    // Find pending migrations
    const pendingMigrations = migrationFiles.filter(
      file => !appliedMigrations.includes(file)
    );
    
    if (pendingMigrations.length === 0) {
      console.log('✓ No pending migrations. Database is up to date.\n');
      return;
    }
    
    console.log(`Found ${pendingMigrations.length} pending migration(s):\n`);
    pendingMigrations.forEach(file => console.log(`  - ${file}`));
    console.log('');
    
    // Run each pending migration
    for (const migration of pendingMigrations) {
      await runMigration(migration);
    }
    
    console.log('\n✓ All migrations completed successfully!\n');
  } catch (error) {
    console.error('\n✗ Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Show migration status
async function status() {
  try {
    console.log('Migration Status\n');
    console.log('─'.repeat(60));
    
    // Ensure migrations table exists
    await createMigrationsTable();
    
    const appliedMigrations = await getAppliedMigrations();
    const migrationFiles = getMigrationFiles();
    
    console.log(`\nTotal migrations available: ${migrationFiles.length}`);
    console.log(`Migrations applied: ${appliedMigrations.length}`);
    console.log(`Pending migrations: ${migrationFiles.length - appliedMigrations.length}\n`);
    
    if (migrationFiles.length === 0) {
      console.log('No migration files found.\n');
      return;
    }
    
    console.log('Migration Files:\n');
    migrationFiles.forEach(file => {
      const isApplied = appliedMigrations.includes(file);
      const status = isApplied ? '✓ Applied' : '○ Pending';
      console.log(`  ${status}  ${file}`);
    });
    console.log('');
  } catch (error) {
    console.error('Error checking migration status:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Main execution
const command = process.argv[2];

switch (command) {
  case 'up':
  case 'run':
    migrate();
    break;
  case 'status':
    status();
    break;
  default:
    console.log('Usage: node migrate.js [command]');
    console.log('');
    console.log('Commands:');
    console.log('  up, run    Run all pending migrations');
    console.log('  status     Show migration status');
    console.log('');
    process.exit(0);
}
