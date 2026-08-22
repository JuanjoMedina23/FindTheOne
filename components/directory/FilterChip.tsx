import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function FilterChip({ label, active, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.active]}>
      <Text style={[styles.text, active && styles.activeText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E6E9E7",
  },
  active: {
    backgroundColor: "#155E59",
    borderColor: "#155E59",
  },
  text: { color: "#52615D", fontSize: 12, fontWeight: "800" },
  activeText: { color: "#FFFFFF" },
});