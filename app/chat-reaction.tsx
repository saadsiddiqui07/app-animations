import ChatMessage from "@/components/chat-message/ChatMessage";
import GlobalLayout from "@/components/global-layout";
import { CHAT_DATA } from "@/constants";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export default function ChatReactionScreen() {
  const { bottom } = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{flex:1}}>
      <GlobalLayout style={styles.container}>
        <FlatList
          data={CHAT_DATA.chat}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.contentContainerStyle,
            { paddingBottom: bottom },
          ]}
          renderItem={({ item }) =>   <ChatMessage item={item} onPress={() => console.log(item.id)} />}
          keyExtractor={(_, i) => i.toString()}
        />
      </GlobalLayout>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    gap: 20,
    padding: 20,
  },
});
