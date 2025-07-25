import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../store/action/productAction";
import { useParams } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const headingText = "Our Best Collection";
const oversizeText = "OverSize Top Fits";

const BestCollection = () => {
  const headingRef = useRef(null);
  const oversizeRef = useRef(null);
  const dispatch = useDispatch();
  const [overSize_t_shirts, setOverSize_t_shirts] = useState([]);
  const [bottomFits, setbottomFits] = useState([]);
  const { categoryItems } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProductsByCategory("Oversize-T-shirts")).then((data) =>
      setOverSize_t_shirts(data)
    );
  }, []);

  // Animation for main heading
  useGSAP(() => {
    if (!headingRef.current) return;
    const chars = headingRef.current.querySelectorAll(".best-collection-char");
    gsap.from(chars, {
      y: 80,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 2,
      },
    });
  }, []);

  // Animation for oversize-text
  useGSAP(() => {
    if (!oversizeRef.current) return;
    const chars = oversizeRef.current.querySelectorAll(".oversize-char");
    gsap.from(chars, {
      y: 60,
      opacity: 0,
      stagger: 0.04,
      duration: 0.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: oversizeRef.current,
        start: "top 90%",
        end: "bottom 70%",
        scrub: 2,
      },
    });
  }, []);

  return (
    <div className="sm:mt-20 lg:mt-30 w-full min-h-screen">
      <div className="text-4xl font-montserrat">
        <h1
          ref={headingRef}
          className="text-center text-4xl lg:text-7xl flex justify-center flex-wrap"
        >
          {headingText.split("").map((char, i) =>
            char === " " ? (
              <span key={i} className="mx-2"></span>
            ) : (
              <span
                key={i}
                className="best-collection-char inline-block"
                style={{ display: "inline-block" }}
              >
                {char}
              </span>
            )
          )}
        </h1>
      </div>
      {/* overSize T-shirts */}
      <div className="overSize-t-shirts font-montserrat mt-20 px-2">
        <h1
          ref={oversizeRef}
          className="oversize-text text-3xl md:text-5xl flex flex-wrap"
        >
          {oversizeText.split("").map((char, i) =>
            char === " " ? (
              <span key={i} className="mx-1"></span>
            ) : (
              <span
                key={i}
                className="oversize-char inline-block"
                style={{ display: "inline-block" }}
              >
                {char}
              </span>
            )
          )}
        </h1>
      </div>
      <div
        className="
        grid 
        gap-6
        lg:gap-10 
        grid-cols-1
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        w-full
        p-4 
        mt-4
      "
      >
        {overSize_t_shirts.map((product, idx) => (
          <div
            key={idx}
            className="group relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between transition-transform hover:-translate-y-2 hover:shadow-2xl"
            style={{ minHeight: "22rem" }}
          >
            <div className="relative w-full h-60 md:h-90 flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Product Info */}
            <div className="flex flex-col items-center justify-center p-4">
              <h2 className="text-lg md:text-xl font-bold font-montserrat text-center text-white mb-1">
                {product.name}
              </h2>
              <p className="text-base md:text-lg font-poppins text-yellow-400 text-center font-semibold">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestCollection;
