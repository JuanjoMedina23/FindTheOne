import { BadgeCheck, ChevronRight, Sparkles } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { CandidateResult } from "../../types/search";

type Props = {
  candidate: CandidateResult;
  index: number;
  onPress: () => void;
};

const avatarColors = ["#DFF2EB", "#FDE8E2", "#E8E7FF", "#FFF0C9", "#DFF0FC"];

export function TalentCard({ candidate, index, onPress }: Props) {
  const verified = candidate.requirements.filter((item) => item.status === "supported").length;
  const color = avatarColors[index % avatarColors.length];

  return (
    <Animated.View entering={FadeInDown.delay(index * 75).springify()} style={styles.wrapper}>
      <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
        <View style={[styles.avatar, { backgroundColor: color }]}>
          <Text style={styles.initials}>{candidate.initials}</Text>
        </View>

        <View style={styles.verifiedLine}>
          <BadgeCheck size={13} color="#2E9B70" />
          <Text style={styles.verifiedText}>{verified} verified signals</Text>
        </View>

        <Text numberOfLines={1} style={styles.name}>{candidate.name}</Text>
        <Text numberOfLines={1} style={styles.role}>{candidate.role}</Text>

        <View style={styles.skills}>
          {candidate.skills.slice(0, 2).map((skill) => (
            <View style={styles.skill} key={skill}>
              <Text numberOfLines={1} style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.evidenceButton}>
            <Sparkles size={13} color="#155E59" />
            <Text style={styles.evidenceText}>Evidence</Text>
          </View>
          <ChevronRight size={17} color="#78908A" />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: "48.2%", marginBottom: 14 },
  card: {
    minHeight: 248,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E9EEEB",
    shadowColor: "#183B34",
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 2,
  },
  pressed: { opacity: 0.86, transform: [{ scale: 0.98 }] },
  avatar: { width: 52, height: 52, borderRadius: 18, alignItems: "center", justifyContent: "center", marginBottom: 11 },
  initials: { color: "#155E59", fontSize: 17, fontWeight: "900" },
  verifiedLine: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 8 },
  verifiedText: { color: "#2E9B70", fontSize: 10, fontWeight: "800" },
  name: { color: "#192522", fontSize: 15, fontWeight: "900" },
  role: { color: "#71817B", fontSize: 11, fontWeight: "600", marginTop: 4, minHeight: 30 },
  skills: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginTop: 10 },
  skill: { maxWidth: "100%", backgroundColor: "#F0F6F3", paddingHorizontal: 7, paddingVertical: 5, borderRadius: 7 },
  skillText: { color: "#397267", fontSize: 10, fontWeight: "800" },
  footer: { marginTop: "auto", paddingTop: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  evidenceButton: { flexDirection: "row", gap: 4, alignItems: "center" },
  evidenceText: { color: "#155E59", fontSize: 11, fontWeight: "900" },
});