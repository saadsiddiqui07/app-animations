// create a component that animates a counter

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MotiView } from "moti";
import { TextProps, View } from "react-native";

interface Props {
  value: number;
  fontSize?: number;
}

const totalNumbers = [...Array(10).keys()];

const Tick = ({ children, ...rest }: TextProps) => {
  return <ThemedText {...rest}>{children}</ThemedText>;
};

const TickerList = ({
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
};

const AnimatedCounter = ({ value, fontSize = 40 }: Props) => {
  const intNumbers = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)

  const valueArray = intNumbers.toString().split("");

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <ThemedView style={{ flexDirection: "row", flexWrap: "wrap" }}>
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
                  fontWeight: "800",
                  opacity: 0.5,
                }}
              >
                {digit}
              </Tick>
            );
          }
        })}
      </ThemedView>
    </ThemedView>
  );
};

export default AnimatedCounter;
