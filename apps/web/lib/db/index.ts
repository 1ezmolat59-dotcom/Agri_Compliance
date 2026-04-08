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

function getDb(): Db {
  if (!globalThis._db) {
    globalThis._db = createDb()
  }
  return globalThis._db
}

// Lazy proxy — defers DB connection until first use so Next.js static build
// does not crash when DATABASE_URL is absent at compile time.
export const db = new Proxy({} as Db, {
  get(_target, prop: string | symbol) {
    const instance = getDb()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val = (instance as any)[prop]
    return typeof val === "function" ? (val as (...args: unknown[]) => unknown).bind(instance) : val
  },
})

export * from "./schema"
