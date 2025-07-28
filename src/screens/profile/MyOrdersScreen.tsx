import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import AppSaveView from "../../components/views/AppSaveView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import OrderItem from "../../components/cart/OrderItem";
import { fetchUserOrders } from "../../config/dataServices";
import { getDateFromFireStoreTimeStampObject } from "../../helpers/dateTimeHelper";

const MyOrdersScreen = () => {
  const [ordersList, setOrdersList] = useState([]);

  const getOrders = async () => {
    const response = await fetchUserOrders();
    setOrdersList(response);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <AppSaveView>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: sharedPaddingHorizontal }}
        data={ordersList}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={({ item }) => (
          <OrderItem
            date={getDateFromFireStoreTimeStampObject(item.createdAt)}
            totalAmount={item.totalProductsPricesSum}
            totalPrice={item.totalPrice}
            style={{ marginBottom: 10 }}
          />
        )}
      />
    </AppSaveView>
  );
};

const styles = StyleSheet.create({});

export default MyOrdersScreen;
