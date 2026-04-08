"use client"

import { useMemo } from "react"
import { format, subDays, parseISO } from "date-fns"
import { Flame, Trophy, Calendar } from "lucide-react"
import type { ChecklistCompletion } from "@/lib/db"

interface Props {
  currentStreak: number
  longestStreak: number
  recentCompletions: ChecklistCompletion[]
}

export function StreakDisplay({ currentStreak, longestStreak, recentCompletions }: Props) {
  const last28Days = useMemo(() => {
    const completionDates = new Set(recentCompletions.map((c) => c.date))
    return Array.from({ length: 28 }, (_, i) => {
      const date = subDays(new Date(), 27 - i)
      const dateStr = format(date, "yyyy-MM-dd")
      const isToday = i === 27
      return {
        dateStr,
        label: format(date, "d"),
        completed: completionDates.has(dateStr),
        isToday,
      }
    })
  }, [recentCompletions])

  const completedDays = last28Days.filter((d) => d.completed).length

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Compliance Streak
        </h2>
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Flame className="h-4 w-4 text-orange-400" />
            <span>Current: <strong className="text-gray-900">{currentStreak} days</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span>Best: <strong className="text-gray-900">{longestStreak} days</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span><strong className="text-gray-900">{completedDays}/28</strong> this month</span>
          </div>
        </div>
      </div>

      {/* 28-day calendar grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {["S","M","T","W","T","F","S"].map((d, i) => (
          <div key={i} className="text-center text-xs font-medium text-gray-400 pb-1">{d}</div>
        ))}
        {last28Days.map((day) => (
          <div
            key={day.dateStr}
            title={`${day.dateStr}: ${day.completed ? "Completed" : "Incomplete"}`}
            className={`
              aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all
              ${day.isToday ? "ring-2 ring-offset-1 ring-farm-600" : ""}
              ${day.completed
                ? "bg-farm-600 text-white"
                : "bg-gray-50 text-gray-400 border border-gray-100"
              }
            `}
          >
            {day.label}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-farm-600" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-gray-100 border border-gray-200" />
          <span>Incomplete</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded ring-2 ring-farm-600 bg-gray-50" />
          <span>Today</span>
        </div>
      </div>
    </div>
  )
}
