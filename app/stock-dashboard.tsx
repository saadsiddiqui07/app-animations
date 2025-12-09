import GlobalLayout from "@/components/global-layout";
import StockHeader from "@/components/stock-dashboard/Header";
import { ThemedText } from "@/components/themed-text";
import AnimatedCounter from "@/components/ui/animated-counter";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { CurveType, LineChart } from "react-native-gifted-charts";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const StockDashboard = () => {
  const [value, setValue] = useState<number>(24908.15);
  type Range = "1D" | "5D" | "1W" | "1M" | "1Y";
  const [range, setRange] = useState<Range>("1D");
  const [showLineChart, setShowLineChart] = useState<boolean>(true);
  const { bottom } = useSafeAreaInsets();
  const ranges: Range[] = useMemo(() => ["1D", "5D", "1W", "1M", "1Y"], []);

  const [portfolioValue] = useState<number>(() =>
    Number((Math.random() * 90000 + 1000).toFixed(2))
  );
  const [portfolioReturnPct] = useState<number>(() =>
    Number((Math.random() * 14 - 7).toFixed(2))
  );
  const isPositiveReturn = portfolioReturnPct >= 0;

  const [buyPct, setBuyPct] = useState<number>(() => Math.round(Math.random() * 100));
  const [sellPct, setSellPct] = useState<number>(() => Math.round(Math.random() * 100));
  const buySV = useSharedValue(buyPct);
  const sellSV = useSharedValue(sellPct);
  const buyBarStyle = useAnimatedStyle(() => ({ width: `${buySV.value}%` }));
  const sellBarStyle = useAnimatedStyle(() => ({ width: `${sellSV.value}%` }));

  const dataByRange = useMemo(() => {
    const rng = (min: number, max: number) => Math.random() * (max - min) + min;
    const generateSeries = (
      count: number,
      start: number,
      volatility: number
    ) => {
      const arr: { value: number }[] = [];
      let last = start;
      for (let i = 0; i < count; i++) {
        const drift = rng(-volatility, volatility);
        last = Math.max(0, last + drift);
        arr.push({ value: Number(last.toFixed(2)) });
      }
      return arr;
    };

    return {
      "1D": generateSeries(94, 20, 15),
      "5D": generateSeries(120, 220, 12),
      "1W": generateSeries(128, 220, 12),
      "1M": generateSeries(150, 220, 10),
      "1Y": generateSeries(180, 10, 18),
    } as Record<Range, { value: number }[]>;
  }, []);

  const currentData = dataByRange[range];

  useEffect(() => {
    const id = setInterval(() => {
      const next = Math.random() * 10000 + 2400;
      setValue((prev) => (prev === next ? prev : next));
    }, 3500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const nextBuy = Math.round(Math.random() * 100);
      const nextSell = Math.round(Math.random() * 100);
      setBuyPct(nextBuy);
      setSellPct(nextSell);
      buySV.value = withTiming(nextBuy, { duration: 900 });
      sellSV.value = withTiming(nextSell, { duration: 900 });
    }, 1800);
    return () => clearInterval(id);
  }, [buySV, sellSV]);

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
                onPress={() => setShowLineChart(!showLineChart)}
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

        {/* animated line chart */}
        <View style={{ marginTop: 16 }}>
          <LineChart
            data={currentData}
            isAnimated={true}
            animateOnDataChange
            curved
            curveType={CurveType.CUBIC}
            curvature={0.2}
            areaChart
            color={"#4ADDBA"}
            startFillColor={"#4ADDBA"}
            endFillColor={"#4ADDBA"}
            startOpacity={0.25}
            endOpacity={0.02}
            thickness={3}
            hideDataPoints
            hideRules
            hideYAxisText
            initialSpacing={0}
            adjustToWidth
            showVerticalLines={false}
            xAxisColor={"rgba(255,255,255,0.06)"}
            yAxisColor={"rgba(255,255,255,0.06)"}
            backgroundColor={"transparent"}
          />
        </View>
        {/* timeline selector */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 8,
            paddingHorizontal: 8,
          }}
        >
          {ranges.map((r) => {
            const active = r === range;
            return (
              <Pressable
                key={r}
                onPress={() => setRange(r as Range)}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 999,
                  backgroundColor: active
                    ? "lightblue"
                    : "rgba(255, 255, 255, 0.08)",
                }}
              >
                <ThemedText
                  style={{
                    fontSize: 13,
                    color: active ? "black" : "lightgray",
                  }}
                >
                  {r}
                </ThemedText>
              </Pressable>
            );
          })}
      
        </View>
          {/* PORTFOLIO CARD */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            borderRadius: 16,
            padding: 16,
            marginTop: 16,
          }}
        >
          <View style={{ gap: 4, flex: 1 }}>
            <ThemedText style={{ fontSize: 14, color: "lightgray" }}>
              Portfolio
            </ThemedText>
            <AnimatedCounter value={portfolioValue} fontSize={28} variant="large" />
          </View>
          <View style={{ alignItems: "flex-end", gap: 4 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <IconSymbol
                name={isPositiveReturn ? "arrow.up" : "arrow.down"}
                color={isPositiveReturn ? "lightgreen" : "#ff6b6b"}
                size={16}
                style={{ transform: [{ rotate: isPositiveReturn ? "40deg" : "-40deg" }] }}
              />
              <ThemedText
                style={{ fontSize: 16, color: isPositiveReturn ? "lightgreen" : "#ff6b6b" }}
              >
                {Math.abs(portfolioReturnPct).toFixed(2)}%
              </ThemedText>
            </View>
            <ThemedText style={{ color: "gray" }}>Returns</ThemedText>
          </View>
        </View>
      {/* bottom bar */}
      
      {/* buying card */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          borderRadius: 16,
          padding: 16,
          marginTop: 12,
          gap: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <ThemedText style={{ fontSize: 14, color: "lightgray" }}>Buying</ThemedText>
            <ThemedText style={{ fontSize: 14, color: "lightgray" }}>{buyPct}%</ThemedText>
          </View>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFillBuy, buyBarStyle]} />
          </View>
        </View>
      </View>

      {/* selling card */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          borderRadius: 16,
          padding: 16,
          marginTop: 12,
          gap: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <ThemedText style={{ fontSize: 14, color: "lightgray" }}>Selling</ThemedText>
            <ThemedText style={{ fontSize: 14, color: "lightgray" }}>{sellPct}%</ThemedText>
          </View>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFillSell, sellBarStyle]} />
          </View>
        </View>
      </View>
      </View>
      <View style={[styles.bottomBar, { paddingBottom: bottom }]}> 
        <Pressable style={[styles.actionButton, styles.sellButton]}> 
          <ThemedText style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>Sell</ThemedText> 
        </Pressable> 
        <Pressable style={[styles.actionButton, styles.buyButton]}> 
          <ThemedText style={{ fontSize: 16, fontWeight: "600", color: "#000" }}>Buy</ThemedText> 
        </Pressable> 
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
  progressTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  progressFillBuy: {
    height: "100%",
    backgroundColor: "#4ADDBA",
  },
  progressFillSell: {
    height: "100%",
    backgroundColor: "#ff4d4f",
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  sellButton: {
    backgroundColor: "#ff4d4f",
  },
  buyButton: {
    backgroundColor: "#4ADDBA",
  },
});

export default StockDashboard;
