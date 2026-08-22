import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, BriefcaseBusiness, ShieldCheck } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { RatingStars } from "../../components/candidates/RatingStars";
import { SkillBadge } from "../../components/candidates/SkillBadge";
import { EvidenceCard } from "../../components/evidence/EvidenceCard";
import { RequirementRow } from "../../components/evidence/RequirementRow";
import { mockResults } from "../../data/mockResults";

export default function CandidateProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const candidate = useMemo(() => mockResults.results.find((item) => item.candidateId === Number(id)), [id]);

  if (!candidate) return <SafeAreaView style={styles.safe}><Text style={styles.notFound}>Candidate not found.</Text></SafeAreaView>;

  const rated = candidate.requirements.filter((item) => item.rating);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.page}>
        <Pressable onPress={() => router.back()} style={styles.back}><ArrowLeft size={18} color="#155E59" /><Text style={styles.backText}>Back</Text></Pressable>
        <View style={styles.top}><View style={styles.avatar}><Text style={styles.initials}>{candidate.initials}</Text></View><View style={styles.identity}><Text style={styles.name}>{candidate.name}</Text><Text style={styles.role}>{candidate.role}</Text><View style={styles.verified}><ShieldCheck size={14} color="#2E9B70" /><Text style={styles.verifiedText}>Professional evidence available</Text></View></View></View>
        <View style={styles.section}><Text style={styles.heading}>SKILLS</Text><View style={styles.skills}>{candidate.skills.map((skill) => <SkillBadge key={skill} label={skill} />)}</View></View>
        <View style={styles.section}><Text style={styles.heading}>EXPERIENCE</Text><View style={styles.experience}><BriefcaseBusiness size={18} color="#155E59" /><Text style={styles.experienceText}>{candidate.experience}</Text></View></View>
        <View style={styles.section}><Text style={styles.heading}>EMPLOYER EVALUATIONS</Text>{rated.map((item) => <View style={styles.ratingRow} key={item.name}><Text style={styles.ratingName}>{item.name}</Text><RatingStars rating={item.rating} /></View>)}</View>
        <View style={styles.section}><Text style={styles.heading}>WHY THIS EVIDENCE MATTERS</Text>{candidate.requirements.map((item) => <RequirementRow key={item.name} item={item} />)}</View>
        <EvidenceCard review={candidate.review} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F8F6" }, page: { padding: 20, paddingBottom: 42 }, back: { flexDirection: "row", gap: 7, alignItems: "center", alignSelf: "flex-start", paddingVertical: 8, marginBottom: 22 }, backText: { color: "#155E59", fontWeight: "900", fontSize: 13 },
  top: { flexDirection: "row", gap: 14, alignItems: "center", marginBottom: 28 }, avatar: { width: 75, height: 75, borderRadius: 24, backgroundColor: "#DFF2EB", justifyContent: "center", alignItems: "center" }, initials: { color: "#155E59", fontSize: 23, fontWeight: "900" }, identity: { flex: 1 }, name: { color: "#182520", fontSize: 25, fontWeight: "900", letterSpacing: -0.7 }, role: { color: "#71817B", fontSize: 14, fontWeight: "700", marginTop: 4 }, verified: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 10 }, verifiedText: { color: "#2E9B70", fontSize: 11, fontWeight: "800" },
  section: { marginBottom: 26 }, heading: { color: "#83928B", fontSize: 10, letterSpacing: 0.9, fontWeight: "900", marginBottom: 11 }, skills: { flexDirection: "row", flexWrap: "wrap", gap: 7 }, experience: { flexDirection: "row", gap: 10, alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 15, padding: 14, borderWidth: 1, borderColor: "#E5EBE7" }, experienceText: { flex: 1, color: "#394B44", fontSize: 13, fontWeight: "700" }, ratingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#E3EAE5" }, ratingName: { color: "#40524B", fontSize: 14, fontWeight: "800" }, notFound: { padding: 30, color: "#182520", fontWeight: "800" },
});