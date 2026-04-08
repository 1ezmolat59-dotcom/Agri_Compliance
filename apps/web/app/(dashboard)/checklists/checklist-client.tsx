"use client"

import { useState, useTransition } from "react"
import { CheckCircle2, Circle, Loader2, Filter, ChevronDown, ChevronUp } from "lucide-react"
import type { ChecklistItem } from "@agriguard/compliance-data"

type Frequency = "daily" | "weekly" | "monthly"
type CategoryEntry = { readonly id: string; readonly label: string; readonly color: string }

interface Props {
  items: ChecklistItem[]
  completedIds: string[]
  farmId: string
  categories: readonly CategoryEntry[]
  today: string
}

export function ChecklistPageClient({ items, completedIds: initial, farmId, categories, today }: Props) {
  const [completed, setCompleted] = useState<Set<string>>(new Set(initial))
  const [toggling, setToggling] = useState<string | null>(null)
  const [, startTransition] = useTransition()
  const [freq, setFreq] = useState<Frequency>("daily")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const filtered = items.filter((i) => i.frequency === freq)
  const requiredCount = filtered.filter((i) => i.required).length
  const completedRequiredCount = filtered.filter((i) => i.required && completed.has(i.id)).length

  async function toggle(itemId: string) {
    const isCompleted = completed.has(itemId)
    setToggling(itemId)

    startTransition(() => {
      setCompleted((prev) => {
        const next = new Set(prev)
        isCompleted ? next.delete(itemId) : next.add(itemId)
        return next
      })
    })

    await fetch("/api/checklists/complete", {
      method: isCompleted ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ farmId, checklistItemId: itemId }),
    })

    setToggling(null)
  }

  const grouped = categories
    .map((cat) => ({
      ...cat,
      items: filtered.filter((i) => i.category === cat.id),
    }))
    .filter((g) => g.items.length > 0)

  const score = requiredCount > 0 ? Math.round((completedRequiredCount / requiredCount) * 100) : 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Biosecurity Checklists</h1>
          <p className="text-sm text-gray-500 mt-1">{today} · {completedRequiredCount}/{requiredCount} required tasks complete</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-32 bg-gray-100 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-farm-600 transition-all"
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="text-sm font-semibold text-farm-700 w-10 text-right">{score}%</span>
        </div>
      </div>

      {/* Frequency tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {(["daily", "weekly", "monthly"] as Frequency[]).map((f) => (
          <button
            key={f}
            onClick={() => setFreq(f)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              freq === f ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grouped checklist */}
      <div className="space-y-4">
        {grouped.map((group) => {
          const groupCompleted = group.items.filter((i) => completed.has(i.id)).length
          const isExpanded = expandedCategory !== group.id
          return (
            <div key={group.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedCategory(isExpanded ? group.id : null)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: group.color }}
                  />
                  <span className="font-semibold text-gray-900">{group.label}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {groupCompleted}/{group.items.length}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {isExpanded && (
                <div className="divide-y divide-gray-50 border-t border-gray-100">
                  {group.items.map((item) => {
                    const isDone = completed.has(item.id)
                    const isToggling = toggling === item.id

                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                      >
                        <button
                          onClick={() => toggle(item.id)}
                          disabled={isToggling}
                          className="mt-0.5 shrink-0"
                        >
                          {isToggling ? (
                            <Loader2 className="h-5 w-5 animate-spin text-farm-600" />
                          ) : isDone ? (
                            <CheckCircle2 className="h-5 w-5 text-farm-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-300 hover:text-farm-600 transition-colors" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${isDone ? "text-gray-400 line-through" : "text-gray-900"}`}>
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                          {item.regulatoryBasis && (
                            <p className="text-xs text-farm-600 mt-1 font-medium">
                              📋 {item.regulatoryBasis}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            item.required ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-500"
                          }`}>
                            {item.required ? "Required" : "Optional"}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
