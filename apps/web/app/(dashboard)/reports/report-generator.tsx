"use client"

import { useState } from "react"
import { format, eachDayOfInterval, parseISO } from "date-fns"
import { FileText, Download, CheckCircle2, XCircle, BarChart3, Printer } from "lucide-react"
import type { ChecklistItem } from "@agriguard/compliance-data"
import type { AuditReport, ChecklistCompletion } from "@/lib/db"

interface Farm {
  id: string
  name: string
  stateAbbreviation: string
  farmType: string
}

interface Props {
  farm: Farm
  completions: ChecklistCompletion[]
  requiredItems: ChecklistItem[]
  pastReports: AuditReport[]
  defaultPeriodStart: string
  defaultPeriodEnd: string
}

export function ReportGenerator({
  farm,
  completions,
  requiredItems,
  pastReports,
  defaultPeriodStart,
  defaultPeriodEnd,
}: Props) {
  const [periodStart, setPeriodStart] = useState(defaultPeriodStart)
  const [periodEnd, setPeriodEnd] = useState(defaultPeriodEnd)
  const [generating, setGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)

  // Build daily stats
  const days = eachDayOfInterval({
    start: parseISO(periodStart),
    end: parseISO(periodEnd),
  })

  const completionsByDate = new Map<string, Set<string>>()
  for (const c of completions) {
    if (c.date >= periodStart && c.date <= periodEnd) {
      if (!completionsByDate.has(c.date)) completionsByDate.set(c.date, new Set())
      completionsByDate.get(c.date)!.add(c.checklistItemId)
    }
  }

  const dailyStats = days.map((day) => {
    const dateStr = format(day, "yyyy-MM-dd")
    const done = completionsByDate.get(dateStr) ?? new Set()
    const completedRequired = requiredItems.filter((i) => done.has(i.id)).length
    const score = requiredItems.length > 0 ? Math.round((completedRequired / requiredItems.length) * 100) : 100
    return { date: dateStr, label: format(day, "MMM d"), completedRequired, total: requiredItems.length, score }
  })

  const fullyCompliantDays = dailyStats.filter((d) => d.score === 100).length
  const avgScore = dailyStats.length > 0
    ? Math.round(dailyStats.reduce((sum, d) => sum + d.score, 0) / dailyStats.length)
    : 0

  async function generateReport() {
    setGenerating(true)
    await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ farmId: farm.id, periodStart, periodEnd }),
    })
    setGenerating(false)
    setReportGenerated(true)
  }

  function printReport() {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audit-Ready Reports</h1>
        <p className="text-sm text-gray-500 mt-1">
          Generate compliance reports for USDA inspections, lender audits, and insurance documentation.
        </p>
      </div>

      {/* Period Selector */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Report Period</h2>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Start date</label>
            <input
              type="date"
              value={periodStart}
              onChange={(e) => { setPeriodStart(e.target.value); setReportGenerated(false) }}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-600 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">End date</label>
            <input
              type="date"
              value={periodEnd}
              onChange={(e) => { setPeriodEnd(e.target.value); setReportGenerated(false) }}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-600 text-sm"
            />
          </div>
          <button
            onClick={generateReport}
            disabled={generating}
            className="gradient-farm text-white font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap disabled:opacity-60"
          >
            <FileText className="h-4 w-4" />
            {generating ? "Generating…" : "Generate Report"}
          </button>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden print:shadow-none print:border-0">
        {/* Report Header */}
        <div className="gradient-farm text-white px-8 py-6 print:bg-green-900">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">AgriGuard Compliance Report</h2>
              <p className="text-green-100 mt-1">{farm.name} · {farm.stateAbbreviation}</p>
            </div>
            <button
              onClick={printReport}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors print:hidden"
            >
              <Printer className="h-4 w-4" />
              Print / PDF
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-green-100">
            <span>Period: {format(parseISO(periodStart), "MMMM d, yyyy")} – {format(parseISO(periodEnd), "MMMM d, yyyy")}</span>
            <span>Farm type: {farm.farmType}</span>
            <span>Generated: {format(new Date(), "MMMM d, yyyy h:mm a")}</span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-px bg-gray-100 border-b border-gray-100">
          {[
            { label: "Overall Compliance", value: `${avgScore}%`, color: avgScore >= 90 ? "text-green-600" : avgScore >= 70 ? "text-yellow-600" : "text-red-600" },
            { label: "Fully Compliant Days", value: `${fullyCompliantDays}/${days.length}`, color: "text-farm-700" },
            { label: "Required Tasks Tracked", value: `${requiredItems.length}`, color: "text-blue-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-5 text-center">
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Daily Log Table */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-farm-600" />
            Daily Compliance Log
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Tasks Completed</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Score</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {dailyStats.slice(-30).map((day) => (
                  <tr key={day.date} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 text-gray-900 font-medium">{day.label}</td>
                    <td className="px-4 py-2.5 text-gray-600">{day.completedRequired} / {day.total}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-100 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${day.score >= 90 ? "bg-green-500" : day.score >= 70 ? "bg-yellow-500" : day.score > 0 ? "bg-red-500" : "bg-gray-200"}`}
                            style={{ width: `${day.score}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">{day.score}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      {day.score === 100 ? (
                        <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-3 w-3" /> Compliant
                        </span>
                      ) : day.score > 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded-full">
                          Partial
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
                          <XCircle className="h-3 w-3" /> No data
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signature Block */}
        <div className="px-6 pb-8 pt-2">
          <div className="border-t border-gray-200 pt-6 mt-4">
            <p className="text-xs text-gray-500 mb-6">
              This report was generated by AgriGuard and reflects checklist completion records as entered by farm personnel.
              Records should be retained for a minimum of 2 years per federal regulatory requirements (FSMA, EPA FIFRA).
              This document may be used to demonstrate good-faith compliance efforts during inspections.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <div className="border-b border-gray-900 mb-2 h-10" />
                <p className="text-xs text-gray-500">Farm Operator Signature</p>
              </div>
              <div>
                <div className="border-b border-gray-900 mb-2 h-10" />
                <p className="text-xs text-gray-500">Date</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Past Reports */}
      {pastReports.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Previously Generated Reports</h2>
          <div className="space-y-2">
            {pastReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{report.title}</p>
                  <p className="text-xs text-gray-500">{report.periodStart} → {report.periodEnd}</p>
                </div>
                <div className="flex items-center gap-3">
                  {report.complianceScore !== null && (
                    <span className={`text-sm font-semibold ${report.complianceScore >= 90 ? "text-green-600" : report.complianceScore >= 70 ? "text-yellow-600" : "text-red-600"}`}>
                      {report.complianceScore}%
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {report.createdAt ? format(new Date(report.createdAt), "MMM d, yyyy") : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
