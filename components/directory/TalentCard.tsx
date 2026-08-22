import {
  BadgeCheck,
  ChevronRight,
  ShieldCheck,
} from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { DirectoryCandidate } from "../../types/directory";

type Props = {
  candidate: DirectoryCandidate;
  index: number;
  cardWidth: number;
  onPress: () => void;
};

const avatarColors = [
  "#DDEDE8",
  "#F7E3DE",
  "#E5E3F8",
  "#F8EDC9",
  "#DDEBF4",
];

export function TalentCard({ candidate, index, cardWidth, onPress }: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 75).duration(420).springify()}
      style={[styles.wrapper, { width: cardWidth }, animatedStyle]}
    >
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.97);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        onPress={onPress}
        style={styles.card}
      >
        <View
          style={[
            styles.avatar,
            { backgroundColor: avatarColors[index % avatarColors.length] },
          ]}
        >
          <Text style={styles.initials}>{candidate.initials}</Text>
        </View>

        <View style={styles.verifiedRow}>
          <BadgeCheck size={13} color="#278565" />
          <Text numberOfLines={1} style={styles.verifiedText}>
            {candidate.verifiedSignals} verified signals
          </Text>
        </View>

        <Text numberOfLines={1} style={styles.name}>
          {candidate.name}
        </Text>

        <Text numberOfLines={2} style={styles.role}>
          {candidate.role}
        </Text>

        <View style={styles.skills}>
          {candidate.skills.slice(0, 2).map((skill) => (
            <View style={styles.skill} key={skill}>
              <Text numberOfLines={1} style={styles.skillText}>
                {skill}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.evidenceButton}>
            <ShieldCheck size={13} color="#155E59" />
            <Text style={styles.evidenceText}>View evidence</Text>
          </View>
          <ChevronRight size={17} color="#78908A" />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  card: {
    width: "100%",
    minHeight: 224,
    padding: 13,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EEEA",
    shadowColor: "#173F38",
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },
  initials: {
    color: "#155E59",
    fontSize: 16,
    fontWeight: "900",
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 7,
    minWidth: 0,
  },
  verifiedText: {
    flex: 1,
    color: "#2E9B70",
    fontSize: 9,
    fontWeight: "800",
  },
  name: {
    color: "#192522",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },
  role: {
    color: "#71817B",
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "600",
    marginTop: 4,
    minHeight: 30,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 8,
    minHeight: 25,
  },
  skill: {
    maxWidth: "100%",
    borderRadius: 7,
    paddingHorizontal: 6,
    paddingVertical: 5,
    backgroundColor: "#F0F6F3",
  },
  skillText: {
    maxWidth: 100,
    color: "#397267",
    fontSize: 9,
    fontWeight: "800",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#EDF1EE",
  },
  evidenceButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flexShrink: 1,
  },
  evidenceText: {
    color: "#155E59",
    fontSize: 10,
    fontWeight: "900",
  },
});