import { LinearGradient } from "expo-linear-gradient";
import Search from "lucide-react-native/icons/search";
import Sparkles from "lucide-react-native/icons/sparkles";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = { query: string; onChange: (text: string) => void; onSearch: () => void };

export function SearchBox({ query, onChange, onSearch }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.labelRow}>
        <Sparkles size={16} color="#38BDF8" />
        <Text style={styles.label}>DESCRIBE YOUR IDEAL CANDIDATE</Text>
      </View>
      <TextInput
        value={query}
        onChangeText={onChange}
        multiline
        textAlignVertical="top"
        placeholder="I need a Python developer with AI experience..."
        placeholderTextColor="#64748B"
        style={styles.input}
      />
      <Pressable onPress={onSearch} style={styles.button}>
        <LinearGradient colors={["#0EA5E9", "#6366F1"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
          <Search size={19} color="#FFFFFF" />
          <Text style={styles.buttonText}>Find Talent</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 24, backgroundColor: "rgba(16,40,66,0.94)", borderWidth: 1, borderColor: "rgba(148,163,184,0.18)", gap: 14 },
  labelRow: { flexDirection: "row", alignItems: "center", gap: 7 },
  label: { color: "#7DD3FC", fontSize: 10, fontWeight: "900", letterSpacing: 1 },
  input: { minHeight: 132, color: "#F8FAFC", fontSize: 16, lineHeight: 24, padding: 14, borderRadius: 16, backgroundColor: "#071A2E", borderWidth: 1, borderColor: "rgba(148,163,184,0.16)" },
  button: { overflow: "hidden", borderRadius: 16 },
  gradient: { minHeight: 56, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 9 },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "900" },
});