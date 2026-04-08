import { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useAuth } from "@/context/auth"
import { loadBaseUrl, saveBaseUrl } from "@/lib/storage"
import { setBaseUrl } from "@/lib/api"
import { useEffect } from "react"

export default function MoreTab() {
  const { session, farm, streak, signOut } = useAuth()
  const [serverUrl, setServerUrl] = useState("")
  const [editingUrl, setEditingUrl] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    loadBaseUrl().then((url) => { setServerUrl(url); setUrlInput(url) })
  }, [])

  async function saveUrl() {
    const url = urlInput.trim().replace(/\/$/, "")
    await saveBaseUrl(url)
    setBaseUrl(url)
    setServerUrl(url)
    setEditingUrl(false)
    Alert.alert("Saved", "Server URL updated.")
  }

  async function handleSync() {
    if (!serverUrl) { Alert.alert("No server", "Please configure the server URL first."); return }
    setSyncing(true)
    try {
      const res = await fetch(`${serverUrl}/api/farm`)
      if (res.ok) {
        Alert.alert("Synced", "Farm data has been refreshed.")
      } else {
        Alert.alert("Sync failed", "Could not reach server. Check your URL and connection.")
      }
    } catch {
      Alert.alert("Connection error", "Could not reach the server.")
    } finally {
      setSyncing(false)
    }
  }

  async function handleSignOut() {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => { await signOut() },
      },
    ])
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>More</Text>

      {/* Account */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.card}>
          <View style={styles.accountRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{session?.name?.charAt(0)?.toUpperCase() ?? "?"}</Text>
            </View>
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{session?.name ?? "—"}</Text>
              <Text style={styles.accountEmail}>{session?.email ?? "—"}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Farm */}
      {farm && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Farm</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Ionicons name="leaf-outline" size={18} color="#166534" />
              <Text style={styles.rowLabel}>{farm.name}</Text>
            </View>
            <View style={[styles.row, styles.rowBorder]}>
              <Ionicons name="location-outline" size={18} color="#6b7280" />
              <Text style={styles.rowText}>{farm.stateAbbreviation} · {farm.farmType}</Text>
            </View>
            {streak && (
              <View style={styles.row}>
                <Ionicons name="flame-outline" size={18} color="#d97706" />
                <Text style={styles.rowText}>{streak.currentStreak} day streak · {streak.totalDaysCompleted} total days</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Server Connection */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Server Connection</Text>
        <View style={styles.card}>
          {editingUrl ? (
            <View>
              <Text style={styles.label}>Server URL</Text>
              <TextInput
                style={styles.input}
                value={urlInput}
                onChangeText={setUrlInput}
                placeholder="https://agriguard.vercel.app"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                placeholderTextColor="#9ca3af"
              />
              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.btnOutline} onPress={() => setEditingUrl(false)}>
                  <Text style={styles.btnOutlineText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnFlex]} onPress={saveUrl}>
                  <Text style={styles.btnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.row}>
                <Ionicons name="server-outline" size={18} color="#6b7280" />
                <Text style={styles.rowText} numberOfLines={1}>
                  {serverUrl || "Not configured"}
                </Text>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => setEditingUrl(true)}>
                  <Ionicons name="pencil-outline" size={16} color="#166534" />
                  <Text style={styles.actionBtnText}>Edit URL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={handleSync} disabled={syncing}>
                  <Ionicons name="sync-outline" size={16} color="#166534" />
                  <Text style={styles.actionBtnText}>{syncing ? "Syncing…" : "Sync Now"}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>

      {/* Resources */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Resources</Text>
        <View style={styles.card}>
          {[
            { icon: "globe-outline", label: "USDA APHIS", url: "https://www.aphis.usda.gov" },
            { icon: "shield-outline", label: "FDA FSMA", url: "https://www.fda.gov/food/food-safety-modernization-act-fsma" },
            { icon: "flask-outline", label: "EPA Pesticides", url: "https://www.epa.gov/pesticides" },
          ].map((item) => (
            <TouchableOpacity
              key={item.url}
              style={[styles.row, styles.rowBorder]}
              onPress={() => Linking.openURL(item.url)}
            >
              <Ionicons name={item.icon as never} size={18} color="#6b7280" />
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Ionicons name="open-outline" size={14} color="#9ca3af" style={styles.rowChevron} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>About</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="information-circle-outline" size={18} color="#6b7280" />
            <Text style={styles.rowText}>AgriGuard v1.0.0</Text>
          </View>
          <View style={[styles.row, styles.rowBorder]}>
            <Ionicons name="map-outline" size={18} color="#6b7280" />
            <Text style={styles.rowText}>Covers all 50 U.S. states</Text>
          </View>
        </View>
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={18} color="#dc2626" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f9fafb" },
  content: { padding: 20, paddingBottom: 60 },
  title: { fontSize: 22, fontWeight: "700", color: "#111827", marginBottom: 24 },
  section: { marginBottom: 20 },
  sectionLabel: { fontSize: 12, fontWeight: "600", color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 },
  card: {
    backgroundColor: "#fff", borderRadius: 16, padding: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  accountRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  avatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: "#166534", alignItems: "center", justifyContent: "center",
  },
  avatarText: { fontSize: 20, fontWeight: "700", color: "#fff" },
  accountInfo: { flex: 1 },
  accountName: { fontSize: 16, fontWeight: "600", color: "#111827" },
  accountEmail: { fontSize: 13, color: "#6b7280", marginTop: 2 },
  row: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 8 },
  rowBorder: { borderTopWidth: 1, borderTopColor: "#f3f4f6" },
  rowLabel: { flex: 1, fontSize: 14, fontWeight: "500", color: "#111827" },
  rowText: { flex: 1, fontSize: 14, color: "#374151" },
  rowChevron: { marginLeft: "auto" },
  actionRow: { flexDirection: "row", gap: 10, marginTop: 10, borderTopWidth: 1, borderTopColor: "#f3f4f6", paddingTop: 10 },
  actionBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: "#f0fdf4", borderRadius: 10, paddingVertical: 10 },
  actionBtnText: { fontSize: 13, fontWeight: "500", color: "#166534" },
  label: { fontSize: 12, fontWeight: "500", color: "#374151", marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: "#111827", marginBottom: 12,
  },
  btnRow: { flexDirection: "row", gap: 8 },
  btn: { backgroundColor: "#166534", borderRadius: 10, paddingVertical: 10, alignItems: "center" },
  btnFlex: { flex: 1 },
  btnText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  btnOutline: { borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16, alignItems: "center" },
  btnOutlineText: { color: "#374151", fontSize: 14 },
  signOutBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    backgroundColor: "#fff", borderRadius: 16, paddingVertical: 16,
    borderWidth: 1, borderColor: "#fecaca",
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  signOutText: { fontSize: 15, fontWeight: "600", color: "#dc2626" },
})
