import { ThemedText } from "../themed-text";

import { CHAT_ITEM } from "@/types";
import { ThemedView } from "../themed-view";

const USER_ID = `a1b2c3`;

const ChatMessage = ({ item, onPress }: { item: CHAT_ITEM, onPress: () => void }) => {
  const isMyMessage = item.userId === USER_ID;

  return (
    <ThemedView style={{ padding: 10, borderRadius: 10, backgroundColor: isMyMessage ? 'royalblue' : 'gray', maxWidth: '80%', alignSelf: isMyMessage ? 'flex-end' : 'flex-start' }}>
      <ThemedText onLongPress={onPress}>
        {item.message}
      </ThemedText>
    </ThemedView>
  );
};

export default ChatMessage;
