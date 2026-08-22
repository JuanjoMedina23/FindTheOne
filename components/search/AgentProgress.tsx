import { BrainCircuit, Check } from "lucide-react-native";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";

const steps = [
  "Understanding requirements",
  "Searching candidate profiles",
  "Analyzing professional experience",
  "Checking employer reviews",
  "Validating evidence",
  "Creating shortlist",
];

type Props = { currentStep: number };

export function AgentProgress({ currentStep }: Props) {
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(withSequence(withTiming(1.08, { duration: 750 }), withTiming(1, { duration: 750 })), -1);
  }, [pulse]);

  const orbStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));

  return (
    <View style={styles.screen}>
      <Animated.View style={[styles.orb, orbStyle]}><BrainCircuit size={34} color="#FFFFFF" /></Animated.View>
      <Text style={styles.title}>TalentMatch Agent is working</Text>
      <Text style={styles.subtitle}>Analyzing skills, work history and employer evidence locally.</Text>
      <View style={styles.card}>
        {steps.map((step, index) => {
          const done = index < currentStep;
          const active = index === currentStep;
          return (
            <View key={step} style={styles.row}>
              <View style={[styles.stepIcon, done && styles.done, active && styles.active]}>
                {done ? <Check size={15} color="#FFFFFF" strokeWidth={3} /> : <View style={styles.dot} />}
              </View>
              <Text style={[styles.text, done && styles.textDone, active && styles.textActive]}>{step}</Text>
              {active ? <ActivityIndicator size="small" color="#38BDF8" /> : null}
            </View>
          );
        })}
      </View>
      <Text style={styles.note}>Running locally with QVAC · data never leaves this device</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { alignItems: "center", gap: 16, paddingTop: 35 },
  orb: { width: 86, height: 86, borderRadius: 43, backgroundColor: "#2563EB", justifyContent: "center", alignItems: "center", shadowColor: "#38BDF8", shadowOpacity: 0.75, shadowRadius: 25, elevation: 12 },
  title: { color: "#F8FAFC", fontSize: 23, fontWeight: "900", marginTop: 10 },
  subtitle: { color: "#94A3B8", textAlign: "center", lineHeight: 20, fontSize: 14 },
  card: { alignSelf: "stretch", padding: 18, gap: 15, borderRadius: 22, backgroundColor: "rgba(16,40,66,0.95)", borderWidth: 1, borderColor: "rgba(148,163,184,0.16)", marginTop: 10 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  stepIcon: { width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: "#475569", justifyContent: "center", alignItems: "center" },
  done: { backgroundColor: "#22C55E", borderColor: "#22C55E" },
  active: { backgroundColor: "rgba(56,189,248,0.12)", borderColor: "#38BDF8" },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#64748B" },
  text: { flex: 1, color: "#64748B", fontSize: 14, fontWeight: "600" },
  textDone: { color: "#CBD5E1" },
  textActive: { color: "#F8FAFC", fontWeight: "800" },
  note: { color: "#67E8F9", textAlign: "center", fontSize: 11, fontWeight: "700" },
});