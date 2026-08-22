import { CheckCircle2, CircleDashed, Sparkles } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { MatchType } from "../../types/search";

type Props = { match: MatchType };

const config = {
  strong_match: { label: "STRONG MATCH", color: "#22C55E", Icon: CheckCircle2 },
  good_match: { label: "GOOD MATCH", color: "#38BDF8", Icon: Sparkles },
  partial_match: { label: "PARTIAL MATCH", color: "#FBBF24", Icon: CircleDashed },
};

export function MatchBadge({ match }: Props) {
  const { label, color, Icon } = config[match];

  return (
    <View style={[styles.badge, { borderColor: `${color}55` }]}>
      <Icon size={14} color={color} strokeWidth={2.7} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  label: { fontSize: 10, fontWeight: "900", letterSpacing: 0.85 },
});