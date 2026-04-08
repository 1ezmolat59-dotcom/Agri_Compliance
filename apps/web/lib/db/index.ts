import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./schema"

type Db = ReturnType<typeof drizzle<typeof schema>>

function createDb(): Db {
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
  var _db: Db | undefined
}

// Lazy proxy — defers DB connection until first use.
// This prevents Next.js from crashing during static build
// when DATABASE_URL is not available at compile time.
export const db: Db = new Proxy({} as Db, {
  get(_target, prop) {
    if (!globalThis._db) {
      globalThis._db = createDb()
    }
    const val = (globalThis._db as Record<string | symbol, unknown>)[prop]
    return typeof val === "function" ? val.bind(globalThis._db) : val
  },
})

export * from "./schema"
