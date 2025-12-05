import GlobalLayout from '@/components/global-layout';
import { ThemedText } from '@/components/themed-text';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <GlobalLayout style={styles.container}> 
      <ThemedText type="title">Animation Examples</ThemedText>
      <ThemedText type="subtitle">
        <Link href="/chat-reaction">Chat Reaction</Link>
      </ThemedText>
      <ThemedText type="subtitle">
        <Link href="/stock-dashboard">Stock Dashboard</Link>
      </ThemedText>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  list: {
    gap: 12,
  },
  item: {
    fontSize: 18,
  },
});

