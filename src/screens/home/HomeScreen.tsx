import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import AppSaveView from "../../components/views/AppSaveView";
import HomeHeader from "../../components/headers/HomeHeader";
import { AppFonts } from "../../styles/fonts";
import data from "../../../node_modules/type-fest/source/readonly-deep.d";
import ProductCard from "../../components/cards/ProductCard";
import { s } from "react-native-size-matters";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/reducers/cartSlice";
import { getProductsData } from "../../config/dataServices";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const data = await getProductsData();
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppSaveView>
      <HomeHeader />
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            imageURL={item.imageURL}
            title={item.title}
            price={item.price}
            onAddToCardPress={() => {
              dispatch(addItemToCart(item));
            }}
          />
        )}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: s(10),
        }}
        contentContainerStyle={{
          paddingHorizontal: s(10),
        }}
      />
    </AppSaveView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
