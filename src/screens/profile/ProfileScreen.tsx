import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";

const ProfileScreen = () => {
  return (
    <AppSaveView>
      <HomeHeader />
    </AppSaveView>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
