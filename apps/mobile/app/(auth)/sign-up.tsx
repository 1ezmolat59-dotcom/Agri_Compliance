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

const FARM_TYPES = [
  { value: "livestock", label: "Livestock" },
  { value: "poultry", label: "Poultry" },
  { value: "crop", label: "Crop" },
  { value: "dairy", label: "Dairy" },
  { value: "swine", label: "Swine" },
  { value: "aquaculture", label: "Aquaculture" },
  { value: "mixed", label: "Mixed" },
  { value: "organic", label: "Organic" },
]

const US_STATE_ABBREVS = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
]

const DEFAULT_URL = "https://agriguard.vercel.app"

export default function SignUpScreen() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Step 1
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Step 2
  const [farmName, setFarmName] = useState("")
  const [state, setState] = useState("TX")
  const [farmType, setFarmType] = useState("mixed")
  const [serverUrl, setServerUrl] = useState(DEFAULT_URL)

  function validateStep1() {
    if (!name.trim()) { Alert.alert("Required", "Please enter your name."); return false }
    if (!email.trim() || !email.includes("@")) { Alert.alert("Required", "Please enter a valid email."); return false }
    if (password.length < 8) { Alert.alert("Required", "Password must be at least 8 characters."); return false }
    return true
  }

  async function handleRegister() {
    if (!farmName.trim()) { Alert.alert("Required", "Please enter your farm name."); return }
    setLoading(true)
    try {
      const url = serverUrl.trim().replace(/\/$/, "")
      setBaseUrl(url)
      await saveBaseUrl(url)

      const regRes = await fetch(`${url}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password, farmName: farmName.trim(), state, farmType }),
      })
      const regData = await regRes.json()
      if (!regRes.ok) {
        Alert.alert("Registration failed", regData.error ?? "Please try again.")
        return
      }

      // Auto sign-in
      const csrfRes = await fetch(`${url}/api/auth/csrf`)
      const { csrfToken } = await csrfRes.json()

      const signInRes = await fetch(`${url}/api/auth/callback/credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ email: email.trim().toLowerCase(), password, csrfToken, redirect: "false" }),
        redirect: "manual",
      })

      const sessionRes = await fetch(`${url}/api/auth/session`, {
        headers: { Cookie: signInRes.headers.get("set-cookie") ?? "" },
      })
      const sessionData = await sessionRes.json()

      if (sessionData?.user?.id) {
        await saveSession({
          token: extractSessionToken(signInRes.headers.get("set-cookie") ?? ""),
          userId: sessionData.user.id,
          name: sessionData.user.name ?? name,
          email: sessionData.user.email ?? email,
        })
        const farmRes = await fetch(`${url}/api/farm`, {
          headers: { Cookie: signInRes.headers.get("set-cookie") ?? "" },
        })
        if (farmRes.ok) {
          const farmData = await farmRes.json()
          if (farmData?.farm) await saveFarm(farmData.farm)
        }
        router.replace("/(tabs)")
      } else {
        Alert.alert("Account created!", "Please sign in with your new account.")
        router.replace("/(auth)/sign-in")
      }
    } catch {
      Alert.alert("Connection error", "Could not connect to server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Ionicons name="leaf" size={32} color="#fff" />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <View style={styles.stepRow}>
            <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]} />
            <View style={styles.stepLine} />
            <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]} />
          </View>
          <Text style={styles.stepLabel}>Step {step} of 2</Text>
        </View>

        <View style={styles.card}>
          {step === 1 ? (
            <>
              <Text style={styles.cardTitle}>Your Information</Text>

              <View style={styles.field}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Jane Smith" placeholderTextColor="#9ca3af" />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="jane@farm.com"
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
                    placeholder="Min. 8 characters"
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#9ca3af"
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                    <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.btn}
                onPress={() => { if (validateStep1()) setStep(2) }}
              >
                <Text style={styles.btnText}>Continue</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.cardTitle}>Your Farm</Text>

              <View style={styles.field}>
                <Text style={styles.label}>Farm Name</Text>
                <TextInput style={styles.input} value={farmName} onChangeText={setFarmName} placeholder="Sunrise Valley Farm" placeholderTextColor="#9ca3af" />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>State</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                  {US_STATE_ABBREVS.map((abbr) => (
                    <TouchableOpacity
                      key={abbr}
                      style={[styles.chip, state === abbr && styles.chipActive]}
                      onPress={() => setState(abbr)}
                    >
                      <Text style={[styles.chipText, state === abbr && styles.chipTextActive]}>{abbr}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Farm Type</Text>
                <View style={styles.farmTypeGrid}>
                  {FARM_TYPES.map((ft) => (
                    <TouchableOpacity
                      key={ft.value}
                      style={[styles.farmTypeChip, farmType === ft.value && styles.chipActive]}
                      onPress={() => setFarmType(ft.value)}
                    >
                      <Text style={[styles.chipText, farmType === ft.value && styles.chipTextActive]}>{ft.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Server URL</Text>
                <TextInput
                  style={styles.input}
                  value={serverUrl}
                  onChangeText={setServerUrl}
                  placeholder="https://agriguard.vercel.app"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="url"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.btnOutline} onPress={() => setStep(1)}>
                  <Text style={styles.btnOutlineText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, styles.btnFlex, loading && styles.btnDisabled]}
                  onPress={handleRegister}
                  disabled={loading}
                >
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Create Account</Text>}
                </TouchableOpacity>
              </View>
            </>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
              <Text style={styles.link}>Sign in</Text>
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
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: "#166534", alignItems: "center", justifyContent: "center", marginBottom: 12,
  },
  title: { fontSize: 26, fontWeight: "700", color: "#111827", marginBottom: 12 },
  stepRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  stepDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#d1d5db" },
  stepDotActive: { backgroundColor: "#166534" },
  stepLine: { width: 40, height: 2, backgroundColor: "#d1d5db", marginHorizontal: 4 },
  stepLabel: { fontSize: 12, color: "#6b7280" },
  card: {
    backgroundColor: "#fff", borderRadius: 16, padding: 24,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#111827", marginBottom: 20 },
  field: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "500", color: "#374151", marginBottom: 6 },
  input: {
    borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 12, fontSize: 15, color: "#111827", backgroundColor: "#fff",
  },
  passwordRow: { flexDirection: "row", alignItems: "center" },
  passwordInput: { flex: 1 },
  eyeBtn: { position: "absolute", right: 12, padding: 4 },
  chipScroll: { flexDirection: "row" },
  chip: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
    borderWidth: 1, borderColor: "#e5e7eb", marginRight: 6, backgroundColor: "#fff",
  },
  chipActive: { backgroundColor: "#166534", borderColor: "#166534" },
  chipText: { fontSize: 12, color: "#374151" },
  chipTextActive: { color: "#fff" },
  farmTypeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  farmTypeChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1, borderColor: "#e5e7eb", backgroundColor: "#fff",
  },
  btn: { backgroundColor: "#166534", borderRadius: 10, paddingVertical: 14, alignItems: "center", marginTop: 8 },
  btnFlex: { flex: 1 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  btnOutline: {
    borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 10,
    paddingVertical: 14, alignItems: "center", marginTop: 8, marginRight: 8, paddingHorizontal: 20,
  },
  btnOutlineText: { color: "#374151", fontSize: 16, fontWeight: "500" },
  btnRow: { flexDirection: "row", alignItems: "center" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 20 },
  footerText: { fontSize: 14, color: "#6b7280" },
  link: { fontSize: 14, color: "#166534", fontWeight: "600" },
})
