import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { setCategoryItems, setLoading } from "../reducer/productSlice";
import { db } from "../../Firebase/Firebase";
// products fetch
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, "products"));

  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

//   console.log("🔥 Firebase se mila data:", products); 
  return products;
});

// product category 
export const fetchProductsByCategory = (category) => async (dispatch) => {
  dispatch(setLoading(true));
  // console.log("🔍 Selected Category:", category);
  try {
    // 🔥 Check if user selected "All"
    if (category === "All") {
      const querySnapshot = await getDocs(collection(db, "products"));
      const allData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setCategoryItems(allData));
      return allData;
    } else {
      // Filtered by category
      const q = query(
        collection(db, "products"),
        where("category", "==", category)
      );
      const snapShot = await getDocs(q);
      const categoryData = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setCategoryItems(categoryData));
      return categoryData;
    }
  } catch (error) {
    console.error("❌ Category fetch error:", error);
    dispatch(setCategoryItems([])); // fallback
  } finally {
    dispatch(setLoading(false));
  }
};


