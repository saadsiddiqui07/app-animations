import GlobalLayout from "@/components/global-layout";


import { StyleSheet } from "react-native";

import StockHeader from "@/components/stock-dashboard/Header";

const StockDashboard = () => {

  return (
    <GlobalLayout style={styles.container}>
      <StockHeader />
    </GlobalLayout>
  );
};  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
}); 

export default StockDashboard;