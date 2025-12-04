import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type Props = {
  visible: boolean;
  align: "flex-start" | "flex-end";
  onAction?: (action: string) => void;
};

const ACTIONS = [
  { key: "reply", iconName: "arrow-undo-outline", label: "Reply" },
  { key: "forward", iconName: "arrow-redo-outline", label: "Forward" },
  { key: "save", iconName: "download-outline", label: "Save" },
  { key: "select", iconName: "checkmark-circle-outline", label: "Select" },
  { key: "info", iconName: "information-circle-outline", label: "Info" },
  { key: "delete", iconName: "trash-outline", label: "Delete" },
];


export default function ActionMenu({ visible, align, onAction }: Props) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (visible) {
    opacity.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) });
  } else {
    opacity.value = withTiming(0, { duration: 150, easing: Easing.out(Easing.cubic) });
    translateY.value = withTiming(10, { duration: 150, easing: Easing.out(Easing.cubic) });
  }

  return (
    <Animated.View style={[styles.wrapper, { alignSelf: align }, containerStyle]}>
      <ThemedView style={styles.container}>
        {ACTIONS.map((a) => (
          <ThemedView key={a.key} style={styles.row}>
            <Ionicons name={a.iconName as any} size={18} color="#d4d4d4" style={styles.icon} />
            <ThemedText onPress={() => onAction?.(a.key)} style={styles.label}>
              {a.label}
            </ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
  },
  container: {
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    minWidth: 200,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 6,
  },
  icon: {
    width: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#fff",
  },
});
