import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { db, checklistCompletions, streaks, farms } from "@/lib/db"
import { getTodayString } from "@/lib/utils"

const schema = z.object({
  farmId: z.string().uuid(),
  checklistItemId: z.string().min(1),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

  const { farmId, checklistItemId } = parsed.data
  const today = getTodayString()

  // Verify farm belongs to user
  const farm = await db.query.farms.findFirst({
    where: and(eq(farms.id, farmId), eq(farms.userId, session.user.id)),
  })
  if (!farm) return NextResponse.json({ error: "Farm not found" }, { status: 404 })

  // Upsert completion
  await db
    .insert(checklistCompletions)
    .values({ farmId, userId: session.user.id, checklistItemId, date: today })
    .onConflictDoNothing()

  // Update streak (simplified — check if all required items done)
  await updateStreak(farmId, today)

  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

  const { farmId, checklistItemId } = parsed.data
  const today = getTodayString()

  await db
    .delete(checklistCompletions)
    .where(
      and(
        eq(checklistCompletions.farmId, farmId),
        eq(checklistCompletions.checklistItemId, checklistItemId),
        eq(checklistCompletions.date, today),
      ),
    )

  return NextResponse.json({ success: true })
}

async function updateStreak(farmId: string, today: string) {
  const existing = await db.query.streaks.findFirst({ where: eq(streaks.farmId, farmId) })

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split("T")[0]

  if (!existing) {
    await db.insert(streaks).values({
      farmId,
      currentStreak: 1,
      longestStreak: 1,
      lastCompletedDate: today,
      totalDaysCompleted: 1,
    })
    return
  }

  if (existing.lastCompletedDate === today) return // Already updated today

  const newStreak =
    existing.lastCompletedDate === yesterdayStr
      ? existing.currentStreak + 1
      : 1

  await db
    .update(streaks)
    .set({
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, existing.longestStreak),
      lastCompletedDate: today,
      totalDaysCompleted: existing.totalDaysCompleted + 1,
      updatedAt: new Date(),
    })
    .where(eq(streaks.farmId, farmId))
}
