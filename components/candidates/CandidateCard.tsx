import { ChevronRight, ShieldCheck } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CandidateResult } from "../../types/search";
import { MatchBadge } from "../ui/MatchBadge";
import { SkillBadge } from "./SkillBadge";

type Props = { candidate: CandidateResult; index: number; onPress: () => void };

export function CandidateCard({ candidate, index, onPress }: Props) {
  const verified = candidate.requirements.filter((item) => item.status === "supported").length;

  return (
    <Animated.View entering={FadeInDown.delay(index * 120).springify()}>
      <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
        <View style={styles.top}>
          <View style={styles.avatar}><Text style={styles.initials}>{candidate.initials}</Text></View>
          <View style={styles.identity}>
            <Text style={styles.name}>{candidate.name}</Text>
            <Text style={styles.role}>{candidate.role}</Text>
          </View>
          <ChevronRight size={21} color="#64748B" />
        </View>

        <MatchBadge match={candidate.match} />

        <View style={styles.skills}>
          {candidate.skills.slice(0, 4).map((skill) => <SkillBadge key={skill} label={skill} />)}
        </View>

        <View style={styles.divider} />
        <View style={styles.footer}>
          <View style={styles.verified}>
            <ShieldCheck size={16} color="#22C55E" />
            <Text style={styles.verifiedText}>{verified}/{candidate.requirements.length} requirements supported</Text>
          </View>
          <Text style={styles.confidence}>CONFIDENCE: {candidate.confidence.toUpperCase()}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#102842", borderRadius: 24, padding: 18, gap: 15, borderWidth: 1, borderColor: "rgba(148,163,184,0.15)", marginBottom: 14 },
  pressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  top: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: { width: 47, height: 47, borderRadius: 16, backgroundColor: "#2563EB", alignItems: "center", justifyContent: "center" },
  initials: { color: "#FFF", fontSize: 15, fontWeight: "900" },
  identity: { flex: 1, gap: 3 },
  name: { color: "#F8FAFC", fontSize: 17, fontWeight: "900" },
  role: { color: "#94A3B8", fontSize: 13 },
  skills: { flexDirection: "row", flexWrap: "wrap", gap: 7 },
  divider: { height: 1, backgroundColor: "rgba(148,163,184,0.10)" },
  footer: { gap: 8 },
  verified: { flexDirection: "row", alignItems: "center", gap: 7 },
  verifiedText: { color: "#CBD5E1", fontSize: 12, fontWeight: "700" },
  confidence: { color: "#64748B", fontSize: 10, fontWeight: "900", letterSpacing: 0.8 },
});