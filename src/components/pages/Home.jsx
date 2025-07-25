import React, { useEffect, useRef } from "react";
import bhuavn from "../../assets/images/bhuvan-2.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Lenis from "lenis";
import NewChapter from "./NewChapter";
import Collection from "./Collection";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BestCollection from "./BestCollection";
import ReadJourney from "./ReadJourney";
import Footer from "./Footer";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heading1 = "Unfiltered";
  const heading2 = "Youthiapa";
  const byLine = "- By Bhuvan Bam";
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef);
    const tl = gsap.timeline();
    // Heading 1 words stagger
    tl.from(q(".heading1-word"), {
      y: 100,
      opacity: 0,
      duration: 0.4,
      ease: "easeOutExpo",
      stagger: 0.05,
    })
      .from(q(".heading2-word"), {
        y: 100,
        opacity: 0,
        duration: 0.4,
        ease: "easeOutExpo",
        stagger: 0.05,
      })
      .from(q(".byline"), {
        y: 100,
        opacity: 0,
        duration: 0.3,
        ease: "easeOutExpo",
      });

    // Animate image on page load
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.92,
          rotate: -8,
          filter: "blur(12px) brightness(0.8)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          filter: "blur(0px) brightness(1)",
          duration: 1.2,
          ease: "expo.out",
          clearProps: "filter",
        }
      );
    }

    // pannel
    const panels = gsap.utils.toArray(".panel");
    panels.forEach((panel) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
        scrub: true,
      });
    });
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <div
        className="main  w-full h-screen relative overflow-hidden p-1 "
        ref={containerRef}>
        {/* images */}
        <div className=" img-container absolute z-50 select-none  bottom-0 -left-[10%]  md:left-[40%] md:-translate-x-1/2  flex justify-center items-center">
          <img
            ref={imgRef}
            className=" imgDiv w-full h-full "
            src={bhuavn}
            alt=""
          />
        </div>
        {/* headings */}
        <div className="text-headings select-none   md:h-2/5 p-1 font-montserrat absolute top-5/12 left-1/2  -translate-x-1/2 -translate-y-1/2 md:top-3/5 md:flex md:justify-between lg:px-6 md:w-full items-center overflow-hidden">
          <div className=" overflow-hidden flex ">
            {heading1.split("").map((word, i) => (
              <h1
                key={i}
                className="text3d heading1-word text-5xl md:text-6xl  uppercase font-semibold lg:text-7xl ">
                {word}
              </h1>
            ))}
          </div>
          <div className="mt-2 flex overflow-hidden">
            {heading2.split("").map((word, i) => (
              <h1
                key={i}
                className=" text3d heading2-word text-5xl md:text-6xl  uppercase font-semibold lg:text-7xl ">
                {word}
              </h1>
            ))}
          </div>
          <div className="float-end overflow-hidden mt-2 block md:absolute md:right-5 md:bottom-0 ">
            <h2 className="text3d byline text-lg md:text-2xl">{byLine}</h2>
          </div>
        </div>
      </div>
      {/* section 2 */}
      <div className="panel h-screen">
        <NewChapter />
      </div>
      {/* section 3 */}
      <div className="panel h-screen">
        <Collection />
      </div>
      {/* section 4 */}
      <div className=" panel  h-screen w-full z-10"></div>
      <div className="">
        <BestCollection />
      </div>
      <ReadJourney/>
      <Footer/>
    </>
  );
};

export default Home;
