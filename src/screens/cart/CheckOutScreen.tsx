import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppSaveView from "../../components/views/AppSaveView";
import {
  commonStyles,
  sharedPaddingHorizontal,
} from "../../styles/sharedStyles";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppButton from "../../components/buttons/AppButton";
import { IS_ANDROID, IS_IOS } from "../../constants/constants";
import AppTextInputController from "../../components/inputs/AppTextInputController";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    fullName: yup
      .string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),

    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Phone number must be at least 10 digits"),

    detailedAddress: yup
      .string()
      .required("Address is required")
      .min(
        15,
        "Please, provide a detailed address with at least 15 characters"
      ),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const CheckOutScreen = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const saveOrder = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <AppSaveView>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <View style={styles.inputsContainer}>
          <AppTextInputController
            control={control}
            name={"fullName"}
            placeholder="Full name"
          />
          <AppTextInputController
            control={control}
            name={"phoneNumber"}
            placeholder="Phone number"
          />
          <AppTextInputController
            control={control}
            name={"detailedAddress"}
            placeholder="Detailed Address"
          />
        </View>
      </View>
      <View style={styles.bottomButtonContainer}>
        <AppButton title="Confirm" onPress={handleSubmit(saveOrder)} />
      </View>
    </AppSaveView>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    ...commonStyles.shadow,
    padding: s(8),
    borderRadius: s(8),
    backgroundColor: AppColors.white,
    marginTop: IS_IOS ? vs(15) : undefined,
    paddingTop: vs(15),
  },
  bottomButtonContainer: {
    paddingHorizontal: sharedPaddingHorizontal,
    position: "absolute",
    width: "100%",
    bottom: IS_ANDROID ? vs(20) : 0,
    borderTopWidth: 1,
    borderColor: AppColors.lightGray,
    paddingTop: vs(10),
  },
});

export default CheckOutScreen;
