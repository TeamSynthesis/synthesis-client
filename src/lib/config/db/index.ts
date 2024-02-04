import { neon, Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as _drizzle } from "drizzle-orm/neon-serverless";
import { WebSocket } from "undici";
neonConfig.webSocketConstructor = WebSocket;

import { DB_CONN_URL } from "$env/static/private";

const db = drizzle(neon(DB_CONN_URL));

const getPooledConnection = () => {
  const pool = new Pool({ connectionString: DB_CONN_URL });
  pool.connect();
  return {
    pool,
    db: _drizzle(pool),
  };
};

type DB = typeof db;
type TX = Parameters<
  Parameters<
    | typeof db.transaction
    | ReturnType<typeof getPooledConnection>["db"]["transaction"]
  >[0]
>[0];

export default db;
export { type DB, type TX, getPooledConnection };
