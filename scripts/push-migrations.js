import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import dotenv from "dotenv";
dotenv.config();

async function main() {
  const db = drizzle(neon(process.env.DB_CONN_URL));

  console.log("Running migrations. Please wait");
  await migrate(db, { migrationsFolder: "./.migrations" });
  console.log("Migrated successfully");

  process.exit(0);
}

main().catch((e) => {
  console.error("Migration failed");
  console.error(e);
  process.exit(1);
});
