const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
// Add ts-node registration to handle TypeScript files
require("ts-node").register({
  transpileOnly: true,
  compilerOptions: {
    module: "commonjs",
  }
});
require("dotenv").config();

// Database connection parameters
const dbConfig = {
  host: process.env.MIKRO_ORM_HOST || "localhost",
  port: process.env.MIKRO_ORM_PORT || 5432,
  database: process.env.MIKRO_ORM_DB_NAME || "customia",
  user: process.env.MIKRO_ORM_USER || "postgres",
  password: process.env.MIKRO_ORM_PASSWORD || "postgres"
};

/**
 * Gets all migrations from the migrations directory
 * @returns {Promise<Array<{name: string, path: string}>>} Array of migration objects
 */
async function getAllMigrations() {
  const migrationsDir = path.join(
    process.cwd(),
    "src/app/api/database/migrations"
  );
  
  const files = fs.readdirSync(migrationsDir);
  const migrations = files
    .filter(file => file.startsWith("Migration") && file.endsWith(".ts"))
    .map(file => ({
      name: path.basename(file, ".ts"),
      path: path.join(migrationsDir, file)
    }));
  
  return migrations;
}

/**
 * Gets executed migrations from the database
 * @returns {Promise<Array<string>>} Array of executed migration names
 */
async function getExecutedMigrations() {
  return new Promise((resolve, reject) => {
    const psqlArgs = [
      `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
      "-c", "SELECT name FROM mikro_orm_migrations"
    ];
    
    let output = "";
    const psql = spawn("psql", psqlArgs);
    
    psql.stdout.on("data", (data) => {
      output += data.toString();
    });
    
    psql.on("error", (error) => {
      reject(error);
    });
    
    psql.on("close", (code) => {
      if (code === 0) {
        // Parse the output to extract migration names
        const lines = output.split("\n").slice(2); // Skip header and divider line
        const migrations = lines
          .filter(line => line.trim().length > 0)
          .map(line => line.trim());
        
        resolve(migrations);
      } else {
        reject(new Error(`Failed to get executed migrations, exit code: ${code}`));
      }
    });
  });
}

/**
 * Gets pending migrations that need to be executed
 * @returns {Promise<Array<{name: string, path: string}>>} Array of pending migration objects
 */
async function getPendingMigrations() {
  try {
    const allMigrations = await getAllMigrations();
    const executedMigrations = await getExecutedMigrations();
    
    const pendingMigrations = allMigrations.filter(
      migration => !executedMigrations.includes(migration.name)
    );
    
    return pendingMigrations;
  } catch (error) {
    console.error("Error getting pending migrations:", error);
    process.exit(1);
  }
}

/**
 * Runs a specific migration
 * 
 * @param {string} migrationName - Name of the migration file (without extension)
 * @param {string} migrationFilePath - Path to the migration file
 */
async function runMigration(migrationName, migrationFilePath) {
  // Read the migration file
  const migrationSource = fs.readFileSync(migrationFilePath, "utf8");
  
  // Extract up SQL queries
  const upMatches = migrationSource.match(/async up\(\)[\s\S]*?{([\s\S]*?)}/);
  if (!upMatches || !upMatches[1]) {
    console.error(`Could not find up() method in migration file: ${migrationName}`);
    return false;
  }
  
  const upMethodBody = upMatches[1];
  const sqlCommands = [];
  
  // Extract SQL commands from this.addSql() calls
  const sqlRegex = /this\.addSql\((["'`])([\s\S]*?)\1\)/g;
  let match;
  
  while ((match = sqlRegex.exec(upMethodBody)) !== null) {
    sqlCommands.push(match[2]);
  }
  
  if (sqlCommands.length === 0) {
    console.error(`No SQL commands found in migration file: ${migrationName}`);
    return false;
  }
  
  // Create a temporary SQL file with the migration
  const tempSqlPath = path.join(
    process.cwd(),
    "src/app/api/database/migrations",
    `${migrationName}_temp.sql`
  );
  
  // Prepare transaction SQL
  const transactionSql = [
    "-- Start transaction",
    "BEGIN;",
    "",
    ...sqlCommands,
    "",
    "-- Insert into migrations table to track that this was executed",
    "INSERT INTO mikro_orm_migrations (name, executed_at)",
    `VALUES ('${migrationName}', NOW())`,
    "ON CONFLICT DO NOTHING;",
    "",
    "-- Commit transaction",
    "COMMIT;"
  ].join("\n");
  
  // Write the SQL file
  fs.writeFileSync(tempSqlPath, transactionSql);
  console.log(`Created temporary SQL file for: ${migrationName}`);
  
  // Run the SQL file with psql
  return new Promise((resolve, reject) => {
    const psqlArgs = [
      `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
      "-f", tempSqlPath
    ];
    
    console.log(`Running migration: ${migrationName}`);
    
    // Execute the psql command
    const psql = spawn("psql", psqlArgs);
    
    let stdoutData = "";
    let stderrData = "";
    
    psql.stdout.on("data", (data) => {
      const output = data.toString();
      stdoutData += output;
      process.stdout.write(data);
    });
    
    psql.stderr.on("data", (data) => {
      const output = data.toString();
      stderrData += output;
      process.stderr.write(data);
    });
    
    psql.on("close", (code) => {
      // Clean up temp file
      if (fs.existsSync(tempSqlPath)) {
        fs.unlinkSync(tempSqlPath);
      }
      
      // Check for rollback or error messages
      const hasRollback = stdoutData.includes("ROLLBACK") || stderrData.includes("ROLLBACK");
      const hasError = stderrData.includes("ERROR") || stderrData.includes("error:");
      
      if (code === 0 && !hasRollback && !hasError) {
        console.log(`Migration ${migrationName} executed successfully`);
        resolve(true);
      } else {
        console.error(`Migration ${migrationName} failed`);
        if (hasRollback) {
          console.error("Transaction was rolled back");
        }
        // Reject instead of resolving with false, to stop the migration process
        reject(new Error(`Migration ${migrationName} failed and was rolled back`));
      }
    });
  });
}

/**
 * Main function to run all pending migrations
 */
async function runPendingMigrations() {
  try {
    const pendingMigrations = await getPendingMigrations();
    
    if (pendingMigrations.length === 0) {
      console.log("No pending migrations to execute.");
      return;
    }
    
    console.log(`Found ${pendingMigrations.length} pending migrations:`);
    pendingMigrations.forEach(migration => {
      console.log(`- ${migration.name}`);
    });
    
    // Execute migrations in sequence
    let successCount = 0;
    for (const migration of pendingMigrations) {
      try {
        const success = await runMigration(migration.name, migration.path);
        successCount++;
      } catch (error) {
        console.error(`\nMigration process stopped due to error: ${error.message}`);
        process.exit(1);
      }
    }
    
    console.log(`\nMigration summary: ${successCount}/${pendingMigrations.length} migrations applied successfully.`);
  } catch (error) {
    console.error("Error running pending migrations:", error);
    process.exit(1);
  }
}

// Check if a specific migration was requested
const specificMigration = process.argv[2];
if (specificMigration) {
  // Backward compatibility: Run a specific migration
  const migrationFilePath = path.join(
    process.cwd(),
    "src/app/api/database/migrations",
    `${specificMigration}.ts`
  );
  
  // Check if migration file exists
  if (!fs.existsSync(migrationFilePath)) {
    console.error(`Migration file not found: ${migrationFilePath}`);
    process.exit(1);
  }
  
  runMigration(specificMigration, migrationFilePath);
} else {
  // Run all pending migrations
  runPendingMigrations();
} 