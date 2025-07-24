import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";

export const getProductsData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const list = [];

    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });

    return list;
  } catch (error) {
    console.error("Error fetching data:", error);
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
    console.error("Error fetching orders:", error);
  }
};
