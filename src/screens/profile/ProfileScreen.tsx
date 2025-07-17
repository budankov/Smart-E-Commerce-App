import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import ProfileSectionButton from "../../components/buttons/ProfileSectionButton";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import AppText from "../../components/texts/AppText";
import { vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <AppSaveView>
      <HomeHeader />
      <AppText variant="bold" style={{ margin: vs(10) }}>
        Hello, Kostya
      </AppText>
      <View style={{ paddingHorizontal: sharedPaddingHorizontal }}>
        <ProfileSectionButton
          title={"My Orders"}
          onPress={() => navigation.navigate("MyOrdersScreen")}
        />
        <ProfileSectionButton title={"Language"} onPress={"text"} />
        <ProfileSectionButton title={"Logout"} onPress={"text"} />
      </View>
    </AppSaveView>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
