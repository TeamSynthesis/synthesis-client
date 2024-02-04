import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { DB_CONN_URL } from "$env/static/private";

const db = drizzle(neon(DB_CONN_URL));

export default db;
export type DB = typeof db;
