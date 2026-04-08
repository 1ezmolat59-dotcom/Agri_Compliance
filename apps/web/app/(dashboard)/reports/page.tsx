import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { eq, and, gte, lte, desc } from "drizzle-orm"
import { authOptions } from "@/lib/auth"
import { db, farms, checklistCompletions, auditReports } from "@/lib/db"
import { DEFAULT_CHECKLIST_ITEMS } from "@agriguard/compliance-data"
import { format, subDays } from "date-fns"
import { ReportGenerator } from "./report-generator"

export const metadata = { title: "Audit Reports" }

export default async function ReportsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/sign-in")

  const farm = await db.query.farms.findFirst({
    where: eq(farms.userId, session.user.id),
  })
  if (!farm) redirect("/onboarding")

  const pastReports = await db.query.auditReports.findMany({
    where: eq(auditReports.farmId, farm.id),
    orderBy: desc(auditReports.createdAt),
    limit: 10,
  })

  // Default period: last 30 days
  const periodEnd = format(new Date(), "yyyy-MM-dd")
  const periodStart = format(subDays(new Date(), 29), "yyyy-MM-dd")

  const completions = await db.query.checklistCompletions.findMany({
    where: and(
      eq(checklistCompletions.farmId, farm.id),
      gte(checklistCompletions.date, periodStart),
      lte(checklistCompletions.date, periodEnd),
    ),
  })

  const farmType = farm.farmType
  const applicableItems = DEFAULT_CHECKLIST_ITEMS.filter(
    (item) =>
      item.frequency === "daily" &&
      (item.applicableTo.includes("all") || item.applicableTo.includes(farmType as never)),
  )
  const requiredItems = applicableItems.filter((i) => i.required)

  return (
    <ReportGenerator
      farm={{
        id: farm.id,
        name: farm.name,
        stateAbbreviation: farm.stateAbbreviation,
        farmType: farm.farmType,
      }}
      completions={completions}
      requiredItems={requiredItems}
      pastReports={pastReports}
      defaultPeriodStart={periodStart}
      defaultPeriodEnd={periodEnd}
    />
  )
}
