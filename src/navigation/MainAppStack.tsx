import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import CheckOutScreen from "../screens/cart/CheckOutScreen";
import MyOrdersScreen from "../screens/profile/MyOrdersScreen";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setLoading } from "../store/reducers/userSlice";
import { useEffect } from "react";
import { RootState } from "../store/store";
import { ActivityIndicator, View } from "react-native";
import { AppColors } from "../styles/colors";

const Stack = createStackNavigator();

export default function MainAppStack() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userData, isLoading } = useSelector(
    (state: RootState) => state.userSlice
  );

  const isUserLoggedIn = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("USER_DATA");

      if (storedUserData) {
        dispatch(setUserData(JSON.parse(storedUserData)));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.error("Error reading stored user", error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

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
