import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { setBaseUrl, saveSession } from "@/lib/api"
import { saveFarm, saveBaseUrl } from "@/lib/storage"

const DEFAULT_URL = "https://agriguard.vercel.app"

export default function SignInScreen() {
  const router = useRouter()
  const [serverUrl, setServerUrl] = useState(DEFAULT_URL)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showUrlField, setShowUrlField] = useState(false)

  async function handleSignIn() {
    if (!email.trim() || !password) {
      Alert.alert("Missing fields", "Please enter your email and password.")
      return
    }
    setLoading(true)
    try {
      const url = serverUrl.trim().replace(/\/$/, "")
      setBaseUrl(url)
      await saveBaseUrl(url)

      // Get CSRF token first
      const csrfRes = await fetch(`${url}/api/auth/csrf`)
      const { csrfToken } = await csrfRes.json()

      // Sign in via NextAuth credentials
      const res = await fetch(`${url}/api/auth/callback/credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email: email.trim().toLowerCase(), password, csrfToken, redirect: "false" }),
        redirect: "manual",
      })

      if (res.status !== 200 && res.status !== 302) {
        Alert.alert("Sign in failed", "Invalid email or password.")
        return
      }

      // Fetch session data
      const sessionRes = await fetch(`${url}/api/auth/session`, {
        headers: { Cookie: res.headers.get("set-cookie") ?? "" },
      })
      const sessionData = await sessionRes.json()

      if (!sessionData?.user?.id) {
        Alert.alert("Sign in failed", "Could not establish session.")
        return
      }

      await saveSession({
        token: extractSessionToken(res.headers.get("set-cookie") ?? ""),
        userId: sessionData.user.id,
        name: sessionData.user.name ?? "",
        email: sessionData.user.email ?? "",
      })

      // Fetch farm data
      const farmRes = await fetch(`${url}/api/farm`, {
        headers: { Cookie: res.headers.get("set-cookie") ?? "" },
      })
      if (farmRes.ok) {
        const farmData = await farmRes.json()
        if (farmData?.farm) await saveFarm(farmData.farm)
      }

      router.replace("/(tabs)")
    } catch (err) {
      Alert.alert("Connection error", "Could not connect to server. Check the server URL.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Ionicons name="leaf" size={32} color="#fff" />
          </View>
          <Text style={styles.title}>AgriGuard</Text>
          <Text style={styles.subtitle}>Farm Compliance Platform</Text>
        </View>

        {/* Form */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign in to your account</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="farmer@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Server URL (advanced) */}
          <TouchableOpacity onPress={() => setShowUrlField(!showUrlField)} style={styles.advancedToggle}>
            <Text style={styles.advancedText}>
              {showUrlField ? "▲" : "▼"} Server URL (advanced)
            </Text>
          </TouchableOpacity>
          {showUrlField && (
            <View style={styles.field}>
              <TextInput
                style={styles.input}
                value={serverUrl}
                onChangeText={setServerUrl}
                placeholder="https://your-app.vercel.app"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                placeholderTextColor="#9ca3af"
              />
            </View>
          )}

          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

function extractSessionToken(cookieHeader: string): string {
  const match = cookieHeader.match(/next-auth\.session-token=([^;]+)/)
  return match?.[1] ?? ""
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: "#f9fafb" },
  container: { flexGrow: 1, justifyContent: "center", padding: 24 },
  header: { alignItems: "center", marginBottom: 32 },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#166534",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: { fontSize: 28, fontWeight: "700", color: "#111827" },
  subtitle: { fontSize: 14, color: "#6b7280", marginTop: 4 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#111827", marginBottom: 20 },
  field: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "500", color: "#374151", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#fff",
  },
  passwordRow: { flexDirection: "row", alignItems: "center" },
  passwordInput: { flex: 1 },
  eyeBtn: { position: "absolute", right: 12, padding: 4 },
  advancedToggle: { marginBottom: 12 },
  advancedText: { fontSize: 12, color: "#6b7280" },
  btn: {
    backgroundColor: "#166534",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  footerText: { fontSize: 14, color: "#6b7280" },
  link: { fontSize: 14, color: "#166534", fontWeight: "600" },
})
