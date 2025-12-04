import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";

type Props = {
  title?: string;
  avatarUri?: string;
};

export default function ChatHeader({ title = "Alice", avatarUri }: Props) {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.left}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </Pressable>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
        ) : (
          <ThemedView style={styles.avatar}>
            <ThemedText style={styles.avatarLabel}>A</ThemedText>
          </ThemedView>
        )}
        <ThemedText style={styles.title}>{title}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.right}>
        <Pressable style={styles.iconButton}>
          <Ionicons name="call-outline" size={20} color="#fff" />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Ionicons name="videocam-outline" size={20} color="#fff" />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    padding: 6,
    borderRadius: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3a3a3c",
  },
  avatarLabel: {
    color: "#fff",
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});

