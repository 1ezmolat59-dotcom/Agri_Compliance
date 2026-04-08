import { useCallback, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native"
import { useFocusEffect } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { format } from "date-fns"
import { DEFAULT_CHECKLIST_ITEMS, CHECKLIST_CATEGORIES } from "@agriguard/compliance-data"
import { loadFarm, loadCompletions, saveCompletions } from "@/lib/storage"
import { loadBaseUrl, setBaseUrl, markComplete, unmarkComplete } from "@/lib/api"

interface Farm { id: string; name: string; stateAbbreviation: string; farmType: string }

const FREQ_TABS = ["daily", "weekly", "monthly"] as const
type Freq = typeof FREQ_TABS[number]

export default function ChecklistsTab() {
  const [farm, setFarm] = useState<Farm | null>(null)
  const [completions, setCompletions] = useState<string[]>([])
  const [activeFreq, setActiveFreq] = useState<Freq>("daily")
  const [toggling, setToggling] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const today = format(new Date(), "yyyy-MM-dd")

  async function load() {
    const f = await loadFarm<Farm>()
    const c = await loadCompletions()
    setFarm(f)
    setCompletions(c)
    const url = await loadBaseUrl()
    if (url) setBaseUrl(url)
  }

  useFocusEffect(useCallback(() => { load() }, []))

  async function toggle(itemId: string) {
    if (!farm || toggling) return
    setToggling(itemId)
    const isDone = completions.includes(itemId)
    // Optimistic update
    const next = isDone ? completions.filter((id) => id !== itemId) : [...completions, itemId]
    setCompletions(next)
    await saveCompletions(next)
    try {
      if (isDone) {
        await unmarkComplete(farm.id, itemId)
      } else {
        await markComplete(farm.id, itemId)
      }
    } catch {
      // Revert on failure
      setCompletions(completions)
      await saveCompletions(completions)
    } finally {
      setToggling(null)
    }
  }

  async function onRefresh() {
    setRefreshing(true)
    await load()
    setRefreshing(false)
  }

  const farmType = farm?.farmType ?? "mixed"
  const items = DEFAULT_CHECKLIST_ITEMS.filter(
    (i) =>
      i.frequency === activeFreq &&
      (i.applicableTo.includes("all") || i.applicableTo.includes(farmType as never)),
  )

  const required = items.filter((i) => i.required)
  const optional = items.filter((i) => !i.required)
  const completedRequired = required.filter((i) => completions.includes(i.id)).length
  const pct = required.length > 0 ? Math.round((completedRequired / required.length) * 100) : 100

  // Group by category
  const grouped = new Map<string, typeof items>()
  for (const item of items) {
    const existing = grouped.get(item.category) ?? []
    grouped.set(item.category, [...existing, item])
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#166534" />}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Daily Checklists</Text>
        <Text style={styles.date}>{format(new Date(), "MMM d, yyyy")}</Text>
      </View>

      {/* Progress */}
      {activeFreq === "daily" && (
        <View style={styles.progressCard}>
          <View style={styles.progressRow}>
            <Text style={styles.progressPct}>{pct}%</Text>
            <Text style={styles.progressLabel}>{completedRequired}/{required.length} required</Text>
          </View>
          <View style={styles.progressBg}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${pct}%` as `${number}%`,
                  backgroundColor: pct >= 90 ? "#16a34a" : pct >= 70 ? "#d97706" : "#dc2626",
                },
              ]}
            />
          </View>
        </View>
      )}

      {/* Frequency Tabs */}
      <View style={styles.tabs}>
        {FREQ_TABS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.tab, activeFreq === f && styles.tabActive]}
            onPress={() => setActiveFreq(f)}
          >
            <Text style={[styles.tabText, activeFreq === f && styles.tabTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Items by Category */}
      {Array.from(grouped.entries()).map(([category, catItems]) => {
        const catMeta = CHECKLIST_CATEGORIES.find((c) => c.id === category)
        return (
          <View key={category} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{catMeta?.label ?? category}</Text>
              <Text style={styles.sectionCount}>
                {catItems.filter((i) => completions.includes(i.id)).length}/{catItems.length}
              </Text>
            </View>

            {catItems.map((item) => {
              const done = completions.includes(item.id)
              const isToggling = toggling === item.id
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.item, done && styles.itemDone]}
                  onPress={() => toggle(item.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemLeft}>
                    {isToggling ? (
                      <ActivityIndicator size="small" color="#166534" />
                    ) : (
                      <View style={[styles.checkbox, done && styles.checkboxDone]}>
                        {done && <Ionicons name="checkmark" size={14} color="#fff" />}
                      </View>
                    )}
                  </View>
                  <View style={styles.itemContent}>
                    <View style={styles.itemTitleRow}>
                      <Text style={[styles.itemTitle, done && styles.itemTitleDone]} numberOfLines={2}>
                        {item.task}
                      </Text>
                      {item.required && !done && (
                        <View style={styles.requiredBadge}>
                          <Text style={styles.requiredText}>Required</Text>
                        </View>
                      )}
                    </View>
                    {item.regulatoryBasis && (
                      <Text style={styles.itemBasis} numberOfLines={1}>{item.regulatoryBasis}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        )
      })}

      {items.length === 0 && (
        <View style={styles.empty}>
          <Ionicons name="checkbox-outline" size={48} color="#d1d5db" />
          <Text style={styles.emptyText}>No {activeFreq} tasks for this farm type</Text>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f9fafb" },
  content: { padding: 20, paddingBottom: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "700", color: "#111827" },
  date: { fontSize: 13, color: "#6b7280" },
  progressCard: {
    backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  progressRow: { flexDirection: "row", alignItems: "baseline", gap: 8, marginBottom: 8 },
  progressPct: { fontSize: 28, fontWeight: "700", color: "#166534" },
  progressLabel: { fontSize: 13, color: "#6b7280" },
  progressBg: { height: 8, backgroundColor: "#f3f4f6", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: 8, borderRadius: 4 },
  tabs: { flexDirection: "row", backgroundColor: "#f3f4f6", borderRadius: 12, padding: 4, marginBottom: 20 },
  tab: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 10 },
  tabActive: { backgroundColor: "#fff", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1 },
  tabText: { fontSize: 13, fontWeight: "500", color: "#6b7280" },
  tabTextActive: { color: "#166534", fontWeight: "600" },
  section: { marginBottom: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  sectionTitle: { fontSize: 13, fontWeight: "600", color: "#374151", textTransform: "uppercase", letterSpacing: 0.5 },
  sectionCount: { fontSize: 12, color: "#6b7280" },
  item: {
    flexDirection: "row", backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 8,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1,
  },
  itemDone: { opacity: 0.7 },
  itemLeft: { width: 28, alignItems: "center", paddingTop: 2 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: "#d1d5db",
    alignItems: "center", justifyContent: "center",
  },
  checkboxDone: { backgroundColor: "#166534", borderColor: "#166534" },
  itemContent: { flex: 1, marginLeft: 10 },
  itemTitleRow: { flexDirection: "row", alignItems: "flex-start", gap: 6 },
  itemTitle: { flex: 1, fontSize: 14, color: "#111827", lineHeight: 20 },
  itemTitleDone: { textDecorationLine: "line-through", color: "#6b7280" },
  requiredBadge: { backgroundColor: "#fef3c7", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  requiredText: { fontSize: 10, color: "#92400e", fontWeight: "600" },
  itemBasis: { fontSize: 11, color: "#9ca3af", marginTop: 3 },
  empty: { alignItems: "center", paddingVertical: 60 },
  emptyText: { fontSize: 14, color: "#9ca3af", marginTop: 12, textAlign: "center" },
})
