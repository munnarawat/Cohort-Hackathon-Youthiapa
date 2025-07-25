import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const mainColor = "#a78bfa"; // soft purple
const accentColor = "#fff";
const dotColor = "#6366f1"; // indigo

const LOADING_DURATION = 4000; 

const MainLoadingPage = () => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const dotsRef = useRef([]);
  const glowRef = useRef(null);
  const containerRef = useRef(null);
  const [hide, setHide] = useState(false);

  // Animate loader in and out
  useGSAP(() => {
    // Loader fade/scale in
    gsap.fromTo(
      loaderRef.current,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "expo.out" }
    );

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        scale: 1.08,
        opacity: 0.5,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "power1.inOut",
      });
    }

    // Animate "Youthiapa" letters in a wave
    if (textRef.current) {
      const chars = textRef.current.querySelectorAll(".loading-char");
      gsap.fromTo(
        chars,
        { y: 32, opacity: 0, color: accentColor },
        {
          y: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 0.7,
          ease: "back.out(1.7)",
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.7,
        }
      );
    }
    // Animate dots with subtle bounce
    if (dotsRef.current) {
      gsap.to(dotsRef.current, {
        y: -7,
        opacity: 1,
        stagger: 0.18,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "power1.inOut",
        delay: 0.4,
      });
    }
  }, []);

  // Fade out the loader when loading is done
  useEffect(() => {
    const timer = setTimeout(() => {
      // Animate opacity to 0
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: () => setHide(true),
        });
      } else {
        setHide(true);
      }
    }, LOADING_DURATION);

    return () => clearTimeout(timer);
  }, []);

  if (hide) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "linear-gradient(135deg, #18181b 0%, #232136 100%)", // dark background
        transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1)",
        opacity: 1,
        pointerEvents: hide ? "none" : "auto",
      }}
    >
      {/* Subtle Glowing background */}
      <div
        ref={glowRef}
        className="absolute w-[36vw] h-[36vw] rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-400 blur-3xl opacity-40 -z-10"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(90px)",
        }}
      ></div>
      <div
        ref={loaderRef}
        className="relative flex flex-col items-center justify-center"
      >
        <div
          ref={textRef}
          className="flex text-5xl md:text-7xl font-extrabold font-montserrat tracking-widest select-none"
        >
          {"Youthiapa".split("").map((char, i) => (
            <span
              key={i}
              className="loading-char"
              style={{
                color: mainColor,
                textShadow: `0 2px 16px ${mainColor}55, 0 0 32px #fff1`,
                marginRight: "0.06em",
                display: "inline-block",
                letterSpacing: "0.04em",
              }}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="flex mt-6 space-x-2">
          {[0, 1, 2].map((d, i) => (
            <span
              key={i}
              ref={el => (dotsRef.current[i] = el)}
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{
                background: dotColor,
                opacity: 0.4,
                boxShadow: `0 0 10px ${dotColor}`,
              }}
            ></span>
          ))}
        </div>
        {/* <h1 className="text-2xl font-poppins font-semibold">...By bhuvan bam</h1> */}
      </div>
    </div>
  );
};

export default MainLoadingPage;