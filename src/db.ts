import { Pool } from "https://deno.land/x/postgres/mod.ts";

// DB connection params
const config = {
  host: Deno.env.get("DB_HOST") || "localhost",
  port: parseInt(Deno.env.get("DB_PORT") || "5432"),
  user: Deno.env.get("DB_USER") || "postgres",
  database: Deno.env.get("DB_NAME") || "todo",
  password: Deno.env.get("DB_PASSWORD") || "",
  applicationName: "todo-backend-deno",
};

console.log('CONFIG', config);

// Max DB connections
const maxConnections = 10;

// Lazily create DB connections
const lazy = true;

export const dbClient = await new Pool(config, maxConnections, lazy);
