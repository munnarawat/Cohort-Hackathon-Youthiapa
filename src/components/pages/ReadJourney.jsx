import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import bhuavan from "../../assets/images/bhuvan-3.png";
import { Link } from "react-router-dom";


const plainText = "Do you want to know how it all began back in 2017?";

const ReadJourney = () => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const btnRef = useRef(null);
  const h1Ref = useRef(null);
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  // Typing animation using GSAP and useGSAP
  useGSAP(() => {
    let current = 0;
    let typingTween;

    function typeWriter() {
      if (current <= plainText.length) {
        setTyped(plainText.slice(0, current));
        current++;
        typingTween = gsap.delayedCall(0.06, typeWriter); // 60ms per char
      } else {
        setTypingDone(true);
      }
    }
    typeWriter();

    return () => {
      if (typingTween) typingTween.kill();
    };
    // eslint-disable-next-line
  }, []);

  // Main entrance animation using GSAP and useGSAP
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 80, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1 }
    )
      .fromTo(
        imgRef.current,
        { x: -80, opacity: 0, rotate: -8, scale: 0.92 },
        { x: 0, opacity: 1, rotate: 0, scale: 1, duration: 1.1, ease: "power4.out" },
        "-=0.7"
      )
      .fromTo(
        h1Ref.current,
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" },
        "-=0.7"
      )
      .fromTo(
        btnRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.5"
      );
  }, []);

  // Helper to render the span in blue for "2017"
  function renderTypedText() {
    const before = "Do you want to know how it all began back in ";
    const year = "2017";
    const after = "?";
    if (typed.length <= before.length) {
      return typed;
    } else if (typed.length <= before.length + year.length) {
      return (
        <>
          {before}
          <span className="text-blue-500 font-bold drop-shadow-lg">
            {typed.slice(before.length, typed.length)}
          </span>
        </>
      );
    } else {
      return (
        <>
          {before}
          <span className="text-blue-500 font-bold drop-shadow-lg">
            {typed.slice(before.length, before.length + year.length)}
          </span>
          {typed.slice(before.length + year.length)}
        </>
      );
    }
  }

  return (
    <section
      ref={containerRef}
      className="w-full flex font-montserrat flex-col md:flex-row items-center justify-center gap-10 md:gap-20 px-4 md:px-20 py-16 rounded-3xl shadow-2xl mt-16 border-2 border-blue-900/30 relative overflow-hidden"
      style={{
        background: "#1C1D20",
        boxShadow: "0 8px 40px 0 rgba(30,60,120,0.25)",
        position: "relative",
      }}
    >
      {/* Decorative background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-700/20 rounded-full blur-3xl z-0 animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-green-400/10 rounded-full blur-3xl z-0 animate-pulse" />

      <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center z-10">
        <div className="transition-transform duration-300 ease-in-out hover:scale-105 shadow-2xl rounded-2xl bg-gradient-to-tr from-blue-900/60 to-blue-400/10 p-2">
          <img
            ref={imgRef}
            src={bhuavan}
            alt="Bhuvan"
            className="w-64 h-64 md:w-96 md:h-96 object-contain rounded-2xl shadow-2xl border-4 border-blue-300/40 bg-gray-900"
            style={{
              filter: "drop-shadow(0 8px 32px #1e3a8a55)",
            }}
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 p-2 flex flex-col items-center md:items-start text-center md:text-left z-10">
        <h1
          ref={h1Ref}
          className="typing-h1 text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight drop-shadow-lg"
          style={{ minHeight: "4.5rem", whiteSpace: "pre-line", letterSpacing: "0.01em" }}
        >
          {renderTypedText()}
          <span
            className="inline-block w-2 h-6 align-middle bg-white ml-1"
            style={{
              opacity: typingDone ? 0 : 1,
              animation: "blink 1s steps(1) infinite"
            }}
          ></span>
        </h1>
        <style>
          {`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}
        </style>
        <Link to='/About'
          ref={btnRef}
          className="relative px-8 py-3 bg-blue-700 text-white font-bold rounded-full shadow-lg border border-blue-800/30 text-lg md:text-xl tracking-wide transition-all duration-200 hover:bg-blue-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
          style={{ letterSpacing: "0.04em" }}
        >
          <span className="flex items-center gap-2">
            <svg className="w-6 h-6 text-white transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Read Our Journey
          </span>
        </Link>
      </div>
    </section>
  );
};

export default ReadJourney;
