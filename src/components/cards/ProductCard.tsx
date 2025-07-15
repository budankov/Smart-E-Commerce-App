import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { s, vs } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import AppText from "../texts/AppText";
import { AppFonts } from "../../styles/fonts";
import { Ionicons } from "@expo/vector-icons";
import { commonStyles } from "../../styles/sharedStyles";

interface ProductCardProps {
  onAddToCardPress: () => void;
  imageURL: string;
  title: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  onAddToCardPress,
  imageURL,
  title,
  price,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Add To Cart Button */}
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={onAddToCardPress}
        >
          <Ionicons name="cart" size={s(15)} color={AppColors.white} />
        </TouchableOpacity>
        {/* Image UI */}
        <Image
          source={{
            uri: imageURL,
          }}
          style={styles.image}
        />
      </View>
      {/* Details */}
      <View style={styles.detailsContainer}>
        <AppText style={styles.titleText}>{title}</AppText>
        <AppText style={styles.priceText}>{price}$</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: s(160),
    height: vs(190),
    backgroundColor: AppColors.white,
    borderRadius: s(10),
    ...commonStyles.shadow,
  },
  imageContainer: {
    overflow: "hidden",
    borderTopLeftRadius: s(10),
    borderTopRightRadius: s(10),
    height: vs(130),
    width: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  detailsContainer: {
    flex: 1,
    paddingTop: vs(8),
    paddingBottom: vs(15),
    paddingHorizontal: s(10),
  },
  titleText: {
    fontSize: s(14),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
  },
  priceText: {
    fontSize: s(14),
    fontFamily: AppFonts.Bold,
    color: AppColors.primary,
    marginTop: vs(7),
  },
  addToCartButton: {
    height: s(28),
    width: s(28),
    position: "absolute",
    left: 5,
    top: 5,
    borderRadius: s(14),
    backgroundColor: AppColors.primary,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductCard;
