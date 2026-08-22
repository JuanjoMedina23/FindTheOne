import { TriangleAlert } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = { onRetry: () => void };

export function ErrorState({ onRetry }: Props) {
  return (
    <View style={styles.container}>
      <TriangleAlert size={38} color="#FB7185" />
      <Text style={styles.title}>Unable to complete analysis</Text>
      <Text style={styles.subtitle}>The local agent could not produce a validated result. No candidate was ranked automatically.</Text>
      <Pressable onPress={onRetry} style={styles.button}><Text style={styles.buttonText}>Try again</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 12, paddingTop: 70 }, title: { color: "#F8FAFC", fontSize: 21, fontWeight: "900" }, subtitle: { color: "#94A3B8", textAlign: "center", lineHeight: 20, fontSize: 14 }, button: { marginTop: 8, backgroundColor: "#2563EB", paddingHorizontal: 18, paddingVertical: 12, borderRadius: 13 }, buttonText: { color: "#FFF", fontWeight: "900" },
});