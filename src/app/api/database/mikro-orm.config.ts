import { defineConfig } from "@mikro-orm/postgresql";
import { User } from "../users/entities/user.entity";
import { CompanyStore } from "../store/entities/company-store.entity";
import { BaseProduct } from "../store/entities/base-product.entity";
import { ProductImageDetails, StoreProduct } from "../store/entities/store-product.entity";
import { LoadStrategy, MetadataProvider } from "@mikro-orm/core";
import { TSMigrationGenerator } from "@mikro-orm/migrations";
import { Migrator } from "@mikro-orm/migrations";
import { Utils } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import path from "path";

// Use absolute paths for better reliability
const baseDir = process.cwd();
const getPath = (relativePath: string) => path.join(baseDir, relativePath);

export default defineConfig({
  extensions: [Migrator],

  // Use environment variables with fallbacks
  dbName: process.env.MIKRO_ORM_DB_NAME || "customia",
  host: process.env.MIKRO_ORM_HOST || "localhost",
  port: Number(process.env.MIKRO_ORM_PORT) || 5432,
  user: process.env.MIKRO_ORM_USER || "postgres",
  password: process.env.MIKRO_ORM_PASSWORD || "postgres",
  
  // Use TsMorphMetadataProvider for better TypeScript support
  metadataProvider: TsMorphMetadataProvider,
  
  // Entity configuration
  // Directly reference the entities to avoid dynamic imports
  entities: [
    User, 
    CompanyStore, 
    BaseProduct, 
    StoreProduct,
    ProductImageDetails
  ],
  
  // Additional discovery settings for TS files
  discovery: {
    warnWhenNoEntities: true,
    requireEntitiesArray: true, // Require explicit entity references
    alwaysAnalyseProperties: true,
    disableDynamicFileAccess: true, // Disable dynamic file loading
  },
  
  loadStrategy: LoadStrategy.JOINED,
  debug: process.env.NODE_ENV !== "production",
  
  schemaGenerator: {
    createForeignKeyConstraints: true,
    disableForeignKeys: false,
  },
  
  // Migration configuration
  migrations: {
    path: Utils.detectTsNode() ? "src/app/api/database/migrations" : "dist/app/api/database/migrations",
    glob: "!(*.d).{js,ts}",
    emit: "ts",
    snapshot: true,
    safe: true,
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: false,
    generator: TSMigrationGenerator
  },
  
  allowGlobalContext: true,
  seeder: {
    path: "./src/app/api/database/seeders",
    pathTs: "./src/app/api/database/seeders",
    defaultSeeder: "DatabaseSeeder",
    glob: "!(*.d).{js,ts}",
    emit: "ts",
    fileName: (className: string) => className,
  }
}); 