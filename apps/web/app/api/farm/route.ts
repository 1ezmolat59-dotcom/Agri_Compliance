import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { eq, and, gte, lte } from "drizzle-orm"
import { authOptions } from "@/lib/auth"
import { db, farms, streaks, checklistCompletions } from "@/lib/db"
import { getTodayString } from "@/lib/utils"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const farm = await db.query.farms.findFirst({
    where: eq(farms.userId, session.user.id),
  })
  if (!farm) return NextResponse.json({ error: "No farm found" }, { status: 404 })

  const streak = await db.query.streaks.findFirst({
    where: eq(streaks.farmId, farm.id),
  })

  const today = getTodayString()
  const todayCompletions = await db.query.checklistCompletions.findMany({
    where: and(
      eq(checklistCompletions.farmId, farm.id),
      eq(checklistCompletions.date, today),
    ),
  })

  return NextResponse.json({
    farm: {
      id: farm.id,
      name: farm.name,
      stateAbbreviation: farm.stateAbbreviation,
      farmType: farm.farmType,
    },
    streak: streak
      ? {
          currentStreak: streak.currentStreak,
          longestStreak: streak.longestStreak,
          lastCompletedDate: streak.lastCompletedDate,
          totalDaysCompleted: streak.totalDaysCompleted,
        }
      : null,
    todayCompletions,
  })
}
