import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import EmptyScreen from "./EmptyScreen";
import CartItem from "../../components/cart/CartItem";
import TotalsView from "../../components/cart/TotalsView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import AppButton from "../../components/buttons/AppButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  addItemToCart,
  removeItemFromCart,
  removeProductFromCart,
} from "../../store/reducers/cartSlice";
import { shippingFees, taxes } from "../../constants/constants";

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cartSlice);
  const totalProductsPricesSum = items.reduce((acc, item) => acc + item.sum, 0);
  const orderTotal = totalProductsPricesSum + shippingFees + taxes;

  return (
    <AppSaveView>
      <HomeHeader />
      {items.length > 0 ? (
        <View style={{ paddingHorizontal: sharedPaddingHorizontal, flex: 1 }}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <CartItem
                  {...item}
                  price={item.sum}
                  onIncreasePress={() => dispatch(addItemToCart(item))}
                  onReducePress={() => dispatch(removeItemFromCart(item))}
                  onDeletePress={() => dispatch(removeProductFromCart(item))}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
          />
          <TotalsView
            itemsPrice={totalProductsPricesSum}
            orderTotal={orderTotal}
          />
          <AppButton
            title="Continue"
            onPress={() => navigation.navigate("CheckOutScreen")}
          />
        </View>
      ) : (
        <EmptyScreen />
      )}
    </AppSaveView>
  );
};

const styles = StyleSheet.create({});

export default CartScreen;
