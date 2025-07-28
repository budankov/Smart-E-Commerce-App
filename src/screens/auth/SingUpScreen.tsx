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
import { useTranslation } from "react-i18next";

type FormData = yup.InferType<typeof schema>;

const SingUpScreen = () => {
  const { t } = useTranslation();

  const schema = yup
    .object({
      userName: yup
        .string()
        .required(t("sign_up_username_required"))
        .min(5, t("sign_up_username_min_length")),
      email: yup
        .string()
        .email(t("sign_up_email_invalid"))
        .required(t("sign_up_email_required")),
      password: yup
        .string()
        .required(t("sign_up_password_required"))
        .min(6, t("sign_up_password_min_length")),
    })
    .required();

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

      Alert.alert(t("sign_up_success"));
      navigation.navigate("MainAppBottomTabs");

      const userDataObj = {
        uid: userCredential.user.uid,
      };

      dispatch(setUserData(userDataObj));
    } catch (error: any) {
      let errorMessage = "";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = t("sign_up_error_email_in_use");
      } else if (error.code === "auth/invalid-email") {
        errorMessage = t("sign_up_error_invalid_email");
      } else if (error.code === "auth/weak-password") {
        errorMessage = t("sign_up_error_weak_password");
      } else {
        errorMessage = t("sign_up_error_default");
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
        placeholder={t("sign_up_username_placeholder")}
      />
      <AppTextInputController
        control={control}
        name="email"
        placeholder={t("sign_up_email_placeholder")}
      />
      <AppTextInputController
        control={control}
        name="password"
        placeholder={t("sign_up_password_placeholder")}
        secureTextEntry
      />
      <AppText style={styles.appName}>Smart E-Commerce</AppText>
      <AppButton
        title={t("sign_up_create_account_button")}
        onPress={handleSubmit(onSingUpPress)}
      />
      <AppButton
        title={t("sign_up_goto_signin_button")}
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
