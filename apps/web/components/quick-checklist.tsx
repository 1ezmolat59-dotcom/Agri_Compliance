"use client"

import { useState, useTransition } from "react"
import { CheckCircle2, Circle, Loader2 } from "lucide-react"
import type { ChecklistItem } from "@agriguard/compliance-data"

interface Props {
  items: ChecklistItem[]
  completedIds: Set<string>
  farmId: string
}

export function QuickChecklist({ items, completedIds: initialCompleted, farmId }: Props) {
  const [completed, setCompleted] = useState<Set<string>>(initialCompleted)
  const [pending, startTransition] = useTransition()
  const [toggling, setToggling] = useState<string | null>(null)

  async function toggle(itemId: string) {
    const isCompleted = completed.has(itemId)
    setToggling(itemId)

    // Optimistic update
    startTransition(() => {
      setCompleted((prev) => {
        const next = new Set(prev)
        if (isCompleted) next.delete(itemId)
        else next.add(itemId)
        return next
      })
    })

    try {
      await fetch("/api/checklists/complete", {
        method: isCompleted ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ farmId, checklistItemId: itemId }),
      })
    } catch {
      // Revert on error
      startTransition(() => {
        setCompleted((prev) => {
          const next = new Set(prev)
          if (isCompleted) next.add(itemId)
          else next.delete(itemId)
          return next
        })
      })
    } finally {
      setToggling(null)
    }
  }

  return (
    <div className="divide-y divide-gray-50">
      {items.map((item) => {
        const isCompleted = completed.has(item.id)
        const isToggling = toggling === item.id

        return (
          <div key={item.id} className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
            <button
              onClick={() => toggle(item.id)}
              disabled={isToggling}
              className="mt-0.5 shrink-0 text-gray-300 hover:text-farm-600 transition-colors disabled:opacity-50"
            >
              {isToggling ? (
                <Loader2 className="h-5 w-5 animate-spin text-farm-600" />
              ) : isCompleted ? (
                <CheckCircle2 className="h-5 w-5 text-farm-600" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${isCompleted ? "text-gray-400 line-through" : "text-gray-900"}`}>
                {item.title}
              </p>
              {item.regulatoryBasis && (
                <p className="text-xs text-gray-400 mt-0.5 truncate">{item.regulatoryBasis}</p>
              )}
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
              item.required
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-500"
            }`}>
              {item.required ? "Required" : "Optional"}
            </span>
          </div>
        )
      })}
    </div>
  )
}
