import { type ClassValue, clsx } from "clsx"
import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date
  if (isToday(d)) return "Today"
  if (isYesterday(d)) return "Yesterday"
  return format(d, "MMM d, yyyy")
}

export function formatDateFull(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date
  return format(d, "MMMM d, yyyy")
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? parseISO(date) : date
  return formatDistanceToNow(d, { addSuffix: true })
}

export function getTodayString(): string {
  return format(new Date(), "yyyy-MM-dd")
}

export function getComplianceScore(completed: number, total: number): number {
  if (total === 0) return 100
  return Math.round((completed / total) * 100)
}

export function getStreakEmoji(streak: number): string {
  if (streak === 0) return "🌱"
  if (streak < 7) return "🌿"
  if (streak < 30) return "🌳"
  if (streak < 90) return "🏆"
  return "🔥"
}

export function getComplianceColor(score: number): string {
  if (score >= 90) return "text-green-600"
  if (score >= 70) return "text-yellow-600"
  return "text-red-600"
}

export function getComplianceBgColor(score: number): string {
  if (score >= 90) return "bg-green-50 border-green-200"
  if (score >= 70) return "bg-yellow-50 border-yellow-200"
  return "bg-red-50 border-red-200"
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "…" : str
}

export const STATE_ABBREVIATIONS = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
]
