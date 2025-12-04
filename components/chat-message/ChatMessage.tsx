import { ThemedText } from "../themed-text";

import { CHAT_ITEM } from "@/types";
import { useEffect } from "react";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { ThemedView } from "../themed-view";

const USER_ID = `a1b2c3`;

const ChatMessage = ({ item, onPress, selected }: { item: CHAT_ITEM, onPress: (y: number) => void, selected?: boolean }) => {
  const isMyMessage = item.userId === USER_ID;

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(selected ? 1.08 : 1, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
    translateX.value = withTiming(selected ? (isMyMessage ? -8 : 8) : 0, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });
  }, [selected, scale, translateX, isMyMessage]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateX: translateX.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedView style={{ padding: 10, borderRadius: 10, backgroundColor: isMyMessage ? 'royalblue' : 'gray', maxWidth: '80%', alignSelf: isMyMessage ? 'flex-end' : 'flex-start' }}>
        <ThemedText onLongPress={(e) => onPress(e.nativeEvent.pageY)}>
          {item.message}
        </ThemedText>
      </ThemedView>
    </Animated.View>
  );
};

export default ChatMessage;
