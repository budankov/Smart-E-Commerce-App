import { onAuthStateChanged } from "@firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { auth } from "../config/firebase";
import CheckOutScreen from "../screens/cart/CheckOutScreen";
import MyOrdersScreen from "../screens/profile/MyOrdersScreen";
import { AppColors } from "../styles/colors";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";

const Stack = createStackNavigator();

export default function MainAppStack() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<object | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    onAuthStateChanged(auth, (userDataFromFireBase) => {
      if (userDataFromFireBase) {
        console.log("User is Signed In");
        setIsLoading(false);
        setUserData(userDataFromFireBase);
      } else {
        console.log("User is Signed Out");
        setIsLoading(false);
      }
    });
  });

  if (isLoading) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size={"large"} color={AppColors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userData ? "MainAppBottomTabs" : "AuthStack"}
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
