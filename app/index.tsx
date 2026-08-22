import { router } from "expo-router";
import { Bell, Search, SlidersHorizontal, Sparkles } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import { CandidateQuickModal } from "../components/directory/CandidateQuickModal";
import { FilterChip } from "../components/directory/FilterChip";
import { TalentCard } from "../components/directory/TalentCard";
import { mockResults } from "../data/mockResults";
import { CandidateResult } from "../types/search";

const filters = ["All talent", "Engineering", "Data & AI", "Leadership", "Python", "React"];

export default function HomeScreen() {
  const [activeFilter, setActiveFilter] = useState("All talent");
  const [term, setTerm] = useState("");
  const [selected, setSelected] = useState<CandidateResult | null>(null);

  const candidates = useMemo(() => {
    const normalized = term.toLowerCase().trim();

    return mockResults.results.filter((candidate) => {
      const searchable = [candidate.name, candidate.role, candidate.skills.join(" "), candidate.summary].join(" ").toLowerCase();
      const searchMatch = !normalized || searchable.includes(normalized);
      const filterMatch =
        activeFilter === "All talent" ||
        (activeFilter === "Engineering" && /engineer|developer/i.test(candidate.role)) ||
        (activeFilter === "Data & AI" && /ai|machine learning|data/i.test(`${candidate.role} ${candidate.skills.join(" ")}`)) ||
        (activeFilter === "Leadership" && candidate.requirements.some((item) => item.name === "Leadership" && item.status === "supported")) ||
        candidate.skills.some((skill) => skill.toLowerCase() === activeFilter.toLowerCase());

      return searchMatch && filterMatch;
    });
  }, [activeFilter, term]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>TalentMatch</Text>
            <Text style={styles.brandSub}>PRIVATE TALENT DIRECTORY</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable style={styles.iconButton}><Bell size={19} color="#36514A" /></Pressable>
            <Pressable onPress={() => router.push("/search")} style={styles.aiButton}><Sparkles size={16} color="#FFFFFF" /><Text style={styles.aiButtonText}>Find with AI</Text></Pressable>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Find the right person,{"\n"}with the right evidence.</Text>
          <Text style={styles.subtitle}>Explore professional profiles and verified employer signals — privately, on your device.</Text>

          <View style={styles.searchBox}>
            <Search size={19} color="#799087" />
            <TextInput value={term} onChangeText={setTerm} placeholder="Search name, role or skill" placeholderTextColor="#9BAAA4" style={styles.input} />
            <SlidersHorizontal size={18} color="#155E59" />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
            {filters.map((filter) => <FilterChip key={filter} label={filter} active={filter === activeFilter} onPress={() => setActiveFilter(filter)} />)}
          </ScrollView>

          <View style={styles.directoryHead}>
            <View><Text style={styles.sectionTitle}>Talent directory</Text><Text style={styles.count}>{candidates.length} professionals available</Text></View>
            <Text style={styles.local}>LOCAL DATA</Text>
          </View>

          <View style={styles.grid}>
            {candidates.map((candidate, index) => <TalentCard key={candidate.candidateId} candidate={candidate} index={index} onPress={() => setSelected(candidate)} />)}
          </View>

          {candidates.length === 0 ? <View style={styles.empty}><Text style={styles.emptyTitle}>No professionals found</Text><Text style={styles.emptyText}>Try another search or clear the selected filter.</Text></View> : null}
        </ScrollView>
      </View>
      <CandidateQuickModal candidate={selected} onClose={() => setSelected(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F8F6" }, page: { flex: 1, backgroundColor: "#F7F8F6" },
  header: { backgroundColor: "#F7F8F6", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 13, paddingBottom: 17, borderBottomWidth: 1, borderBottomColor: "#E8ECE9" },
  brand: { color: "#17231F", fontSize: 20, fontWeight: "900", letterSpacing: -0.6 }, brandSub: { color: "#5F7770", fontSize: 8, fontWeight: "900", letterSpacing: 1.1, marginTop: 2 },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 8 }, iconButton: { width: 38, height: 38, borderRadius: 13, backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E5EBE7", alignItems: "center", justifyContent: "center" },
  aiButton: { minHeight: 38, borderRadius: 13, paddingHorizontal: 11, backgroundColor: "#155E59", flexDirection: "row", gap: 6, alignItems: "center", justifyContent: "center" }, aiButtonText: { color: "#FFFFFF", fontSize: 11, fontWeight: "900" },
  content: { padding: 20, paddingBottom: 38 }, title: { color: "#182520", fontWeight: "900", fontSize: 29, letterSpacing: -1.1, lineHeight: 34 }, subtitle: { color: "#71817B", fontSize: 14, lineHeight: 20, marginTop: 10 },
  searchBox: { height: 54, flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14, backgroundColor: "#FFFFFF", borderRadius: 16, borderWidth: 1, borderColor: "#E3EAE5", marginTop: 22 }, input: { flex: 1, color: "#24352F", fontSize: 14, fontWeight: "600" },
  filterRow: { gap: 8, paddingTop: 15, paddingBottom: 23 }, directoryHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }, sectionTitle: { color: "#1D2B26", fontSize: 18, fontWeight: "900" }, count: { color: "#82918B", fontSize: 12, fontWeight: "600", marginTop: 3 }, local: { color: "#397267", backgroundColor: "#E5F4EC", fontSize: 9, fontWeight: "900", letterSpacing: 0.8, overflow: "hidden", borderRadius: 7, paddingHorizontal: 8, paddingVertical: 6 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }, empty: { padding: 28, alignItems: "center", borderRadius: 18, backgroundColor: "#FFFFFF" }, emptyTitle: { color: "#2E4039", fontSize: 16, fontWeight: "900" }, emptyText: { color: "#7C8C85", textAlign: "center", marginTop: 6, fontSize: 12 },
});