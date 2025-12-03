// components/global-layout.tsx

import { ThemedView } from "./themed-view";

import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const GlobalLayout = ({ children, style }: { children: ReactNode, style?: StyleProp<ViewStyle> }) => {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={[{ flex: 1, paddingTop: insets.top }, style]}>      
      {children}
    </ThemedView>
  );
}   

export default GlobalLayout;
