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
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/reducers/userSlice";
import { useTranslation } from "react-i18next";

type FormData = yup.InferType<typeof schema>;

const SingInScreen = () => {
  const { t } = useTranslation();

  const schema = yup
    .object({
      email: yup
        .string()
        .email(t("sign_in_email_invalid"))
        .required(t("sign_in_email_required")),
      password: yup
        .string()
        .required(t("sign_in_password_required"))
        .min(6, t("sign_in_password_min_length")),
    })
    .required();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLoginPress = async (data: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      navigation.navigate("MainAppBottomTabs");

      const userDataObj = {
        uid: userCredential.user.uid,
      };

      dispatch(setUserData(userDataObj));
    } catch (error: any) {
      let errorMessage = "";
      if (error.code === "auth/user-not-found") {
        errorMessage = t("sign_in_error_user_not_found");
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = t("sign_in_error_invalid_credential");
      } else {
        errorMessage = t("sign_in_error_default");
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
        placeholder={t("sign_in_email_placeholder")}
      />
      <AppTextInputController<FormData>
        control={control}
        name="password"
        placeholder={t("sign_in_password_placeholder")}
        secureTextEntry
      />
      <AppText style={styles.appName}>Smart E-Commerce</AppText>
      <AppButton
        title={t("sign_in_login_button")}
        onPress={handleSubmit(onLoginPress)}
      />
      <AppButton
        title={t("sign_in_signup_button")}
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
