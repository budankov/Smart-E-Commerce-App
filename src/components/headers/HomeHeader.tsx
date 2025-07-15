import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { AppColors } from "../../styles/colors";
import { s, vs } from "react-native-size-matters";
import { IMAGES } from "../../constants/images-paths";

const HomeHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: vs(10),
  },
  logo: {
    height: vs(40),
    width: s(40),
    tintColor: AppColors.white,
  },
});

export default HomeHeader;
