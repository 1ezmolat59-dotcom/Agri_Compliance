"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ClipboardList, Plus, Trash2, Shield, Car, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react"
import type { VisitorLog } from "@/lib/db"

interface Props {
  farmId: string
  entries: VisitorLog[]
}

const emptyForm = {
  visitorName: "",
  organization: "",
  purpose: "",
  previousFarmContact: false,
  previousFarmDetails: "",
  visitDate: format(new Date(), "yyyy-MM-dd"),
  entryTime: "",
  exitTime: "",
  ppeUsed: false,
  vehicleDisinfected: false,
  contactPhone: "",
}

export function VisitorLogClient({ farmId, entries: initialEntries }: Props) {
  const [entries, setEntries] = useState(initialEntries)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [error, setError] = useState("")

  function update<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.visitorName.trim() || !form.purpose.trim() || !form.visitDate) {
      setError("Visitor name, purpose, and date are required.")
      return
    }
    setSaving(true)
    setError("")
    try {
      const res = await fetch("/api/visitor-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ farmId, ...form }),
      })
      if (!res.ok) throw new Error("Failed to save")
      // Refresh — re-fetch entries optimistically
      const newEntry: VisitorLog = {
        id: crypto.randomUUID(),
        farmId,
        ...form,
        organization: form.organization || null,
        previousFarmDetails: form.previousFarmDetails || null,
        entryTime: form.entryTime || null,
        exitTime: form.exitTime || null,
        contactPhone: form.contactPhone || null,
        createdAt: new Date(),
      }
      setEntries((prev) => [newEntry, ...prev])
      setForm(emptyForm)
      setShowForm(false)
    } catch {
      setError("Failed to save entry. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this visitor entry?")) return
    const res = await fetch(`/api/visitor-log?id=${id}`, { method: "DELETE" })
    if (res.ok) setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visitor Log</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track all farm visitors for biosecurity compliance (USDA APHIS, FSMA requirements).
          </p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setError("") }}
          className="gradient-farm text-white font-semibold px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Log Visitor
        </button>
      </div>

      {/* Biosecurity notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <Shield className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
        <div className="text-sm text-amber-800">
          <span className="font-semibold">Biosecurity requirement:</span> Federal regulations (USDA APHIS 9 CFR Part 71, FSMA) and most state ag departments require farms to maintain visitor logs. Records should be retained for a minimum of 2 years.
        </div>
      </div>

      {/* Add Visitor Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-5">New Visitor Entry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Visitor Name *</label>
                <input
                  type="text"
                  value={form.visitorName}
                  onChange={(e) => update("visitorName", e.target.value)}
                  placeholder="Full name"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-farm-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Organization</label>
                <input
                  type="text"
                  value={form.organization}
                  onChange={(e) => update("organization", e.target.value)}
                  placeholder="Company / Agency"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-farm-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Purpose of Visit *</label>
              <textarea
                value={form.purpose}
                onChange={(e) => update("purpose", e.target.value)}
                rows={2}
                placeholder="e.g., Veterinary inspection, feed delivery, USDA audit..."
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-farm-600 resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Visit Date *</label>
                <input
                  type="date"
                  value={form.visitDate}
                  onChange={(e) => update("visitDate", e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-farm-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Entry Time</label>
                <input
                  type="time"
                  value={form.entryTime}
                  onChange={(e) => update("entryTime", e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-farm-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Exit Time</label>
                <input
                  type="time"
                  value={form.exitTime}
                  onChange={(e) => update("exitTime", e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-farm-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Phone</label>
              <input
                type="tel"
                value={form.contactPhone}
                onChange={(e) => update("contactPhone", e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-farm-600"
              />
            </div>

            {/* Biosecurity checkboxes */}
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.ppeUsed}
                  onChange={(e) => update("ppeUsed", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-farm-600 focus:ring-farm-600"
                />
                <span className="text-sm text-gray-700">PPE used</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.vehicleDisinfected}
                  onChange={(e) => update("vehicleDisinfected", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-farm-600 focus:ring-farm-600"
                />
                <span className="text-sm text-gray-700">Vehicle disinfected</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.previousFarmContact}
                  onChange={(e) => update("previousFarmContact", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-farm-600 focus:ring-farm-600"
                />
                <span className="text-sm text-gray-700">Other farm contact (24h)</span>
              </label>
            </div>

            {form.previousFarmContact && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Farm contact details</label>
                <input
                  type="text"
                  value={form.previousFarmDetails}
                  onChange={(e) => update("previousFarmDetails", e.target.value)}
                  placeholder="Name of farm / location visited"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-farm-600"
                />
              </div>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="gradient-farm text-white font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save Entry"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setError("") }}
                className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Visitor List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-farm-600" />
          <span className="font-semibold text-gray-900">Recent Visitors</span>
          <span className="ml-auto text-sm text-gray-400">{entries.length} record{entries.length !== 1 ? "s" : ""}</span>
        </div>

        {entries.length === 0 ? (
          <div className="py-16 text-center">
            <ClipboardList className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No visitors logged yet</p>
            <p className="text-sm text-gray-400 mt-1">All farm visitors should be recorded for biosecurity compliance.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {entries.map((entry) => {
              const isExpanded = expandedId === entry.id
              return (
                <div key={entry.id} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900">{entry.visitorName}</span>
                        {entry.organization && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{entry.organization}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5 truncate">{entry.purpose}</p>
                      <div className="flex items-center gap-3 mt-1.5 flex-wrap text-xs text-gray-400">
                        <span>{format(new Date(entry.visitDate + "T12:00:00"), "MMMM d, yyyy")}</span>
                        {entry.entryTime && <span>{entry.entryTime}{entry.exitTime ? ` – ${entry.exitTime}` : ""}</span>}
                        <div className="flex items-center gap-1.5">
                          {entry.ppeUsed ? (
                            <span className="flex items-center gap-1 text-green-600"><CheckCircle2 className="h-3 w-3" />PPE</span>
                          ) : (
                            <span className="flex items-center gap-1 text-gray-400"><XCircle className="h-3 w-3" />No PPE</span>
                          )}
                          {entry.vehicleDisinfected ? (
                            <span className="flex items-center gap-1 text-green-600"><Car className="h-3 w-3" />Disinfected</span>
                          ) : (
                            <span className="flex items-center gap-1 text-gray-400"><Car className="h-3 w-3" />Not disinfected</span>
                          )}
                        </div>
                        {entry.previousFarmContact && (
                          <span className="text-amber-600 font-medium">⚠ Other farm contact</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                        className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-gray-50 grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                      {entry.contactPhone && <div><span className="font-medium">Phone:</span> {entry.contactPhone}</div>}
                      {entry.previousFarmContact && entry.previousFarmDetails && (
                        <div className="sm:col-span-2"><span className="font-medium text-amber-700">Farm contact:</span> {entry.previousFarmDetails}</div>
                      )}
                      <div className="sm:col-span-2 text-xs text-gray-400">Logged: {format(new Date(entry.createdAt), "MMM d, yyyy h:mm a")}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
