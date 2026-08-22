import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Sparkles, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Modal, Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { CandidateList } from "../../components/candidates/CandidateList";
import { EvidenceCard } from "../../components/evidence/EvidenceCard";
import { RequirementRow } from "../../components/evidence/RequirementRow";
import { AgentProgress } from "../../components/search/AgentProgress";
import { NoMatchState } from "../../components/ui/NoMatchState";
import { mockResults } from "../../data/mockResults";
import { CandidateResult } from "../../types/search";

type State = "loading" | "success" | "no_match";

export default function ResultsScreen() {
  const { query } = useLocalSearchParams<{ query: string }>();
  const [state, setState] = useState<State>("loading");
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<CandidateResult | null>(null);

  useEffect(() => {
    const timeout = setInterval(() => {
      setStep((previous) => {
        if (previous >= 6) { clearInterval(timeout); setState("success"); return previous; }
        return previous + 1;
      });
    }, 620);
    return () => clearInterval(timeout);
  }, []);

  const forceNoMatch = String(query || "").toLowerCase().includes("rust");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#071426", "#071B31", "#081525"]} style={styles.background}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.back()} style={styles.back}><ArrowLeft size={18} color="#BAE6FD" /><Text style={styles.backText}>New search</Text></Pressable>
          {state === "loading" ? <AgentProgress currentStep={step} /> : null}
          {state === "success" && !forceNoMatch ? (
            <View style={styles.results}>
              <View style={styles.top}><View><Text style={styles.eyebrow}>EVIDENCE-BASED SHORTLIST</Text><Text style={styles.title}>Recommended candidates</Text></View><View style={styles.count}><Text style={styles.countNumber}>{mockResults.results.length}</Text><Text style={styles.countText}>MATCHES</Text></View></View>
              <View style={styles.requirementsCard}><View style={styles.reqHead}><Sparkles size={17} color="#A78BFA" /><Text style={styles.reqTitle}>AI identified requirements</Text></View><View style={styles.tags}>{[...mockResults.requirements.required, ...mockResults.requirements.preferred].map((item) => <View key={item} style={styles.tag}><Text style={styles.tagText}>{item}</Text></View>)}</View></View>
              <Text style={styles.sort}>Ranked by verified evidence — not only self-reported claims.</Text>
              <CandidateList candidates={mockResults.results} onSelect={setSelected} />
              <View style={styles.human}><Text style={styles.humanTitle}>Human decision required</Text><Text style={styles.humanText}>TalentMatch assists screening; final hiring decisions remain human.</Text></View>
            </View>
          ) : null}
          {state === "success" && forceNoMatch ? <NoMatchState onStartOver={() => router.replace("/")} /> : null}
        </ScrollView>

        <Modal visible={Boolean(selected)} transparent animationType="slide" onRequestClose={() => setSelected(null)}>
          <View style={styles.overlay}><View style={styles.sheet}><View style={styles.handle} /><View style={styles.modalHead}><View><Text style={styles.modalEyebrow}>WHY WAS THIS CANDIDATE RECOMMENDED?</Text><Text style={styles.modalTitle}>{selected?.name}</Text></View><Pressable onPress={() => setSelected(null)} style={styles.close}><X size={20} color="#CBD5E1" /></Pressable></View><ScrollView showsVerticalScrollIndicator={false}><Text style={styles.experience}>{selected?.experience}</Text>{selected?.requirements.map((item) => <RequirementRow key={item.name} item={item} />)}{selected ? <EvidenceCard review={selected.review} /> : null}<View style={styles.summary}><Text style={styles.summaryLabel}>LOCAL AI SUMMARY</Text><Text style={styles.summaryText}>{selected?.summary}</Text></View></ScrollView></View></View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#071426" }, background: { flex: 1 }, content: { padding: 20, paddingBottom: 40 },
  back: { alignSelf: "flex-start", flexDirection: "row", gap: 7, alignItems: "center", paddingVertical: 8 }, backText: { color: "#BAE6FD", fontSize: 13, fontWeight: "800" },
  results: { gap: 14, paddingTop: 18 }, top: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }, eyebrow: { color: "#38BDF8", fontSize: 10, fontWeight: "900", letterSpacing: 1 }, title: { color: "#F8FAFC", fontSize: 26, fontWeight: "900", letterSpacing: -0.7, marginTop: 5 },
  count: { alignItems: "center", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 13, backgroundColor: "rgba(56,189,248,0.10)" }, countNumber: { color: "#7DD3FC", fontSize: 17, fontWeight: "900" }, countText: { color: "#38BDF8", fontSize: 8, fontWeight: "900", letterSpacing: 0.8 },
  requirementsCard: { padding: 14, borderRadius: 18, gap: 12, backgroundColor: "rgba(139,92,246,0.10)", borderWidth: 1, borderColor: "rgba(167,139,250,0.20)" }, reqHead: { flexDirection: "row", alignItems: "center", gap: 8 }, reqTitle: { color: "#DDD6FE", fontSize: 13, fontWeight: "800" }, tags: { flexDirection: "row", flexWrap: "wrap", gap: 7 }, tag: { backgroundColor: "rgba(196,181,253,0.12)", borderRadius: 9, paddingHorizontal: 9, paddingVertical: 6 }, tagText: { color: "#EDE9FE", fontSize: 11, fontWeight: "700" },
  sort: { color: "#94A3B8", fontSize: 12, fontWeight: "600", marginVertical: 4 }, human: { padding: 15, borderRadius: 18, backgroundColor: "rgba(56,189,248,0.07)", marginTop: 4 }, humanTitle: { color: "#E0F2FE", fontSize: 13, fontWeight: "800" }, humanText: { color: "#94A3B8", lineHeight: 17, fontSize: 12, marginTop: 3 },
  overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.66)" }, sheet: { maxHeight: "83%", padding: 20, paddingBottom: 34, backgroundColor: "#0A1C31", borderTopLeftRadius: 30, borderTopRightRadius: 30, borderWidth: 1, borderColor: "rgba(148,163,184,0.17)" }, handle: { width: 44, height: 5, borderRadius: 8, backgroundColor: "#334155", alignSelf: "center", marginBottom: 20 }, modalHead: { flexDirection: "row", justifyContent: "space-between", gap: 12, marginBottom: 11 }, modalEyebrow: { color: "#38BDF8", fontSize: 9, fontWeight: "900", letterSpacing: 0.8 }, modalTitle: { color: "#F8FAFC", fontSize: 25, fontWeight: "900", marginTop: 5 }, close: { width: 38, height: 38, borderRadius: 13, backgroundColor: "#152B44", alignItems: "center", justifyContent: "center" }, experience: { color: "#94A3B8", fontSize: 12, fontWeight: "700", marginBottom: 7 },
  summary: { padding: 14, borderRadius: 16, marginTop: 18, backgroundColor: "rgba(139,92,246,0.12)" }, summaryLabel: { color: "#C4B5FD", fontSize: 10, fontWeight: "900", letterSpacing: 0.7 }, summaryText: { color: "#DDD6FE", lineHeight: 19, fontSize: 13, marginTop: 5 },
});