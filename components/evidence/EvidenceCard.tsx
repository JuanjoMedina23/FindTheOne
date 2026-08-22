import { Quote, ShieldCheck } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

type Props = { review: string };

export function EvidenceCard({ review }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <ShieldCheck size={17} color="#22C55E" />
        <Text style={styles.heading}>VERIFIED EMPLOYER EVIDENCE</Text>
      </View>
      <Quote size={20} color="#67E8F9" />
      <Text style={styles.review}>{review}</Text>
      <Text style={styles.caption}>Employer feedback · locally analyzed by QVAC</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 18,
    gap: 10,
    backgroundColor: "rgba(34,197,94,0.07)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.18)",
  },
  header: { flexDirection: "row", gap: 7, alignItems: "center" },
  heading: { color: "#BBF7D0", fontSize: 10, fontWeight: "900", letterSpacing: 0.8 },
  review: { color: "#DCFCE7", fontSize: 14, fontWeight: "700", lineHeight: 21 },
  caption: { color: "#86EFAC", fontSize: 11, fontWeight: "600" },
});