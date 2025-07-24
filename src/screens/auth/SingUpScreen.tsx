import React, { useState } from "react";
import { Alert, Image, StyleSheet } from "react-native";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-paths";
import { s, vs } from "react-native-size-matters";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import data from "../../../node_modules/yup/node_modules/type-fest/source/readonly-deep.d";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";

const schema = yup
  .object({
    userName: yup
      .string()
      .required("User name is required")
      .min(5, "User name must be more than 5 characters"),

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

const SingUpScreen = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSingUpPress = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      Alert.alert("User Created");
      navigation.navigate("MainAppBottomTabs");

      const userDataObj = {
        uid: userCredential.user.uid,
      };

      dispatch(setUserData(userDataObj));
    } catch (error: any) {
      let errorMessage = "";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email already in use";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "The password is too weak";
      } else {
        errorMessage = "An error occurred during sing-up";
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
      <AppTextInputController
        control={control}
        name="userName"
        placeholder="User Name"
      />
      <AppTextInputController
        control={control}
        name="email"
        placeholder="Email"
      />
      <AppTextInputController
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <AppText style={styles.appName}>Smart E-Commerce</AppText>
      <AppButton
        title="Create New Account"
        onPress={handleSubmit(onSingUpPress)}
      />
      <AppButton
        title="Go To Sing In"
        style={styles.singInButton}
        textColor={AppColors.primary}
        onPress={() => navigation.navigate("SingInScreen")}
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
  singInButton: {
    backgroundColor: AppColors.white,
    borderColor: AppColors.primary,
    marginTop: vs(15),
    borderWidth: 1,
  },
});

export default SingUpScreen;
