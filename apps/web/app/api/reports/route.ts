import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { and, eq, gte, lte } from "drizzle-orm"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { db, farms, checklistCompletions, auditReports } from "@/lib/db"
import { DEFAULT_CHECKLIST_ITEMS } from "@agriguard/compliance-data"
import { format } from "date-fns"

const schema = z.object({
  farmId: z.string().uuid(),
  periodStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  periodEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

  const { farmId, periodStart, periodEnd } = parsed.data

  const farm = await db.query.farms.findFirst({
    where: and(eq(farms.id, farmId), eq(farms.userId, session.user.id)),
  })
  if (!farm) return NextResponse.json({ error: "Farm not found" }, { status: 404 })

  const completions = await db.query.checklistCompletions.findMany({
    where: and(
      eq(checklistCompletions.farmId, farmId),
      gte(checklistCompletions.date, periodStart),
      lte(checklistCompletions.date, periodEnd),
    ),
  })

  const farmType = farm.farmType
  const requiredItems = DEFAULT_CHECKLIST_ITEMS.filter(
    (item) =>
      item.frequency === "daily" &&
      item.required &&
      (item.applicableTo.includes("all") || item.applicableTo.includes(farmType as never)),
  )

  // Calculate compliance score
  const completionsByDate = new Map<string, Set<string>>()
  for (const c of completions) {
    if (!completionsByDate.has(c.date)) completionsByDate.set(c.date, new Set())
    completionsByDate.get(c.date)!.add(c.checklistItemId)
  }

  const startDate = new Date(periodStart)
  const endDate = new Date(periodEnd)
  const days: string[] = []
  const current = new Date(startDate)
  while (current <= endDate) {
    days.push(format(current, "yyyy-MM-dd"))
    current.setDate(current.getDate() + 1)
  }

  const dayScores = days.map((dateStr) => {
    const done = completionsByDate.get(dateStr) ?? new Set()
    const completedRequired = requiredItems.filter((i) => done.has(i.id)).length
    return requiredItems.length > 0 ? Math.round((completedRequired / requiredItems.length) * 100) : 100
  })

  const avgScore = dayScores.length > 0
    ? Math.round(dayScores.reduce((sum, s) => sum + s, 0) / dayScores.length)
    : 0

  const title = `Compliance Report: ${format(new Date(periodStart), "MMM d")} – ${format(new Date(periodEnd), "MMM d, yyyy")}`

  const [report] = await db
    .insert(auditReports)
    .values({
      farmId,
      userId: session.user.id,
      title,
      periodStart,
      periodEnd,
      complianceScore: avgScore,
      status: "completed",
      generatedAt: new Date(),
    })
    .returning()

  return NextResponse.json({ success: true, reportId: report.id, complianceScore: avgScore })
}
