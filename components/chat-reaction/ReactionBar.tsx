import { StyleSheet } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type Props = {
  visible: boolean;
  align: "flex-start" | "flex-end";
  onSelect?: (emoji: string) => void;
};

const EMOJIS = ["❤️", "👍", "👎", "😂", "😮", "😢"];

export default function ReactionBar({ visible, align, onSelect }: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-10);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (visible) {
    opacity.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.cubic) });
  } else {
    opacity.value = withTiming(0, { duration: 150, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(-10, { duration: 150, easing: Easing.out(Easing.cubic) });
  }

  return (
    <Animated.View style={[styles.wrapper, { alignSelf: align }, containerStyle]}>
      <ThemedView style={styles.container}>
        {EMOJIS.map((e) => (
          <ThemedText key={e} onPress={() => onSelect?.(e)} style={styles.emoji}>
            {e}
          </ThemedText>
        ))}
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  container: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#2a2a2a",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  emoji: {
    fontSize: 16,
  },
});

