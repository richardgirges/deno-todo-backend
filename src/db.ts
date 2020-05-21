import { Pool } from "https://deno.land/x/postgres/mod.ts";

// DB connection params
const config = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "todo",
  applicationName: "todo-backend-deno",
};

// Max DB connections
const maxConnections = 10;

// Lazily create DB connections
const lazy = true;

export const dbClient = await new Pool(config, maxConnections, lazy);
