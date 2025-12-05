import GlobalLayout from "@/components/global-layout";
import StockHeader from "@/components/stock-dashboard/Header";
import AnimatedCounter from "@/components/ui/animated-counter";
import { StyleSheet } from "react-native";

const StockDashboard = () => {
  return (
    <GlobalLayout style={styles.container}>
      <StockHeader />
      <AnimatedCounter value={98045} />
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
