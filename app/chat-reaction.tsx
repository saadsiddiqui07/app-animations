import GlobalLayout from "@/components/global-layout";
import { ThemedText } from "@/components/themed-text";
import { CHAT_DATA } from "@/constants";
import { CHAT_ITEM } from "@/types";
import { FlatList, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const USER_ID = `a1b2c3`;

const RenderItem = ({ item }: { item: CHAT_ITEM }) => {
  const isMyMessage = item.userId === USER_ID;

  return (
    <ThemedText
      style={{
        marginLeft: isMyMessage ? "auto" : 0,
        backgroundColor: isMyMessage ? "red" : "green",
      }}
    >
      {item.message}
    </ThemedText>
  );
};

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
          renderItem={({ item }) => <RenderItem item={item} />}
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
