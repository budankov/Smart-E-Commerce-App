import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { showMessage } from "react-native-flash-message";
import { useTranslation } from "react-i18next";
import i18n from "../localization/i18n";

export const getProductsData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const list = [];

    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });

    return list;
  } catch (error) {
    showMessage({
      type: "danger",
      message: i18n.t("massage_error_fetching_data"),
    });
  }
};

export const fetchUserOrders = async () => {
  try {
    const userId = auth.currentUser?.uid;
    const userOrdersRef = collection(doc(db, "users", userId), "orders");
    const querySnapshot = await getDocs(userOrdersRef);
    const orderList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return orderList;
  } catch (error) {
    showMessage({
      type: "danger",
      message: i18n.t("massage_error_fetching_orders"),
    });
  }
};
