import React, { useRef, useEffect, useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/pages/Home'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MainRoutes from './components/Routes/MainRoutes';
import ResponsivNavBar from './components/navbar/ResponsivNavBar';
import MainLoadingPage from './components/mainLoading/MainLoadingPage';

const LOADING_DURATION = 4000; // ms, should match MainLoadingPage animation duration

const App = () => {
  const navRef = useRef(null);
  const [loading, setLoading] = useState(true);

  // Hide navbar on scroll logic
  useGSAP(() => {
    let ticking = false;
    let lastY = window.scrollY;

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > lastY + 2) {
            gsap.to(navRef.current, {
              y: "-110%",
              duration: 0.5,
              ease: "power3.inOut"
            });
          } else if (currentY < lastY - 2) {
            gsap.to(navRef.current, {
              y: "0%",
              duration: 0.5,
              ease: "power3.inOut"
            });
          }
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    // Initial state
    gsap.set(navRef.current, { y: "0%" });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Show loading page on first mount, then show main app
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, LOADING_DURATION);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <MainLoadingPage />;
  }

  return (
    <div className='w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 text-textcolor'>
      <div
        ref={navRef}
        className='w-full z-[9999] sticky top-1 left-0 md:px-5'
        style={{ willChange: "transform" }}
      >
        <Navbar />
      </div>
      <MainRoutes/>
    </div>
  )
}

export default App