import GlobalLayout from "@/components/global-layout";
import StockHeader from "@/components/stock-dashboard/Header";
import AnimatedCounter from "@/components/ui/animated-counter";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

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
      <AnimatedCounter value={value} fontSize={35} />
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
