"use client"

import { useMemo } from "react"
import { format, subDays } from "date-fns"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import type { ChecklistCompletion } from "@/lib/db"

interface Props {
  recentCompletions: ChecklistCompletion[]
  totalRequired: number
}

export function DashboardCharts({ recentCompletions, totalRequired }: Props) {
  const chartData = useMemo(() => {
    const byDate = new Map<string, number>()
    for (const c of recentCompletions) {
      byDate.set(c.date, (byDate.get(c.date) ?? 0) + 1)
    }

    return Array.from({ length: 14 }, (_, i) => {
      const date = subDays(new Date(), 13 - i)
      const dateStr = format(date, "yyyy-MM-dd")
      const count = byDate.get(dateStr) ?? 0
      const score = totalRequired > 0 ? Math.round((count / totalRequired) * 100) : 0
      return {
        label: format(date, "M/d"),
        score: Math.min(score, 100),
        isToday: i === 13,
      }
    })
  }, [recentCompletions, totalRequired])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="font-semibold text-gray-900 mb-6">14-Day Compliance Trend</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} barCategoryGap="30%">
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
          />
          <YAxis
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickFormatter={(v) => `${v}%`}
            width={36}
          />
          <Tooltip
            formatter={(value: number) => [`${value}%`, "Compliance"]}
            contentStyle={{ borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "12px" }}
            cursor={{ fill: "#f0fdf4" }}
          />
          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, i) => (
              <Cell
                key={i}
                fill={
                  entry.isToday
                    ? "#15803d"
                    : entry.score >= 90
                    ? "#4ade80"
                    : entry.score >= 70
                    ? "#fbbf24"
                    : entry.score > 0
                    ? "#f87171"
                    : "#e5e7eb"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-6 mt-4 text-xs text-gray-500 justify-center">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-400 inline-block" /> ≥90%</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-yellow-400 inline-block" /> 70–89%</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-400 inline-block" /> &lt;70%</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-200 inline-block" /> No data</span>
      </div>
    </div>
  )
}
