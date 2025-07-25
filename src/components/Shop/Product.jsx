import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/action/productAction";
import LoadingPage from "../LoadingPage/LoadingPage";
import { Link } from "react-router-dom";
import { addToCart } from "../../store/reducer/cartSlice";
import Footer from "../pages/Footer";
const Product = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const [selectCategory, setSelectCategory] = useState("All");
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <LoadingPage />;
  // filtered
  const filteredItems =
    selectCategory === "All"
      ? items
      : items.filter(
          (product) =>
            product.category &&
            product.category.toLowerCase() === selectCategory.toLowerCase()
        );
  return (
    <>
      <div className="w-full min-h-screen  p-2 bg-vo ">
        <div className="category-Sections  hide-bar font-manrope  flex gap-3 overflow-x-auto w-full px-2 py-2 mt-2 md:px-4 md:py-3">
          {[
            "All",
            "T-shirts",
            "Oversize-T-shirts",
            "Mugs",
            "Hoodies",
            "Bottom Fits",
            "calendar",
          ].map((elm, index) => (
            <button
              key={index}
              onClick={() => setSelectCategory(elm)}
              className={`items bg-[#5a5b5cab] cursor-pointer backdrop-blur-sm shadow-2xl px-6 py-1.5 shrink-0 select-none rounded-full transition active:scale-95 focus:outline-none ${
                selectCategory === elm
                  ? "bg-yellow-500 text-black"
                  : "bg-[#5a5b5cab] text-white"
              }`}
              type="button">
              <h1 className="">{elm}</h1>
            </button>
          ))}
        </div>
        {/* products - show -case  */}
        <div className="product-show-case grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full font-poppins p-2">
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((product) => (
              <div
                key={product.id}
                className="bg-[#232323] rounded-xl shadow-lg flex flex-col items-center p-4 transition-transform hover:scale-105">
                <Link
                  to={`/shop/${product.id}`}
                  className="w-full h-48 flex items-center justify-center mb-4 overflow-hidden rounded-lg bg-[#181818]">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-contain h-full w-full"
                    />
                  ) : (
                    <div className="text-gray-400">No Image</div>
                  )}
                </Link>
                <h2 className="font-bold text-lg text-white mb-2 text-center">
                  {product.name}
                </h2>
                <p className="text-gray-300 text-sm mb-2 text-center line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between w-full mt-auto">
                  <span className="text-yellow-400 font-semibold text-base">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="ml-auto bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold hover:bg-yellow-300 active:scale-90 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-10">
              No products found.
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Product;
