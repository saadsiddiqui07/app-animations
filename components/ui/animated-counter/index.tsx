// create a component that animates a counter

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
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
}: {
  digit: number;
  fontSize: number;
}) => {
  return (
    <View style={{ height: fontSize, backgroundColor: "royalblue" }}>
      <View style={{transform: [{translateY: -fontSize * digit * 1.1}]}}>
        {totalNumbers.map((number) => (
          <Tick
            key={`${digit}-${number}-index`}
            style={{ fontSize: fontSize, lineHeight: fontSize * 1.1 }}
          >
            {number}
          </Tick>
        ))}
      </View>
    </View>
  );
};

const AnimatedCounter = ({ value, fontSize = 40 }: Props) => {
  const valueArray = value.toString().split("");
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedView style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {valueArray.map((digit, index) => (
          <TickerList key={index} digit={parseInt(digit)} fontSize={fontSize} />
        ))}
      </ThemedView>
    </ThemedView>
  );
};

export default AnimatedCounter;
