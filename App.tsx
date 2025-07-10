import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppText from "./src/components/texts/AppText";
import AppSaveView from "./src/components/views/AppSaveView";

export default function App() {
  return (
    <AppSaveView style={styles.container}>
      <AppText variant="medium">Hello hello</AppText>
      <AppText variant="bold">Hello hello</AppText>
    </AppSaveView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
