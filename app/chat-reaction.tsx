import ChatMessage from "@/components/chat-message/ChatMessage";
import GlobalLayout from "@/components/global-layout";
import { CHAT_DATA } from "@/constants";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatReactionScreen() {
  const { bottom } = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalLayout style={styles.container}>
        <Pressable style={styles.pressable} onPress={() => setSelectedId(null)}>
          <FlatList
            data={CHAT_DATA.chat}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.contentContainerStyle,
              { paddingBottom: bottom },
            ]}
            renderItem={({ item }) => (
              <ChatMessage
                item={item}
                selected={selectedId === item.id}
                onPress={(y) => setSelectedId(item.id)}
              />
            )}
            keyExtractor={(_, i) => i.toString()}
          />
          {selectedId && (
            <Pressable
              style={styles.blurOverlay}
              onPress={() => setSelectedId(null)}
            >
              <BlurView
                intensity={30}
                tint="systemMaterial"
                style={styles.blurFill}
              />
            </Pressable>
          )}
        </Pressable>
      </GlobalLayout>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pressable: {
    flex: 1,
  },
  blurOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  blurFill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentContainerStyle: {
    gap: 20,
    padding: 20,
  },
});
