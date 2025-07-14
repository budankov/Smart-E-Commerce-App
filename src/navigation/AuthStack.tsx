import { createStackNavigator } from "@react-navigation/stack";
import SingInScreen from "../screens/auth/SingInScreen";
import SingUpScreen from "../screens/auth/SingUpScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SingInScreen" component={SingInScreen} />
      <Stack.Screen name="SingUpScreen" component={SingUpScreen} />
    </Stack.Navigator>
  );
}
