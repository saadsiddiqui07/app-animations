import { StyleSheet, TextInput } from "react-native";
import { ThemedView } from "../themed-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatInput() {
  const { bottom } = useSafeAreaInsets();

  return (
    <ThemedView style={[styles.wrapper, { paddingBottom: bottom }]}>
      <ThemedView style={styles.container}>
        <Ionicons name="mic-outline" size={22} color="#d4d4d4" />
        <TextInput
          style={styles.input}
          placeholder="Message"
          placeholderTextColor="#9e9e9e"
        />
        <Ionicons name="attach-outline" size={22} color="#d4d4d4" />
        <Ionicons name="happy-outline" size={22} color="#d4d4d4" />
        <Ionicons name="ellipsis-vertical" size={22} color="#d4d4d4" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(29,29,31,0.92)",
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
});

