import { useCallback, useEffect, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native"
import { useFocusEffect } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { format, subDays } from "date-fns"
import { useAuth } from "@/context/auth"
import { loadFarm, loadStreak, loadCompletions, saveFarm, saveStreak, saveCompletions } from "@/lib/storage"
import { setBaseUrl, loadBaseUrl } from "@/lib/api"
import { DEFAULT_CHECKLIST_ITEMS } from "@agriguard/compliance-data"

interface Farm {
  id: string
  name: string
  stateAbbreviation: string
  farmType: string
}

interface Streak {
  currentStreak: number
  longestStreak: number
  lastCompletedDate: string | null
  totalDaysCompleted: number
}

function streakEmoji(n: number) {
  if (n >= 30) return "🏆"
  if (n >= 14) return "🔥"
  if (n >= 7) return "⭐"
  if (n >= 3) return "✅"
  return "🌱"
}

export default function DashboardTab() {
  const { session, refreshFarm: refreshCtx } = useAuth()
  const [farm, setFarm] = useState<Farm | null>(null)
  const [streak, setStreak] = useState<Streak | null>(null)
  const [todayCompletions, setTodayCompletions] = useState<string[]>([])
  const [requiredTotal, setRequiredTotal] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const today = format(new Date(), "yyyy-MM-dd")

  async function load() {
    const f = await loadFarm<Farm>()
    const s = await loadStreak<Streak>()
    const c = await loadCompletions()
    setFarm(f)
    setStreak(s)
    setTodayCompletions(c)

    if (f) {
      const items = DEFAULT_CHECKLIST_ITEMS.filter(
        (i) =>
          i.frequency === "daily" &&
          i.required &&
          (i.applicableTo.includes("all") || i.applicableTo.includes(f.farmType as never)),
      )
      setRequiredTotal(items.length)
    }
  }

  useFocusEffect(
    useCallback(() => {
      load()
    }, []),
  )

  async function onRefresh() {
    setRefreshing(true)
    try {
      const baseUrl = await loadBaseUrl()
      if (baseUrl && session) {
        setBaseUrl(baseUrl)
        // Fetch fresh data from the server
        const res = await fetch(`${baseUrl}/api/farm`)
        if (res.ok) {
          const data = await res.json()
          if (data.farm) { await saveFarm(data.farm); setFarm(data.farm) }
          if (data.streak) { await saveStreak(data.streak); setStreak(data.streak) }
          if (data.todayCompletions) {
            const ids: string[] = data.todayCompletions.map((c: { checklistItemId: string }) => c.checklistItemId)
            await saveCompletions(ids)
            setTodayCompletions(ids)
          }
        }
      }
    } finally {
      setRefreshing(false)
    }
  }

  const completedToday = todayCompletions.length
  const pct = requiredTotal > 0 ? Math.round((completedToday / requiredTotal) * 100) : 0
  const pctCapped = Math.min(pct, 100)

  const scoreColor = pctCapped >= 90 ? "#16a34a" : pctCapped >= 70 ? "#d97706" : "#dc2626"

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#166534" />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good {getTimeOfDay()},</Text>
          <Text style={styles.farmName}>{farm?.name ?? "Your Farm"}</Text>
        </View>
        <View style={styles.stateBadge}>
          <Text style={styles.stateText}>{farm?.stateAbbreviation ?? "—"}</Text>
        </View>
      </View>

      {/* Streak Card */}
      <View style={styles.streakCard}>
        <View style={styles.streakRow}>
          <View>
            <Text style={styles.streakEmoji}>{streakEmoji(streak?.currentStreak ?? 0)}</Text>
            <Text style={styles.streakCount}>{streak?.currentStreak ?? 0}</Text>
            <Text style={styles.streakLabel}>day streak</Text>
          </View>
          <View style={styles.streakDivider} />
          <View style={styles.streakStat}>
            <Text style={styles.streakStatValue}>{streak?.longestStreak ?? 0}</Text>
            <Text style={styles.streakStatLabel}>best streak</Text>
          </View>
          <View style={styles.streakStat}>
            <Text style={styles.streakStatValue}>{streak?.totalDaysCompleted ?? 0}</Text>
            <Text style={styles.streakStatLabel}>total days</Text>
          </View>
        </View>
        {streak?.lastCompletedDate === today && (
          <View style={styles.streakBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#fff" />
            <Text style={styles.streakBadgeText}>Completed today</Text>
          </View>
        )}
      </View>

      {/* Today's Progress */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Compliance</Text>
        <Text style={styles.dateLabel}>{format(new Date(), "EEEE, MMMM d")}</Text>

        <View style={styles.scoreRow}>
          <Text style={[styles.scoreNumber, { color: scoreColor }]}>{pctCapped}%</Text>
          <Text style={styles.scoreDetail}>{completedToday}/{requiredTotal} required tasks</Text>
        </View>

        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${pctCapped}%` as `${number}%`, backgroundColor: scoreColor }]} />
        </View>

        {pctCapped < 100 && (
          <Text style={styles.progressHint}>
            {requiredTotal - completedToday} task{requiredTotal - completedToday !== 1 ? "s" : ""} remaining
          </Text>
        )}
      </View>

      {/* Quick stats — last 7 days */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Overview</Text>
        <View style={styles.weekRow}>
          {Array.from({ length: 7 }).map((_, i) => {
            const d = format(subDays(new Date(), 6 - i), "EEE")
            const isToday = i === 6
            return (
              <View key={i} style={styles.weekDay}>
                <Text style={[styles.weekDayLabel, isToday && styles.weekDayLabelToday]}>{d}</Text>
                <View style={[styles.weekDot, isToday && pctCapped === 100 ? styles.weekDotGreen : isToday ? styles.weekDotAmber : styles.weekDotGray]} />
              </View>
            )
          })}
        </View>
        <Text style={styles.weekHint}>Sync with the web app to see full history</Text>
      </View>

      {/* Farm Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Farm Details</Text>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#6b7280" />
          <Text style={styles.infoText}>{farm?.stateAbbreviation ?? "—"} · {capitalize(farm?.farmType ?? "mixed")} farm</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={16} color="#6b7280" />
          <Text style={styles.infoText}>Today: {format(new Date(), "MMMM d, yyyy")}</Text>
        </View>
      </View>
    </ScrollView>
  )
}

function getTimeOfDay() {
  const h = new Date().getHours()
  if (h < 12) return "morning"
  if (h < 17) return "afternoon"
  return "evening"
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f9fafb" },
  content: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  greeting: { fontSize: 14, color: "#6b7280" },
  farmName: { fontSize: 22, fontWeight: "700", color: "#111827" },
  stateBadge: {
    backgroundColor: "#dcfce7", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
  },
  stateText: { fontSize: 13, fontWeight: "700", color: "#166534" },
  streakCard: {
    backgroundColor: "#166534", borderRadius: 16, padding: 20, marginBottom: 16,
  },
  streakRow: { flexDirection: "row", alignItems: "center" },
  streakEmoji: { fontSize: 28, marginBottom: 4 },
  streakCount: { fontSize: 42, fontWeight: "800", color: "#fff" },
  streakLabel: { fontSize: 12, color: "#86efac" },
  streakDivider: { width: 1, height: 50, backgroundColor: "#15803d", marginHorizontal: 20 },
  streakStat: { flex: 1, alignItems: "center" },
  streakStatValue: { fontSize: 24, fontWeight: "700", color: "#fff" },
  streakStatLabel: { fontSize: 11, color: "#86efac", marginTop: 2 },
  streakBadge: {
    flexDirection: "row", alignItems: "center", gap: 4,
    backgroundColor: "#15803d", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
    alignSelf: "flex-start", marginTop: 12,
  },
  streakBadgeText: { fontSize: 12, color: "#fff", fontWeight: "500" },
  card: {
    backgroundColor: "#fff", borderRadius: 16, padding: 20, marginBottom: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  cardTitle: { fontSize: 15, fontWeight: "600", color: "#111827", marginBottom: 4 },
  dateLabel: { fontSize: 12, color: "#6b7280", marginBottom: 12 },
  scoreRow: { flexDirection: "row", alignItems: "baseline", gap: 8, marginBottom: 10 },
  scoreNumber: { fontSize: 40, fontWeight: "800" },
  scoreDetail: { fontSize: 13, color: "#6b7280" },
  progressBg: { height: 8, backgroundColor: "#f3f4f6", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: 8, borderRadius: 4 },
  progressHint: { fontSize: 12, color: "#6b7280", marginTop: 8 },
  weekRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  weekDay: { alignItems: "center", gap: 6 },
  weekDayLabel: { fontSize: 11, color: "#6b7280" },
  weekDayLabelToday: { color: "#166534", fontWeight: "700" },
  weekDot: { width: 10, height: 10, borderRadius: 5 },
  weekDotGreen: { backgroundColor: "#16a34a" },
  weekDotAmber: { backgroundColor: "#d97706" },
  weekDotGray: { backgroundColor: "#e5e7eb" },
  weekHint: { fontSize: 11, color: "#9ca3af", textAlign: "center" },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  infoText: { fontSize: 14, color: "#374151" },
})
