import { CircleAlert, ShieldCheck, XCircle } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

type Props = { onStartOver: () => void };

export function NoMatchState({ onStartOver }: Props) {
  const missing = ["Rust", "Blockchain", "10 years of experience"];
  return (
    <View style={styles.container}>
      <View style={styles.icon}><CircleAlert size={34} color="#FBBF24" /></View>
      <Text style={styles.title}>No strong match found</Text>
      <Text style={styles.subtitle}>TalentMatch did not find sufficient verified evidence for the requested profile.</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>MISSING EVIDENCE</Text>
        {missing.map((item) => <View style={styles.item} key={item}><XCircle size={16} color="#FB7185" /><Text style={styles.itemText}>{item}</Text></View>)}
      </View>
      <View style={styles.review}><ShieldCheck size={18} color="#38BDF8" /><Text style={styles.reviewText}>Recommendation: broaden requirements or perform human review.</Text></View>
      <Text onPress={onStartOver} style={styles.link}>Start a new search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 15, paddingTop: 45 },
  icon: { width: 70, height: 70, borderRadius: 35, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(251,191,36,0.12)" },
  title: { color: "#F8FAFC", fontSize: 24, fontWeight: "900" },
  subtitle: { color: "#94A3B8", textAlign: "center", fontSize: 14, lineHeight: 20 },
  card: { alignSelf: "stretch", backgroundColor: "rgba(251,113,133,0.07)", borderWidth: 1, borderColor: "rgba(251,113,133,0.18)", borderRadius: 18, padding: 16, gap: 12, marginTop: 8 },
  cardTitle: { color: "#FDA4AF", fontSize: 10, fontWeight: "900", letterSpacing: 0.9 },
  item: { flexDirection: "row", gap: 9, alignItems: "center" },
  itemText: { color: "#FECACA", fontSize: 14, fontWeight: "700" },
  review: { flexDirection: "row", gap: 9, padding: 14, borderRadius: 16, backgroundColor: "rgba(56,189,248,0.08)" },
  reviewText: { flex: 1, color: "#BAE6FD", lineHeight: 18, fontSize: 12, fontWeight: "700" },
  link: { marginTop: 8, color: "#7DD3FC", fontWeight: "800", fontSize: 14 },
});