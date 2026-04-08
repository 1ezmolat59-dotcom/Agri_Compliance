import React, { createContext, useContext, useEffect, useState } from "react"
import { loadSession, clearSession, type Session } from "@/lib/api"
import { loadFarm, loadStreak } from "@/lib/storage"

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

interface AuthContextValue {
  session: Session | null
  farm: Farm | null
  streak: Streak | null
  loading: boolean
  signOut: () => Promise<void>
  refreshFarm: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  session: null,
  farm: null,
  streak: null,
  loading: true,
  signOut: async () => {},
  refreshFarm: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [farm, setFarm] = useState<Farm | null>(null)
  const [streak, setStreak] = useState<Streak | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const s = await loadSession()
      setSession(s)
      if (s) {
        const f = await loadFarm<Farm>()
        const str = await loadStreak<Streak>()
        setFarm(f)
        setStreak(str)
      }
      setLoading(false)
    }
    init()
  }, [])

  async function signOut() {
    await clearSession()
    setSession(null)
    setFarm(null)
    setStreak(null)
  }

  async function refreshFarm() {
    const f = await loadFarm<Farm>()
    const str = await loadStreak<Streak>()
    setFarm(f)
    setStreak(str)
  }

  return (
    <AuthContext.Provider value={{ session, farm, streak, loading, signOut, refreshFarm }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
