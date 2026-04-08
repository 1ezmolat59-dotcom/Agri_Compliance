import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { eq, and } from "drizzle-orm"
import { authOptions } from "@/lib/auth"
import { db, farms, checklistCompletions } from "@/lib/db"
import { DEFAULT_CHECKLIST_ITEMS, CHECKLIST_CATEGORIES } from "@agriguard/compliance-data"
import { getTodayString } from "@/lib/utils"
import { ChecklistPageClient } from "./checklist-client"

export const metadata = { title: "Checklists" }

export default async function ChecklistsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/sign-in")

  const farm = await db.query.farms.findFirst({
    where: eq(farms.userId, session.user.id),
  })
  if (!farm) redirect("/onboarding")

  const today = getTodayString()
  const todayCompletions = await db.query.checklistCompletions.findMany({
    where: and(
      eq(checklistCompletions.farmId, farm.id),
      eq(checklistCompletions.date, today),
    ),
  })

  const completedIds = todayCompletions.map((c) => c.checklistItemId)

  // Filter by farm type
  const farmType = farm.farmType
  const applicableItems = DEFAULT_CHECKLIST_ITEMS.filter(
    (item) =>
      item.applicableTo.includes("all") || item.applicableTo.includes(farmType as never),
  )

  return (
    <ChecklistPageClient
      items={applicableItems}
      completedIds={completedIds}
      farmId={farm.id}
      categories={CHECKLIST_CATEGORIES}
      today={today}
    />
  )
}
