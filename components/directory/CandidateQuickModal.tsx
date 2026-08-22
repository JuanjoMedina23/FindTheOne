import { router } from "expo-router";
import { BriefcaseBusiness, CircleX, ExternalLink, ShieldCheck, Sparkles } from "lucide-react-native";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CandidateResult } from "../../types/search";
import { RatingStars } from "../candidates/RatingStars";

type Props = {
  candidate: CandidateResult | null;
  onClose: () => void;
};

export function CandidateQuickModal({ candidate, onClose }: Props) {
  if (!candidate) return null;

  const leadership = candidate.requirements.find((item) => item.name === "Leadership");
  const teamwork = candidate.requirements.find((item) => item.name === "Teamwork");

  const openProfile = () => {
    onClose();
    router.push({ pathname: "/candidates/[id]", params: { id: String(candidate.candidateId) } });
  };

  return (
    <Modal visible={Boolean(candidate)} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <View style={styles.avatar}><Text style={styles.initials}>{candidate.initials}</Text></View>
            <View style={styles.identity}>
              <Text style={styles.name}>{candidate.name}</Text>
              <Text style={styles.role}>{candidate.role}</Text>
            </View>
            <Pressable onPress={onClose} style={styles.close}><CircleX size={22} color="#6C7D76" /></Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.summaryBox}>
              <Sparkles size={17} color="#155E59" />
              <Text style={styles.summary}>{candidate.summary}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>PROFESSIONAL OVERVIEW</Text>
              <View style={styles.experience}><BriefcaseBusiness size={17} color="#155E59" /><Text style={styles.experienceText}>{candidate.experience}</Text></View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>EVIDENCE SNAPSHOT</Text>
              <View style={styles.signalRow}><ShieldCheck size={18} color="#2E9B70" /><Text style={styles.signalText}>Employer feedback verified locally</Text></View>
              {leadership ? <View style={styles.ratingRow}><Text style={styles.ratingText}>Leadership</Text><RatingStars rating={leadership.rating} /></View> : null}
              {teamwork ? <View style={styles.ratingRow}><Text style={styles.ratingText}>Teamwork</Text><RatingStars rating={teamwork.rating} /></View> : null}
            </View>

            <View style={styles.quoteBox}>
              <Text style={styles.quote}>“{candidate.review}”</Text>
              <Text style={styles.quoteSource}>Employer review</Text>
            </View>

            <Pressable onPress={openProfile} style={styles.profileButton}>
              <Text style={styles.profileText}>View professional profile</Text>
              <ExternalLink size={18} color="#FFFFFF" />
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(15,29,25,0.36)" },
  sheet: { maxHeight: "84%", padding: 20, paddingBottom: 32, backgroundColor: "#F8FAF8", borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  handle: { width: 44, height: 5, borderRadius: 10, backgroundColor: "#CAD6D0", alignSelf: "center", marginBottom: 18 },
  header: { flexDirection: "row", alignItems: "center", gap: 11, marginBottom: 18 },
  avatar: { width: 54, height: 54, borderRadius: 18, backgroundColor: "#DFF2EB", justifyContent: "center", alignItems: "center" },
  initials: { color: "#155E59", fontWeight: "900", fontSize: 17 },
  identity: { flex: 1 }, name: { color: "#192522", fontSize: 21, fontWeight: "900" }, role: { color: "#71817B", fontSize: 13, fontWeight: "700", marginTop: 3 },
  close: { padding: 3 }, summaryBox: { flexDirection: "row", gap: 10, padding: 14, borderRadius: 16, backgroundColor: "#E8F5EE", marginBottom: 18 }, summary: { flex: 1, color: "#25564B", fontSize: 13, lineHeight: 19, fontWeight: "700" },
  section: { marginBottom: 18 }, sectionLabel: { color: "#84938D", fontSize: 10, letterSpacing: 0.9, fontWeight: "900", marginBottom: 10 },
  experience: { flexDirection: "row", gap: 9, alignItems: "center" }, experienceText: { color: "#31423C", fontSize: 13, fontWeight: "700" },
  signalRow: { flexDirection: "row", gap: 9, alignItems: "center", marginBottom: 11 }, signalText: { color: "#397267", fontSize: 13, fontWeight: "800" },
  ratingRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: "#E6ECE8" }, ratingText: { color: "#465750", fontSize: 13, fontWeight: "700" },
  quoteBox: { backgroundColor: "#FFFFFF", borderRadius: 17, padding: 16, borderWidth: 1, borderColor: "#E6ECE8", marginBottom: 17 }, quote: { color: "#394A44", lineHeight: 20, fontSize: 14, fontWeight: "700" }, quoteSource: { color: "#8A9993", fontSize: 11, marginTop: 10, fontWeight: "700" },
  profileButton: { minHeight: 54, borderRadius: 15, backgroundColor: "#155E59", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 }, profileText: { color: "#FFF", fontSize: 14, fontWeight: "900" },
});