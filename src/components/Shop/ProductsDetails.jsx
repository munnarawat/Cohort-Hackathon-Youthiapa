import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { addToCart } from "../../store/reducer/cartSlice";
import Footer from "../pages/Footer";

const ProductsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.products);
  const product = items?.find((product) => String(product.id) === String(id));

  // Refs for animation
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);
  const priceRef = useRef(null);

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(product?.image);

  useEffect(() => {
    // Reset selected image when product changes
    setSelectedImage(product?.image);
  }, [product]);

  useEffect(() => {
    if (!loading && product) {
      // Animate container fade-in
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }
      );
      // Animate image pop-in
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          delay: 0.2,
          ease: "back.out(1.7)",
        }
      );
      // Animate details slide-in
      gsap.fromTo(
        detailsRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, delay: 0.4, ease: "power2.out" }
      );
      // Animate price bounce
      gsap.fromTo(
        priceRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, delay: 0.7, ease: "bounce.out" }
      );
    }
  }, [loading, product]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d]">
        <span className="loading loading-spinner loading-lg text-yellow-400"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0d0d] text-white">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button
          className="px-6 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
          onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  // Prepare images array: always at least one image
  const images = [product.image];
  if (product.image2) {
    images.push(product.image2);
  }

  return (
    <>
      <div
        ref={containerRef}
        className="min-h-screen overflow-hidden bg-gradient-to-br from-[#181818] via-[#232323] to-[#0d0d0d] flex flex-col md:flex-row items-center justify-center p-4 sm:p-6">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-2 sm:p-6">
          <div className="bg-[#18181b] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center h-60 w-60 sm:h-80 sm:w-80 md:h-[400px] md:w-[400px] border border-[#232323] relative group transition-all duration-300 hover:shadow-yellow-400/30">
            <img
              ref={imageRef}
              src={selectedImage}
              alt={product.name}
              className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-110"
              style={{ filter: "drop-shadow(0 8px 32px #ffd60044)" }}
            />
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-yellow-400 text-black text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full shadow-lg uppercase tracking-wider opacity-80">
              {product.category || "General"}
            </div>
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`border-2 rounded-lg p-1 transition-all duration-200 ${
                    selectedImage === img
                      ? "border-yellow-400 shadow-yellow-400/40 shadow"
                      : "border-transparent opacity-70 hover:opacity-100"
                  } bg-[#232323]`}
                  style={{ width: 60, height: 60 }}
                  tabIndex={0}
                  aria-label={`Show image ${idx + 1}`}>
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="object-contain w-full h-full rounded-md"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Details Section */}
        <div
          ref={detailsRef}
          className="w-full md:w-1/2 flex flex-col gap-5 sm:gap-7 p-4 sm:p-8 text-white bg-[#18181b]/60 rounded-xl sm:rounded-2xl shadow-xl backdrop-blur-md">
          {/* Name and Price Row */}
          <div className="flex flex-col mb-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-manrope tracking-tight leading-tight drop-shadow-lg">
              {product.name}
            </h1>
            <div className="flex items-end gap-3 mt-2 sm:mt-4">
              <span
                ref={priceRef}
                className="text-2xl sm:text-3xl font-bold text-yellow-400 drop-shadow">
                ₹{product.price}
              </span>
              {product.oldPrice && (
                <span className="text-base sm:text-lg line-through text-gray-500">
                  ₹{product.oldPrice}
                </span>
              )}
            </div>
          </div>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            {product.description || "No description available."}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 sm:mt-6">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-300 hover:to-yellow-400 text-black font-bold px-6 sm:px-10 py-2.5 sm:py-3 rounded-lg sm:rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2">
              Add to Cart
            </button>
            <button
              className="bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold px-6 sm:px-10 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-200 shadow-lg"
              onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
          <div className="mt-6 sm:mt-8 flex items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-400">Category:</span>
            <span className="font-medium text-white bg-[#232323] px-2 sm:px-3 py-1 rounded-full text-xs tracking-wide">
              {product.category || "General"}
            </span>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProductsDetails;
