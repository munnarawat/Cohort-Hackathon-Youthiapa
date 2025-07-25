import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../action/productAction";
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categoryItems:[],
    loading: false,
  },
  reducers: {
    setCategoryItems:(state,action)=>{
      state.categoryItems = action.payload;
    },
    setLoading:(state,action)=>{
      state.loading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});
export  const {setCategoryItems, setLoading} = productSlice.actions
export default productSlice.reducer;
