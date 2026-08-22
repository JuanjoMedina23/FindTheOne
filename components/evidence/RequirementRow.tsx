import { CheckCircle2, CircleAlert, XCircle } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { RequirementResult } from "../../types/search";
import { RatingStars } from "../candidates/RatingStars";

type Props = { item: RequirementResult };

const statuses = {
  supported: { label: "Verified", color: "#22C55E", Icon: CheckCircle2 },
  partial: { label: "Limited evidence", color: "#FBBF24", Icon: CircleAlert },
  not_found: { label: "Not found", color: "#FB7185", Icon: XCircle },
};

export function RequirementRow({ item }: Props) {
  const { label, color, Icon } = statuses[item.status];

  return (
    <View style={styles.row}>
      <View style={[styles.icon, { backgroundColor: `${color}18` }]}>
        <Icon size={18} color={color} />
      </View>
      <View style={styles.body}>
        <View style={styles.top}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={[styles.status, { color }]}>{label}</Text>
        </View>
        <Text style={styles.evidence}>{item.evidence}</Text>
        <View style={styles.meta}>
          <Text style={styles.source}>Source: {item.source}</Text>
          {item.rating ? <RatingStars rating={item.rating} /> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148,163,184,0.10)",
  },
  icon: { width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  body: { flex: 1, gap: 6 },
  top: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  name: { color: "#F8FAFC", fontSize: 14, fontWeight: "800" },
  status: { fontSize: 11, fontWeight: "800" },
  evidence: { color: "#CBD5E1", fontSize: 13, lineHeight: 19 },
  meta: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  source: { color: "#64748B", fontSize: 11, fontWeight: "600", flex: 1 },
});