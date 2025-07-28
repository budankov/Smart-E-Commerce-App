import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import CheckOutScreen from "../screens/cart/CheckOutScreen";
import MyOrdersScreen from "../screens/profile/MyOrdersScreen";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator();

export default function MainAppStack() {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainAppBottomTabs" component={MainAppBottomTabs} />
      <Stack.Screen
        name="CheckOutScreen"
        options={{ headerShown: true }}
        component={CheckOutScreen}
      />
      <Stack.Screen
        name="MyOrdersScreen"
        options={{ headerShown: true, title: t("profile_my_orders") }}
        component={MyOrdersScreen}
      />
    </Stack.Navigator>
  );
}
