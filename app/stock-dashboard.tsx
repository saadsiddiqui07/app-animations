import GlobalLayout from "@/components/global-layout";
import StockHeader from "@/components/stock-dashboard/Header";
import { ThemedText } from "@/components/themed-text";
import AnimatedCounter from "@/components/ui/animated-counter";
import { IconSymbol } from "@/components/ui/icon-symbol.ios";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { CurveType, LineChart } from "react-native-gifted-charts";

const StockDashboard = () => {
  const [value, setValue] = useState<number>(24908.15);
  const [hoveredValue, setHoveredValue] = useState<number | undefined>(undefined);
  type Range = "1D" | "5D" | "1W" | "1M" | "1Y";
  const [range, setRange] = useState<Range>("1D");
  const [showLineChart, setShowLineChart] = useState<boolean>(true);

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
            <AnimatedCounter value={hoveredValue ?? value} fontSize={35} variant="large" />
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
            isAnimated
            animateOnDataChange
            onDataChangeAnimationDuration={600}
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
            showVerticalLines
            verticalLinesColor={"rgba(255,255,255,0.06)"}
            xAxisColor={"rgba(255,255,255,0.06)"}
            yAxisColor={"rgba(255,255,255,0.06)"}
            backgroundColor={"transparent"}
            pointerConfig={{
              pointerStripHeight: 150,
              pointerStripColor: "rgba(255,255,255,0.2)",
              pointerStripWidth: 1,
              pointerColor: "transparent",
              radius: 4,
              pointerLabelWidth: 90,
              pointerLabelHeight: 28,
              shiftPointerLabelX: -45,
              shiftPointerLabelY: -36,
              pointerLabelComponent: (items) => (
                (() => {
                  const PointerLabel = ({ value }: { value: number }) => {
                    useEffect(() => {
                      setHoveredValue(value);
                      return () => setHoveredValue(undefined);
                    }, [value]);
                    return (
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingVertical: 6,
                          borderRadius: 10,
                          backgroundColor: "#1f2937",
                          borderWidth: 1,
                          borderColor: "#4ADDBA",
                        }}
                      >
                        <ThemedText style={{ fontSize: 12, color: "#fff" }}>
                          {Number(items?.[0]?.value ?? 0).toFixed(2)}
                        </ThemedText>
                      </View>
                    );
                  };
                  return <PointerLabel value={Number(items?.[0]?.value ?? 0)} />;
                })()
              ),
            }}
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
          {["1D", "5D", "1W", "1M", "1Y"].map((r) => {
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
