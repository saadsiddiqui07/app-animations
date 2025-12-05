import GlobalLayout from "@/components/global-layout";
import StockHeader from "@/components/stock-dashboard/Header";
import { ThemedText } from "@/components/themed-text";
import AnimatedCounter from "@/components/ui/animated-counter";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

const StockDashboard = () => {
  const [value, setValue] = useState<number>(24908.15);

  useEffect(() => {
    const id = setInterval(() => {
      const next = Math.random() * 10000 + 2400;
      setValue((prev) => (prev === next ? prev : next));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <GlobalLayout style={styles.container}>
      <StockHeader />
      <View
        style={{
          marginTop: 32,
          paddingHorizontal: 16,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {/* left side */}
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 18,
                marginBottom: 12,
              }}
            >
              <Pressable style={styles.iconButton}>
                <IconSymbol name="apple.logo" color="lightgray" size={30} />
              </Pressable>
              <View style={{ gap: 4 }}>
                <ThemedText type="subtitle">APPL</ThemedText>
                <ThemedText style={{ fontSize: 14, color: "gray" }}>
                  Apple Inc.
                </ThemedText>
              </View>
            </View>
            <AnimatedCounter value={value} fontSize={35} variant="large" />
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <IconSymbol
                name="arrow.up"
                color="lightgreen"
                size={16}
                style={{ transform: [{ rotate: "40deg" }] }}
              />
              <ThemedText style={{ fontSize: 16, color: "lightgreen" }}>
                1.23%
              </ThemedText>
              <ThemedText style={{ color: "gray" }}>Today</ThemedText>
            </View>
          </View>

          {/* right side */}
          <View
            style={{
              borderRadius: 12,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <View style={{ gap: 4, padding: 4 }}>
              <Pressable style={styles.rightIcon}>
                <IconSymbol name="chart.bar.xaxis" color="white" size={24} />
              </Pressable>
              <Pressable
                style={[styles.rightIcon, { backgroundColor: "lightblue" }]}
              >
                <IconSymbol
                  name="chart.line.uptrend.xyaxis"
                  color="black"
                  size={24}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  iconButton: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  rightIcon: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StockDashboard;
