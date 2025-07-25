import React from "react";
import Lottie from "lottie-react";
import cart from "../../assets/lottie/emptyCart.json";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../../store/reducer/cartSlice";
import { FiPlus, FiMinus } from "react-icons/fi";

const AddToCart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const isEmpty = !items || items.length === 0;

  return (
    <div className="w-full min-h-screen">
      {isEmpty ? (
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <Lottie
            className="sm:w-[60%] md:w-1/2 lg:w-[40%]"
            animationData={cart}
            loop={true}
          />
          <h2 className="text-white text-4xl mt-4 font-montserrat font-semibold">Your cart is empty!</h2>
        </div>
      ) : (
        <div className="max-w-2xl font-poppins mx-auto py-10 px-4">
          <h2 className="text-2xl font-bold  text-white mb-6">Your Cart</h2>
          <ul className="divide-y divide-gray-700  rounded-xl shadow-lg">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-4 px-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md border border-[#897cec] bg-[#23242a]"
                  onError={e => { e.target.src = "https://via.placeholder.com/64x64?text=No+Image"; }}
                />
                <div className="flex-1 flex flex-col ">
                  <div className="text-white font-semibold text-lg">{item.name}</div>
                  <div className="text-yellow-400 font-bold text-base mt-1">₹{item.price}</div>
                  <div className="text-gray-400 text-sm flex items-center gap-2 justify-between mt-1">
                    <span>Qty: {item.quantity}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(addToCart(item))}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black p-1 rounded-full transition flex items-center justify-center"
                        title="Add one more"
                        style={{ width: 28, height: 28 }}
                      >
                        <FiPlus size={18} />
                      </button>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-full transition flex items-center justify-center"
                        title="Remove from cart"
                        style={{ width: 28, height: 28 }}
                      >
                        <FiMinus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
