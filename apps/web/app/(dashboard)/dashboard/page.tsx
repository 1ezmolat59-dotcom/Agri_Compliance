import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { eq, and, gte } from "drizzle-orm"
import { authOptions } from "@/lib/auth"
import { db, farms, streaks, checklistCompletions } from "@/lib/db"
import { DEFAULT_CHECKLIST_ITEMS } from "@agriguard/compliance-data"
import { getTodayString, getStreakEmoji, formatDate } from "@/lib/utils"
import { StreakDisplay } from "@/components/streak-display"
import { DashboardCharts } from "@/components/dashboard-charts"
import { QuickChecklist } from "@/components/quick-checklist"
import { Flame, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"

export const metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/sign-in")

  const userId = session.user.id

  // Load farm
  const farm = await db.query.farms.findFirst({
    where: eq(farms.userId, userId),
    with: { streak: true },
  })

  if (!farm) redirect("/onboarding")

  // Today's completions
  const today = getTodayString()
  const todayCompletions = await db.query.checklistCompletions.findMany({
    where: and(
      eq(checklistCompletions.farmId, farm.id),
      eq(checklistCompletions.date, today),
    ),
  })

  const completedIds = new Set(todayCompletions.map((c) => c.checklistItemId))

  // Filter checklist by farm type
  const farmType = farm.farmType
  const applicableItems = DEFAULT_CHECKLIST_ITEMS.filter(
    (item) =>
      item.frequency === "daily" &&
      (item.applicableTo.includes("all") || item.applicableTo.includes(farmType as never)),
  )
  const requiredItems = applicableItems.filter((i) => i.required)
  const completedRequired = requiredItems.filter((i) => completedIds.has(i.id)).length
  const totalRequired = requiredItems.length
  const complianceScore = totalRequired > 0 ? Math.round((completedRequired / totalRequired) * 100) : 0

  // 30-day completion data
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split("T")[0]

  const recentCompletions = await db.query.checklistCompletions.findMany({
    where: and(
      eq(checklistCompletions.farmId, farm.id),
      gte(checklistCompletions.date, thirtyDaysAgoStr),
    ),
  })

  const streak = farm.streak ?? { currentStreak: 0, longestStreak: 0, totalDaysCompleted: 0 }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Good {getGreeting()}, {session.user.name?.split(" ")[0]}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {farm.name} · {farm.stateAbbreviation} · {formatDate(today)}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3">
          <Flame className="h-6 w-6 text-orange-500" />
          <div>
            <div className="text-2xl font-bold text-orange-600 leading-none">{streak.currentStreak}</div>
            <div className="text-xs text-orange-500">day streak {getStreakEmoji(streak.currentStreak)}</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Today's Progress"
          value={`${completedRequired}/${totalRequired}`}
          sub="required tasks done"
          icon={CheckCircle2}
          color={complianceScore >= 90 ? "green" : complianceScore >= 70 ? "yellow" : "red"}
        />
        <StatCard
          label="Compliance Score"
          value={`${complianceScore}%`}
          sub="today's required items"
          icon={TrendingUp}
          color={complianceScore >= 90 ? "green" : complianceScore >= 70 ? "yellow" : "red"}
        />
        <StatCard
          label="Longest Streak"
          value={`${streak.longestStreak}`}
          sub="consecutive days"
          icon={Flame}
          color="orange"
        />
        <StatCard
          label="Total Days"
          value={`${streak.totalDaysCompleted}`}
          sub="compliant days all-time"
          icon={AlertCircle}
          color="blue"
        />
      </div>

      {/* Streak display */}
      <StreakDisplay
        currentStreak={streak.currentStreak}
        longestStreak={streak.longestStreak}
        recentCompletions={recentCompletions}
      />

      {/* Today's quick checklist */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Today&apos;s Checklist</h2>
            <a href="/checklists" className="text-sm text-farm-700 hover:underline font-medium">
              View all →
            </a>
          </div>
        </div>
        <QuickChecklist
          items={applicableItems.slice(0, 6)}
          completedIds={completedIds}
          farmId={farm.id}
        />
      </div>

      {/* 30-day charts */}
      <DashboardCharts recentCompletions={recentCompletions} totalRequired={totalRequired} />
    </div>
  )
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string
  value: string
  sub: string
  icon: React.ComponentType<{ className?: string }>
  color: "green" | "yellow" | "red" | "orange" | "blue"
}) {
  const colors = {
    green: "bg-green-50 text-green-600 border-green-100",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
    red: "bg-red-50 text-red-600 border-red-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
  }

  return (
    <div className={`rounded-2xl border p-5 ${colors[color]}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium opacity-80">{label}</span>
        <Icon className="h-5 w-5 opacity-60" />
      </div>
      <div className="text-3xl font-bold mb-0.5">{value}</div>
      <div className="text-xs opacity-70">{sub}</div>
    </div>
  )
}

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 12) return "morning"
  if (h < 17) return "afternoon"
  return "evening"
}
