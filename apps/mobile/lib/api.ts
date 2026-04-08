import * as SecureStore from "expo-secure-store"

const SESSION_KEY = "agriguard_session"

export interface Session {
  token: string
  userId: string
  name: string
  email: string
}

export interface Farm {
  id: string
  name: string
  stateAbbreviation: string
  farmType: string
}

export interface Streak {
  currentStreak: number
  longestStreak: number
  lastCompletedDate: string | null
  totalDaysCompleted: number
}

export interface ChecklistCompletion {
  checklistItemId: string
  date: string
}

export interface VisitorEntry {
  id: string
  farmId: string
  visitorName: string
  organization: string | null
  purpose: string
  visitDate: string
  entryTime: string | null
  exitTime: string | null
  ppeUsed: boolean
  vehicleDisinfected: boolean
  previousFarmContact: boolean
  previousFarmDetails: string | null
  contactPhone: string | null
  createdAt: string
}

// ---------- Session storage ----------

export async function saveSession(session: Session) {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session))
}

export async function loadSession(): Promise<Session | null> {
  try {
    const raw = await SecureStore.getItemAsync(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export async function clearSession() {
  await SecureStore.deleteItemAsync(SESSION_KEY)
}

// ---------- HTTP helpers ----------

let BASE_URL = ""

export function setBaseUrl(url: string) {
  BASE_URL = url.replace(/\/$/, "")
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  const session = await loadSession()
  if (!session?.token) return { "Content-Type": "application/json" }
  return {
    "Content-Type": "application/json",
    "Cookie": `next-auth.session-token=${session.token}`,
  }
}

async function apiFetch(path: string, init?: RequestInit) {
  const headers = await getAuthHeaders()
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { ...headers, ...(init?.headers as Record<string, string> | undefined) },
    credentials: "include",
  })
  return res
}

// ---------- Auth ----------

export async function signIn(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
  // NextAuth credentials sign-in via API
  const res = await fetch(`${BASE_URL}/api/auth/callback/credentials`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ email, password, csrfToken: "", json: "true" }),
    redirect: "manual",
  })
  if (res.status === 200 || res.status === 302) return { ok: true }
  return { ok: false, error: "Invalid email or password" }
}

export async function registerUser(data: {
  name: string
  email: string
  password: string
  farmName: string
  state: string
  farmType: string
}): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (res.ok) return { ok: true }
  return { ok: false, error: json.error ?? "Registration failed" }
}

// ---------- Checklists ----------

export async function markComplete(farmId: string, checklistItemId: string) {
  return apiFetch("/api/checklists/complete", {
    method: "POST",
    body: JSON.stringify({ farmId, checklistItemId }),
  })
}

export async function unmarkComplete(farmId: string, checklistItemId: string) {
  return apiFetch("/api/checklists/complete", {
    method: "DELETE",
    body: JSON.stringify({ farmId, checklistItemId }),
  })
}

// ---------- Reports ----------

export async function generateReport(farmId: string, periodStart: string, periodEnd: string) {
  return apiFetch("/api/reports", {
    method: "POST",
    body: JSON.stringify({ farmId, periodStart, periodEnd }),
  })
}

// ---------- Visitor log ----------

export async function logVisitor(farmId: string, data: Omit<VisitorEntry, "id" | "farmId" | "createdAt">) {
  return apiFetch("/api/visitor-log", {
    method: "POST",
    body: JSON.stringify({ farmId, ...data }),
  })
}
