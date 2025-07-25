import React, { useRef } from "react";
import bb1 from "../../assets/images/bb-img1.jpg";
import img2 from "../../assets/images/clothes-2.jpg";
import img3 from "../../assets/images/clothes-3.png";
import { IoAdd } from "react-icons/io5";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    img: img3,
    name: "b(art)terfly tee",
    price: "Rs. 1,999.00",
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    shadow: "shadow-pink-500/30",
  },
  {
    img: img2,
    name: "Orange Truth",
    price: "Rs. 1,999.00",
    gradient: "from-orange-400 via-yellow-400 to-pink-400",
    shadow: "shadow-orange-400/30",
  },
  {
    img: bb1,
    name: "Dooms Day Tee",
    price: "Rs. 1,999.00",
    gradient: "from-gray-700 via-gray-900 to-black",
    shadow: "shadow-gray-700/30",
  },
];

function Collection() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const wrapperRef = useRef(null);
  const glowRef = useRef(null);

  const titleText = "Exclusive Look";
  const subtitleText = "Unleash Your Style. Scroll for the Drop.";

  useGSAP(() => {
    // Animate title characters with a neon glow
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll(".collection-title-char");
      gsap.fromTo(
        chars,
        { opacity: 0, y: 80, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          color: "#fff",
          textShadow: "0 0 24px #a78bfa, 0 0 48px #6366f1",
          stagger: 0.08,
          duration: 0.7,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 2,
          },
        }
      );
    }

    // Animate subtitle fade-in and slide up
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 90%",
            end: "bottom 80%",
            scrub: 1,
          },
        }
      );
    }

    // Animate product cards: scale, rotate, and fade in on scroll
    if (wrapperRef.current) {
      const cards = wrapperRef.current.querySelectorAll(".img-wrapper");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 120,
            scale: 0.85,
            rotate: i % 2 === 0 ? -8 : 8,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "bottom 80%",
              scrub: 2,
            },
          }
        );
      });
    }

    // Animate glowing background
    if (glowRef.current) {
      gsap.fromTo(
        glowRef.current,
        { opacity: 0.2, scale: 0.8 },
        {
          opacity: 0.7,
          scale: 1.1,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: glowRef.current,
            start: "top 90%",
            end: "bottom 60%",
            scrub: 2,
          },
        }
      );
    }
  }, []);

  return (
    <div className="relative w-full  min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f051d] via-[#1a1333] to-[#18181b] px-2 py-8">
      {/* Glowing background effect */}
      <div
        ref={glowRef}
        className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-3xl opacity-40"
      ></div>
      {/* Title */}
      <h1
        ref={titleRef}
        className="title font-montserrat text-4xl sm:text-6xl lg:text-8xl text-center flex justify-center flex-wrap font-extrabold tracking-tight drop-shadow-[0_2px_24px_rgba(167,139,250,0.7)]"
        style={{ letterSpacing: "0.08em" }}
      >
        {titleText.split("").map((char, i) =>
          char === " " ? (
            <span key={i} className="mx-3"></span>
          ) : (
            <span
              key={i}
              className="collection-title-char inline-block"
              style={{
                display: "inline-block",
                transition: "color 0.2s, text-shadow 0.2s",
              }}
            >
              {char}
            </span>
          )
        )}
      </h1>
      {/* Subtitle */}
      <div
        ref={subtitleRef}
        className="mt-4 text-center text-lg sm:text-2xl font-poppins text-indigo-200/80 tracking-wide"
      >
        {subtitleText}
      </div>
      {/* Product Cards */}
      <div
        ref={wrapperRef}
        className="img-container-wrapper w-full flex flex-row gap-8 lg:gap-16 overflow-x-auto overflow-y-hidden mt-16 pb-4 px-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((prod, idx) => (
          <div
            key={prod.name}
            className={`img-wrapper group relative flex flex-col shrink-0 gap-3 px-4 py-4 font-manrope rounded-3xl bg-gradient-to-br ${prod.gradient} shadow-2xl ${prod.shadow} transition-transform  duration-300 hover:scale-105 hover:shadow-3xl snap-center`}
            style={{
              width: "22rem",
              minWidth: "18rem",
              maxWidth: "90vw",
              boxShadow:
                idx === 0
                  ? "0 8px 32px 0 rgba(168,139,250,0.25)"
                  : idx === 1
                  ? "0 8px 32px 0 rgba(251,191,36,0.18)"
                  : "0 8px 32px 0 rgba(55,65,81,0.18)",
            }}
          >
            <div className="img-container  relative w-full h-72 lg:h-80 overflow-hidden rounded-2xl shadow-lg">
              <img
                className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500"
                src={prod.img}
                alt={prod.name}
                draggable={false}
                style={{
                  filter: "brightness(0.98) contrast(1.08)",
                }}
              />
              <span className="cursor-pointer absolute bottom-3 right-3 px-3 py-3 font-semibold rounded-full text-white bg-black/60 backdrop-blur-md shadow-lg hover:bg-indigo-600 transition-colors duration-200 text-2xl flex items-center justify-center">
                <IoAdd />
              </span>
              {/* Cool glass reflection */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/30 via-white/10 to-transparent pointer-events-none rounded-t-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">{prod.name}</h1>
            <h2 className="text-xl font-semibold text-indigo-100">{prod.price}</h2>
            {/* Cool bottom bar */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-2 rounded-full bg-white/10 blur-md" />
          </div>
        ))}
      </div>
      {/* Scroll hint */}
      <div className="mt-8 flex flex-col items-center animate-bounce">
        <svg width="32" height="32" fill="none" className="mb-1">
          <circle cx="16" cy="16" r="14" stroke="#a78bfa" strokeWidth="2" />
          <path d="M16 10v8M16 18l-4-4M16 18l4-4" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-indigo-200 text-sm font-poppins">Scroll Down</span>
      </div>
    </div>
  );
}

export default Collection;
