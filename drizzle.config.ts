import './src/server/envConfig.ts'; // Updated to use relative path
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/server/db/schema.ts', // Ensure this path is also correct
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  tablesFilter: ['usthbclassroom*'],
  out: './src/server/db/queries.ts', // Adjusted for relative path
  migrations: {
    table: "migrations",
    schema: "public"
  }
});
