import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import EmptyScreen from "./EmptyScreen";
import CartItem from "../../components/cart/CartItem";
import TotalsView from "../../components/cart/TotalsView";
import { products } from "../../data/products";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import AppButton from "../../components/buttons/AppButton";

const CartScreen = () => {
  return (
    <AppSaveView>
      <HomeHeader />
      {/* <EmptyScreen /> */}
      <View style={{ paddingHorizontal: sharedPaddingHorizontal, flex: 1 }}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <CartItem {...item} />;
          }}
          showsVerticalScrollIndicator={false}
        />
        <TotalsView itemsPrice={5000} orderTotal={5025} />
        <AppButton title="Continue" />
      </View>
    </AppSaveView>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
