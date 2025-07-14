import { StatusBar } from "expo-status-bar";
import FlashMessage, { showMessage } from "react-native-flash-message";
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <FlashMessage position={"top"} />
      <AuthStack />
    </NavigationContainer>
  );
}
