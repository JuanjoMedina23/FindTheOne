import { Star } from "lucide-react-native";
import { View } from "react-native";

type Props = { rating?: number; size?: number };

export function RatingStars({ rating = 0, size = 14 }: Props) {
  return (
    <View style={{ flexDirection: "row", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          size={size}
          color={value <= rating ? "#FBBF24" : "#475569"}
          fill={value <= rating ? "#FBBF24" : "transparent"}
        />
      ))}
    </View>
  );
}