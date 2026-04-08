import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { eq, desc } from "drizzle-orm"
import { authOptions } from "@/lib/auth"
import { db, farms, visitorLog } from "@/lib/db"
import { VisitorLogClient } from "./visitor-log-client"

export const metadata = { title: "Visitor Log" }

export default async function VisitorLogPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/sign-in")

  const farm = await db.query.farms.findFirst({
    where: eq(farms.userId, session.user.id),
  })
  if (!farm) redirect("/onboarding")

  const entries = await db.query.visitorLog.findMany({
    where: eq(visitorLog.farmId, farm.id),
    orderBy: desc(visitorLog.visitDate),
    limit: 100,
  })

  return <VisitorLogClient farmId={farm.id} entries={entries} />
}
