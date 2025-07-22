import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-paths";
import { s, vs } from "react-native-size-matters";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please, enter a valid email")
      .required("Email is required"),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const SingInScreen = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();

  const onLoginPress = async (data: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      navigation.navigate("MainAppBottomTabs");
      console.log(userCredential);
    } catch (error: any) {
      let errorMessage = "";
      if (error.code === "auth/user-not-found") {
        errorMessage = "User not found";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Wrong email or password";
      } else {
        errorMessage = "An error occurred during sing-in";
      }

      showMessage({
        message: errorMessage,
        type: "danger",
      });
    }
  };

  return (
    <AppSaveView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppTextInputController<FormData>
        control={control}
        name="email"
        placeholder="Email"
      />
      <AppTextInputController<FormData>
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <AppText style={styles.appName}>Smart E-Commerce</AppText>
      <AppButton title="Login" onPress={handleSubmit(onLoginPress)} />
      <AppButton
        title="Sing Up"
        style={styles.registerButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SingUpScreen")}
      />
    </AppSaveView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: s(150),
    width: s(150),
    marginBottom: vs(30),
  },
  appName: {
    fontSize: s(16),
    marginBottom: vs(15),
  },
  registerButton: {
    backgroundColor: AppColors.white,
    borderColor: AppColors.primary,
    marginTop: vs(15),
    borderWidth: 1,
  },
});

export default SingInScreen;
