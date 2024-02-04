import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/config/db/schema.ts",
  out: "./.migrations",
  driver: "pg",
  breakpoints: true,
} satisfies Config;
