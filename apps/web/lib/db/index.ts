import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./schema"

function createDb() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set")
  }
  // Use max: 1 for serverless environments (Vercel functions)
  const client = postgres(databaseUrl, { max: 1 })
  return drizzle(client, { schema })
}

// Singleton pattern — reuse connection in dev (avoids exhausting connection pool)
declare global {
  // eslint-disable-next-line no-var
  var _db: ReturnType<typeof createDb> | undefined
}

export const db = globalThis._db ?? createDb()

if (process.env.NODE_ENV !== "production") {
  globalThis._db = db
}

export * from "./schema"
