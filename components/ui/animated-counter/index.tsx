import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MotiView } from "moti";
import React, { memo, useMemo } from "react";
import { TextProps, View } from "react-native";

interface Props {
  value: number;
  fontSize?: number;
}

const totalNumbers = [...Array(10).keys()];

const Tick = memo(({ children, ...rest }: TextProps) => {
  return <ThemedText {...rest}>{children}</ThemedText>;
});
Tick.displayName = "Tick";

const TickerList = memo(
  ({
    digit,
    fontSize,
    index,
  }: {
    digit: number;
    fontSize: number;
    index: number;
  }) => {
    return (
      <View style={{ height: fontSize, overflow: "hidden" }}>
        <MotiView
          animate={{ translateY: -fontSize * digit * 1.1 }}
          transition={{ damping: 100, stiffness: 100, type: "spring" }}
        >
          {totalNumbers.map((number) => (
            <Tick
              key={`${digit}-${number}-index-${index}`}
              style={{
                fontSize: fontSize,
                lineHeight: fontSize * 1.1,
                fontWeight: "800",
              }}
            >
              {number}
            </Tick>
          ))}
        </MotiView>
      </View>
    );
  }
);
TickerList.displayName = "TickerList";

const AnimatedCounter = ({
  value,
  fontSize = 40,
 }: Props) => {
  const formatted = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }, [value]);

  const valueArray = useMemo(() => formatted.toString().split(""), [formatted]);

  return (
    <View>
      <ThemedView
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          backgroundColor: "transparent",
        }}
      >
        {valueArray.map((digit, index) => {
          if (!isNaN(parseInt(digit))) {
            return (
              <TickerList
                key={index}
                digit={parseInt(digit)}
                fontSize={fontSize}
                index={index}
              />
            );
          } else {
            return (
              <Tick
                key={index}
                style={{
                  fontSize: fontSize,
                  lineHeight: fontSize * 1.1,
                  opacity: 0.5,
                }}
              >
                {digit}
              </Tick>
            );
          }
        })}
      </ThemedView>
    </View>
  );
};

export default AnimatedCounter;
