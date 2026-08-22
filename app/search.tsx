import { router } from "expo-router";
import { ArrowLeft, LockKeyhole, Sparkles } from "lucide-react-native";
import { useState } from "react";
import { Pressable, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SearchBox } from "../components/search/SearchBox";

export default function SearchScreen() {
  const [query, setQuery] = useState("I need a Python developer with AI experience, strong leadership and teamwork.");

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.page}>
        <Pressable onPress={() => router.back()} style={styles.back}><ArrowLeft size={18} color="#155E59" /><Text style={styles.backText}>Talent directory</Text></Pressable>
        <View style={styles.badge}><LockKeyhole size={14} color="#397267" /><Text style={styles.badgeText}>PRIVATE LOCAL ANALYSIS</Text></View>
        <Text style={styles.title}>Describe who you need.</Text>
        <Text style={styles.subtitle}>TalentMatch will analyze requirements and surface candidate evidence locally with QVAC.</Text>
        <View style={styles.searchWrapper}><SearchBox query={query} onChange={setQuery} onSearch={() => router.push({ pathname: "/results", params: { query } })} /></View>
        <View style={styles.note}><Sparkles size={17} color="#155E59" /><Text style={styles.noteText}>The agent does not make hiring decisions. It prepares evidence for human review.</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F7F8F6" }, page: { padding: 20, paddingBottom: 40 },
  back: { flexDirection: "row", alignItems: "center", gap: 7, alignSelf: "flex-start", paddingVertical: 8, marginBottom: 38 }, backText: { color: "#155E59", fontSize: 13, fontWeight: "900" },
  badge: { alignSelf: "flex-start", flexDirection: "row", gap: 7, alignItems: "center", backgroundColor: "#E5F4EC", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999 }, badgeText: { color: "#397267", fontSize: 10, fontWeight: "900", letterSpacing: 0.7 },
  title: { color: "#182520", fontSize: 32, fontWeight: "900", letterSpacing: -1.2, marginTop: 16 }, subtitle: { color: "#71817B", fontSize: 14, lineHeight: 21, marginTop: 10 }, searchWrapper: { marginTop: 25 }, note: { flexDirection: "row", gap: 10, marginTop: 16, padding: 14, backgroundColor: "#E8F5EE", borderRadius: 15 }, noteText: { flex: 1, color: "#397267", fontSize: 12, fontWeight: "700", lineHeight: 18 },
});