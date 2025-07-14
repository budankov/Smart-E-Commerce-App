import React from "react";
import { StyleSheet, TextInput, ViewStyle } from "react-native";
import { placeholder } from "../../../node_modules/@babel/types/lib/index-legacy.d";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";

interface AppTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType: "default" | "email-address" | "numeric";
  style?: ViewStyle | ViewStyle[];
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  style,
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={[styles.input, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: vs(40),
    borderRadius: s(25),
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    paddingHorizontal: s(15),
    fontSize: s(16),
    backgroundColor: AppColors.white,
    width: "100%",
    marginBottom: vs(10),
  },
});

export default AppTextInput;
