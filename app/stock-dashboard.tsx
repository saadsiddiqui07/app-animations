import GlobalLayout from "@/components/global-layout";
import StockHeader from "@/components/stock-dashboard/Header";
import AnimatedCounter from "@/components/ui/animated-counter";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";

const StockDashboard = () => {
  const [value, setValue] = useState<number>(24908.15);

  const generateRandomValueInRange = () => {
    setInterval(() => {
      setValue((Math.random() * 10000 + 23500));
    }, 2000);
  };

  useLayoutEffect(() => {
    generateRandomValueInRange();
  }, []);

  return (
    <GlobalLayout style={styles.container}>
      <StockHeader />
      <AnimatedCounter value={value} />
    </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default StockDashboard;
