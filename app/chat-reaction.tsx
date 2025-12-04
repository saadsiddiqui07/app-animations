import ActionMenu from "@/components/chat-message/ActionMenu";
import ChatMessage from "@/components/chat-message/ChatMessage";
import ReactionBar from "@/components/chat-message/ReactionBar";
import GlobalLayout from "@/components/global-layout";
import { CHAT_DATA } from "@/constants";
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatReactionScreen() {
  const { bottom } = useSafeAreaInsets();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedY, setSelectedY] = useState<number | null>(null);
  const CURRENT_USER_ID = "a1b2c3";

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const translateY = useSharedValue(0);
  const overlayStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: selectedY ?? 0 }],
  }));
  const overlayOpacity = useSharedValue(0);
  const blurAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const { height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const screenHeight = Math.round(height - insets.top - insets.bottom);

  useEffect(() => {
    if (selectedId && selectedY != null) {
      overlayOpacity.value = 0;
      overlayOpacity.value = withTiming(1, { duration: 250, easing: Easing.out(Easing.cubic) });
      translateY.value = selectedY;
      translateY.value = withTiming(screenHeight, { duration: 500, easing: Easing.out(Easing.cubic) });
    }
  }, [selectedId, selectedY, screenHeight, overlayOpacity, translateY]);

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
              onPress={(y) => {
                setSelectedId(item.id);
                setSelectedY(y);
              }}
            />
          )}
          keyExtractor={(_, i) => i.toString()}
        />
          {selectedId && (
            <AnimatedPressable
              style={[styles.blurOverlay, blurAnimatedStyle]}
              onPress={() => {
                overlayOpacity.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.cubic) }, (finished) => {
                  if (finished) {
                    runOnJS(setSelectedId)(null);
                    runOnJS(setSelectedY)(null);
                  }
                });
              }}
            >
              <BlurView
                intensity={30}
                tint="systemMaterial"
                style={styles.blurFill}
              />
              {CHAT_DATA.chat.find((c) => c.id === selectedId) && (
                <Animated.View style={[styles.overlayMessage, overlayStyle]}>
                  {(() => {
                    const item = CHAT_DATA.chat.find((c) => c.id === selectedId)!;
                    const align = item.userId === CURRENT_USER_ID ? "flex-end" : "flex-start";
                    return (
                      <>
                        <ReactionBar visible align={align} />
                        <ChatMessage item={item} selected onPress={() => {}} />
                        <ActionMenu visible align={align} />
                      </>
                    );
                  })()}
                </Animated.View>
              )}
            </AnimatedPressable>
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
  overlayMessage: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  contentContainerStyle: {
    gap: 20,
    padding: 20,
  },
});
