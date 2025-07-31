import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { I18nextProvider } from "react-i18next";
import { ActivityIndicator } from "react-native";
import FlashMessage from "react-native-flash-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import i18n from "./src/localization/i18n";
import MainAppStack from "./src/navigation/MainAppStack";
import { persistor, store } from "./src/store/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Medium": require("./src/assets/fonts/Nunito-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            <FlashMessage position={"top"} statusBarHeight={50} />
            <MainAppStack />
          </NavigationContainer>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}
