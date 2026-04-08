import { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { US_STATES, getStateByAbbreviation } from "@agriguard/compliance-data"
import { loadFarm } from "@/lib/storage"
import { useEffect } from "react"

interface Farm { id: string; name: string; stateAbbreviation: string; farmType: string }

export default function ComplianceTab() {
  const [query, setQuery] = useState("")
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [myState, setMyState] = useState<string | null>(null)

  useEffect(() => {
    loadFarm<Farm>().then((f) => { if (f) setMyState(f.stateAbbreviation) })
  }, [])

  const filtered = US_STATES.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.abbreviation.toLowerCase().includes(query.toLowerCase()),
  )

  if (selectedState) {
    return <StateDetail abbr={selectedState} myState={myState} onBack={() => setSelectedState(null)} />
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>50-State Compliance</Text>
      <Text style={styles.subtitle}>Browse agricultural regulations for all U.S. states</Text>

      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color="#9ca3af" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Search states..."
          placeholderTextColor="#9ca3af"
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={18} color="#9ca3af" />
          </TouchableOpacity>
        )}
      </View>

      {myState && !query && (
        <View style={styles.myStateSection}>
          <Text style={styles.sectionLabel}>Your State</Text>
          <TouchableOpacity style={styles.myStateCard} onPress={() => setSelectedState(myState)}>
            <View style={styles.myStateLeft}>
              <Text style={styles.myStateAbbr}>{myState}</Text>
              <Text style={styles.myStateName}>{getStateByAbbreviation(myState)?.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#166534" />
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.sectionLabel}>All States ({filtered.length})</Text>
      <View style={styles.grid}>
        {filtered.map((s) => (
          <TouchableOpacity
            key={s.abbreviation}
            style={[styles.stateCard, s.abbreviation === myState && styles.stateCardActive]}
            onPress={() => setSelectedState(s.abbreviation)}
          >
            <Text style={[styles.stateAbbr, s.abbreviation === myState && styles.stateAbbrActive]}>
              {s.abbreviation}
            </Text>
            <Text style={[styles.stateName, s.abbreviation === myState && styles.stateNameActive]} numberOfLines={2}>
              {s.name}
            </Text>
            {s.abbreviation === myState && (
              <View style={styles.myBadge}><Text style={styles.myBadgeText}>My Farm</Text></View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

function StateDetail({ abbr, myState, onBack }: { abbr: string; myState: string | null; onBack: () => void }) {
  const state = getStateByAbbreviation(abbr)
  if (!state) return null

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Ionicons name="arrow-back" size={20} color="#166534" />
        <Text style={styles.backText}>All States</Text>
      </TouchableOpacity>

      <View style={styles.stateHeader}>
        <Text style={styles.stateHeaderAbbr}>{state.abbreviation}</Text>
        <View style={styles.stateHeaderInfo}>
          <Text style={styles.stateHeaderName}>{state.name}</Text>
          {abbr === myState && (
            <View style={styles.myBadgeLg}><Text style={styles.myBadgeText}>My State</Text></View>
          )}
        </View>
      </View>

      {/* Dept of Agriculture */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Department of Agriculture</Text>
        <Text style={styles.cardText}>{state.agDepartment.name}</Text>
        {state.agDepartment.phone && (
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${state.agDepartment.phone}`)}>
            <Text style={styles.phoneLink}>{state.agDepartment.phone}</Text>
          </TouchableOpacity>
        )}
        {state.agDepartment.website && (
          <TouchableOpacity onPress={() => Linking.openURL(state.agDepartment.website!)}>
            <Text style={styles.websiteLink}>Visit Website →</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Regulations */}
      {state.regulations.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Key Regulations ({state.regulations.length})</Text>
          {state.regulations.map((reg, i) => (
            <View key={i} style={[styles.regItem, i < state.regulations.length - 1 && styles.regItemBorder]}>
              <Text style={styles.regTitle}>{reg.title}</Text>
              <Text style={styles.regCitation}>{reg.citation}</Text>
              {reg.description && <Text style={styles.regDesc}>{reg.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* Reportable Diseases */}
      {state.reportableDiseases.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reportable Diseases ({state.reportableDiseases.length})</Text>
          {state.reportableDiseases.slice(0, 10).map((d, i) => (
            <View key={i} style={styles.diseaseRow}>
              <View style={styles.diseaseDot} />
              <View style={styles.diseaseInfo}>
                <Text style={styles.diseaseName}>{d.name}</Text>
                {d.reportingTimeframe && (
                  <Text style={styles.diseaseTime}>Report within: {d.reportingTimeframe}</Text>
                )}
              </View>
            </View>
          ))}
          {state.reportableDiseases.length > 10 && (
            <Text style={styles.moreText}>+{state.reportableDiseases.length - 10} more diseases</Text>
          )}
        </View>
      )}

      {/* Pesticides */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pesticide Requirements</Text>
        <View style={styles.pesticideRow}>
          <Text style={styles.pesticideLabel}>License required:</Text>
          <Text style={[styles.pesticideValue, { color: state.pesticides.licenseRequired ? "#dc2626" : "#16a34a" }]}>
            {state.pesticides.licenseRequired ? "Yes" : "No"}
          </Text>
        </View>
        <View style={styles.pesticideRow}>
          <Text style={styles.pesticideLabel}>Licensing body:</Text>
          <Text style={styles.pesticideValue}>{state.pesticides.licenseBody}</Text>
        </View>
        <View style={styles.pesticideRow}>
          <Text style={styles.pesticideLabel}>Records retention:</Text>
          <Text style={styles.pesticideValue}>{state.pesticides.recordkeepingYears} years</Text>
        </View>
      </View>

      {/* Biosecurity */}
      {state.biosecurityRequirements.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Biosecurity Requirements</Text>
          {state.biosecurityRequirements.map((req, i) => (
            <View key={i} style={styles.bioRow}>
              <Ionicons name="shield-checkmark-outline" size={14} color="#166534" />
              <Text style={styles.bioText}>{req}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f9fafb" },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: "700", color: "#111827", marginBottom: 4 },
  subtitle: { fontSize: 13, color: "#6b7280", marginBottom: 16 },
  searchRow: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#fff",
    borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10,
    borderWidth: 1, borderColor: "#e5e7eb", marginBottom: 20,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: "#111827" },
  myStateSection: { marginBottom: 20 },
  sectionLabel: { fontSize: 12, fontWeight: "600", color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 },
  myStateCard: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#f0fdf4",
    borderRadius: 14, padding: 16, borderWidth: 1.5, borderColor: "#86efac",
  },
  myStateLeft: { flex: 1 },
  myStateAbbr: { fontSize: 24, fontWeight: "800", color: "#166534" },
  myStateName: { fontSize: 13, color: "#15803d", marginTop: 2 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  stateCard: {
    width: "30%", backgroundColor: "#fff", borderRadius: 12, padding: 12,
    borderWidth: 1, borderColor: "#e5e7eb", alignItems: "center",
  },
  stateCardActive: { backgroundColor: "#f0fdf4", borderColor: "#86efac" },
  stateAbbr: { fontSize: 18, fontWeight: "700", color: "#111827" },
  stateAbbrActive: { color: "#166534" },
  stateName: { fontSize: 10, color: "#6b7280", textAlign: "center", marginTop: 2 },
  stateNameActive: { color: "#15803d" },
  myBadge: { backgroundColor: "#166534", borderRadius: 6, paddingHorizontal: 5, paddingVertical: 2, marginTop: 4 },
  myBadgeLg: { backgroundColor: "#166534", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, alignSelf: "flex-start", marginTop: 4 },
  myBadgeText: { fontSize: 9, color: "#fff", fontWeight: "700" },
  backBtn: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 20 },
  backText: { fontSize: 15, color: "#166534", fontWeight: "500" },
  stateHeader: { flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 20 },
  stateHeaderAbbr: { fontSize: 48, fontWeight: "800", color: "#166534" },
  stateHeaderInfo: { flex: 1 },
  stateHeaderName: { fontSize: 22, fontWeight: "700", color: "#111827" },
  card: {
    backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 16,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  cardTitle: { fontSize: 14, fontWeight: "600", color: "#111827", marginBottom: 12 },
  cardText: { fontSize: 14, color: "#374151", marginBottom: 6 },
  phoneLink: { fontSize: 14, color: "#166534", fontWeight: "500", marginBottom: 4 },
  websiteLink: { fontSize: 13, color: "#2563eb", marginTop: 4 },
  regItem: { paddingVertical: 10 },
  regItemBorder: { borderBottomWidth: 1, borderBottomColor: "#f3f4f6" },
  regTitle: { fontSize: 14, fontWeight: "500", color: "#111827" },
  regCitation: { fontSize: 12, color: "#166534", fontWeight: "500", marginTop: 2 },
  regDesc: { fontSize: 12, color: "#6b7280", marginTop: 4, lineHeight: 17 },
  diseaseRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 8 },
  diseaseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#166534", marginTop: 6 },
  diseaseInfo: { flex: 1 },
  diseaseName: { fontSize: 13, color: "#374151", fontWeight: "500" },
  diseaseTime: { fontSize: 11, color: "#dc2626", marginTop: 1 },
  moreText: { fontSize: 12, color: "#6b7280", textAlign: "center", marginTop: 8 },
  pesticideRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "#f3f4f6" },
  pesticideLabel: { fontSize: 13, color: "#6b7280" },
  pesticideValue: { fontSize: 13, fontWeight: "500", color: "#374151" },
  bioRow: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 8 },
  bioText: { flex: 1, fontSize: 13, color: "#374151", lineHeight: 18 },
})
