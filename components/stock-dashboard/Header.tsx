import { Pressable, StyleSheet, View } from "react-native";

import { IconSymbol } from "../ui/icon-symbol.ios";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useRouter } from "expo-router";

const StockHeader = () => {
  const router = useRouter();
  return (
    <View style={styles.iconButtonContainer}>
      <Pressable onPress={() => router.back()} style={styles.iconButton}>
        <IconSymbol name="arrow.left" color="lightgray" size={24} />
      </Pressable>
      <Pressable style={styles.iconButton}>
        <MaterialIcons name="share" color="lightgray" size={24} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  iconButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  iconButton: {
    padding: 16,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StockHeader;